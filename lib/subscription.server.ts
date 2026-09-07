// 'use server';
//
// import { auth, clerkClient } from '@clerk/nextjs/server';
// import { PlanType } from '@/lib/subscription-constants';
//
// /**
//  * Get the current user's subscription plan
//  * Returns 'free' if user has no active subscription
//  *
//  * In Clerk Dashboard, you'll need to set user metadata:
//  * publicMetadata: { subscriptionPlan: 'standard' | 'pro' }
//  */
// export async function getUserPlan(): Promise<PlanType> {
//     try {
//         const { userId } = await auth();
//         if (!userId) {
//             return 'free';
//         }
//
//         const client = await clerkClient();
//         const user = await client.users.getUser(userId);
//
//         // Get plan from user's public metadata
//         const plan = (user.publicMetadata?.subscriptionPlan as PlanType) || 'free';
//
//         // Validate plan is one of the allowed values
//         if (['free', 'standard', 'pro'].includes(plan)) {
//             return plan;
//         }
//
//         return 'free';
//     } catch (error) {
//         console.error('Error getting user plan:', error);
//         return 'free';
//     }
// }
//
// /**
//  * Check if user is authenticated
//  */
// export async function getAuthenticatedUserId(): Promise<string | null> {
//     const { userId } = await auth();
//     return userId || null;
// }
//
// /**
//  * Verify user authorization and return plan
//  * Throws if user is not authenticated
//  */
// export async function requireAuthAndGetPlan(): Promise<{ userId: string; plan: PlanType }> {
//     const userId = await getAuthenticatedUserId();
//     if (!userId) {
//         throw new Error('Unauthorized: User not authenticated');
//     }
//
//     const plan = await getUserPlan();
//     return { userId, plan };
// }
//
// /**
//  * Update user's subscription plan (server-only, called from webhooks)
//  * @param userId - Clerk user ID
//  * @param plan - Subscription plan to set
//  */
// export async function updateUserPlan(userId: string, plan: PlanType) {
//     try {
//         const client = await clerkClient();
//         await client.users.updateUser(userId, {
//             publicMetadata: { subscriptionPlan: plan },
//         });
//     } catch (error) {
//         console.error('Error updating user plan:', error);
//         throw error;
//     }
// }
//

import {auth} from "@clerk/nextjs/server";
import {PLANS, PLAN_LIMITS, PlanType} from "@/lib/subscription-constants";

export const getUserPlan = async (): Promise<PlanType> => {
    const { has, userId } = await auth();

    if (!userId) return PLANS.FREE;

    if (has({ plan: "pro" })) return PLANS.PRO;
    if (has({ plan: "standard" })) return PLANS.STANDARD;

    return PLANS.FREE;
}

export const getPlanLimits = async () => {
    const plan = await getUserPlan();
    return PLAN_LIMITS[plan];
}