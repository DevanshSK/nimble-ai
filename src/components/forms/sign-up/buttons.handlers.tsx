"use client";
import { useAuthContextHook } from '@/context/use-auth-context';
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up';
import React from 'react'
import { useFormContext } from 'react-hook-form';

type Props = {}

const ButtonHandler = (props: Props) => {
    const { setCurrentStep, currentStep } = useAuthContextHook();
    const { formState, getFieldState, getValues } = useFormContext();
    const { onGenerateOTP } = useSignUpForm();

    const { isDirty: isName } = getFieldState("fullname", formState)
    const { isDirty: isEmail } = getFieldState("email", formState)
    const { isDirty: isPassword } = getFieldState("password", formState)

    

    return (
        <div>ButtonHandler</div>
    )
}

export default ButtonHandler