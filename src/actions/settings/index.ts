"use server"
import { client } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { currentUser } from "@clerk/nextjs"

export const onGetSubscriptionPlan = async () => {
    try {
        // Get the user
        const user = await currentUser();
        if (!user) return;

        const plan = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            select: {
                subscription: {
                    select: {
                        plan: true,
                    }
                }
            }
        });
        if (plan) {
            return plan.subscription?.plan;
        }

    } catch (error) {
        console.log(error);
        return {
            status: 400,
            message: "Something went wrong while fetching the subscriptions."
        };
    }
}

export const onGetAllAccountDomains = async () => {
    const user = await currentUser();
    if (!user) return;

    try {
        const domains = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            select: {
                id: true,
                domains: {
                    select: {
                        name: true,
                        icon: true,
                        id: true,
                        customer: {
                            select: {
                                chatRoom: {
                                    select: {
                                        id: true,
                                        live: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
        return { domains };
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            message: "Something went wrong while fetching the domains."
        }
    }
}