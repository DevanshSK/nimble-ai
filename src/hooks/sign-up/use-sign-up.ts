"use client";
import { useToast } from "@/components/ui/use-toast";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { UserRegistrationProps, UserRegistrationSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { onCompleteUserRegistration } from "@/actions/auth";


export const useSignUpForm = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const { signUp, isLoaded, setActive } = useSignUp();
    const router = useRouter();
    const methods = useForm<UserRegistrationProps>({
        resolver: zodResolver(UserRegistrationSchema),
        defaultValues: {
            type: "owner",
        },
        mode: 'onChange',
    });


    /**
     * Asynchronously generates a one-time password (OTP) for the provided email and password.
     * 
     * @param email The email address for which the OTP is to be generated.
     * @param password The password associated with the email address.
     * @param onNext A function to update the state to proceed to the next step.
     */
    const onGenerateOTP = async (
        email: string,
        password: string,
        onNext: React.Dispatch<React.SetStateAction<number>>
    ) => {
        if (!isLoaded) return;
        try {
            await signUp.create({
                emailAddress: email,
                password: password
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            onNext((prev) => prev + 1);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.errors[0].longMessage,
            })
        }
    }


    /**
     * Handles form submission for user registration.
     * Validates user input, completes sign-up process, and redirects to dashboard if successful.
     * Displays error messages if any issues occur during the process.
     */
    const onHandleSubmit = methods.handleSubmit(
        async (values: UserRegistrationProps) => {
            if (!isLoaded) return;

            try {
                setLoading(true);
                const completeSignUp = await signUp.attemptEmailAddressVerification({
                    code: values.otp,
                });

                if (completeSignUp.status !== "complete") {
                    return { message: "Something went wrong" }
                }

                if(completeSignUp.status === 'complete'){
                    if(!signUp.createdUserId) return;

                    const registered = await onCompleteUserRegistration(
                        values.fullname,
                        signUp.createdUserId,
                        values.type
                    );

                    if(registered?.status === 200 && registered.user){
                        await setActive({
                            session: completeSignUp.createdSessionId,
                        })

                        setLoading(false);
                        router.push("/dashboard");
                    }

                    if(registered?.status === 400){
                        toast({
                            title: "Error",
                            description: "Something went wrong!",
                        })
                    }
                }
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.errors[0].longMessage,
                })
            }
        }
    )

    return {
        methods,
        onHandleSubmit,
        onGenerateOTP,
        loading,
    }
}
