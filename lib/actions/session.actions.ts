// 'use server';
//
// import {EndSessionResult, StartSessionResult, SessionCheckResult} from "@/types";
// import {connectToDatabase} from "@/database/mongoose";
// import VoiceSession from "@/database/models/voice-session.model";
// import {getCurrentBillingPeriodStart, PLAN_LIMITS} from "@/lib/subscription-constants";
// import {getUserPlan } from "@/lib/subscription.server";
// //getAuthenticatedUserId
// export const startVoiceSession = async (clerkId: string, bookId: string): Promise<StartSessionResult> => {
//     try {
//         await connectToDatabase();
//
//         // Verify user authentication
//         // const userId = await getAuthenticatedUserId();
//         // if (!userId || userId !== clerkId) {
//         //     return { success: false, error: "Unauthorized" };
//         // }
//         const { getUserPlan } = await import("@/lib/subscription.server");
//         const { PLAN_LIMITS, getCurrentBillingPeriodStart } = await import("@/lib/subscription-constants");
//         // Check subscription limits before creating a session
//         const plan = await getUserPlan();
//         const limits = PLAN_LIMITS[plan];
//
//         const billingPeriodStart = getCurrentBillingPeriodStart();
//
//         // Count sessions for current billing period
//         const sessionCount = await VoiceSession.countDocuments({
//             clerkId,
//             billingPeriodStart
//         });
//
//         if (sessionCount >= limits.maxSessionsPerMonth) {
//             const { revalidatePath } = await import("next/cache");
//             revalidatePath("/");
//             return {
//                 success: false,
//                 error: `You have reached the maximum number of sessions allowed for your ${plan} plan (${limits.maxSessionsPerMonth}). Please upgrade for more sessions.`,
//                 isBillingError: true,
//             };
//         }
//
//         const session = await VoiceSession.create({
//             clerkId,
//             bookId,
//             startedAt: new Date(),
//             billingPeriodStart,
//             durationSeconds: 0,
//         });
//
//         return {
//             success: true,
//             sessionId: session._id.toString(),
//             maxDurationMinutes: limits.maxDurationPerSession,
//         }
//     } catch (e) {
//         const errorMessage = e instanceof Error ? e.message : String(e);
//         console.error('Error starting voice session:', errorMessage);
//         return { success: false, error: 'Failed to start voice session. Please try again later.' }
//     }
// }
//
// export const endVoiceSession = async (sessionId: string, durationSeconds: number): Promise<EndSessionResult> => {
//     try {
//         await connectToDatabase();
//
//         const result = await VoiceSession.findByIdAndUpdate(sessionId, {
//             endedAt: new Date(),
//             durationSeconds,
//         });
//         if(!result) return { success: false, error: 'Voice session not found.' }
//
//         return { success: true }
//     } catch (e) {
//         const errorMessage = e instanceof Error ? e.message : String(e);
//         console.error('Error ending voice session:', errorMessage);
//         return { success: false, error: 'Failed to end voice session. Please try again later.' }
//     }
// }
//
// /**
//  * Check if a new session can be started for the user
//  * Used to validate plan limits before initializing VAPI connection
//  */
// export const checkSessionAllowed = async (clerkId: string): Promise<SessionCheckResult> => {
//     try {
//         await connectToDatabase();
//
//         const userId = await getAuthenticatedUserId();
//         if (!userId || userId !== clerkId) {
//             return {
//                 allowed: false,
//                 currentCount: 0,
//                 limit: 0,
//                 plan: 'free',
//                 maxDurationMinutes: 0,
//                 error: "Unauthorized",
//             };
//         }
//
//         const plan = await getUserPlan();
//         const limits = PLAN_LIMITS[plan];
//         const billingPeriodStart = getCurrentBillingPeriodStart();
//
//         const sessionCount = await VoiceSession.countDocuments({
//             clerkId: userId,
//             billingPeriodStart,
//         });
//
//         const allowed = sessionCount < limits.maxSessionsPerMonth;
//
//         return {
//             allowed,
//             currentCount: sessionCount,
//             limit: limits.maxSessionsPerMonth,
//             plan,
//             maxDurationMinutes: limits.maxSessionDurationMinutes,
//         };
//     } catch (e) {
//         const errorMessage = e instanceof Error ? e.message : String(e);
//         console.error('Error checking session allowed:', errorMessage);
//         return {
//             allowed: false,
//             currentCount: 0,
//             limit: 0,
//             plan: 'free',
//             maxDurationMinutes: 0,
//             error: errorMessage,
//         };
//     }
// }

'use server';

import {EndSessionResult, StartSessionResult} from "@/types";
import {connectToDatabase} from "@/database/mongoose";
import VoiceSession from "@/database/models/voice-session.model";
import {getCurrentBillingPeriodStart} from "@/lib/subscription-constants";

export const startVoiceSession = async (clerkId: string, bookId: string): Promise<StartSessionResult> => {
    try {
        await connectToDatabase();

        // Limits/Plan to see whether a session is allowed.
        const { getUserPlan } = await import("@/lib/subscription.server");
        const { PLAN_LIMITS, getCurrentBillingPeriodStart } = await import("@/lib/subscription-constants");

        const plan = await getUserPlan();
        const limits = PLAN_LIMITS[plan];
        const billingPeriodStart = getCurrentBillingPeriodStart();

        const sessionCount = await VoiceSession.countDocuments({
            clerkId,
            billingPeriodStart
        });

        if (sessionCount >= limits.maxSessionsPerMonth) {
            const { revalidatePath } = await import("next/cache");
            revalidatePath("/");

            return {
                success: false,
                error: `You have reached the monthly session limit for your ${plan} plan (${limits.maxSessionsPerMonth}). Please upgrade for more sessions.`,
                isBillingError: true,
            };
        }

        const session = await VoiceSession.create({
            clerkId,
            bookId,
            startedAt: new Date(),
            billingPeriodStart,
            durationSeconds: 0,
        });

        return {
            success: true,
            sessionId: session._id.toString(),
            maxDurationMinutes: limits.maxDurationPerSession,
        }
    } catch (e) {
        console.error('Error starting voice session', e);
        return { success: false, error: 'Failed to start voice session. Please try again later.' }
    }
}

export const endVoiceSession = async (sessionId: string, durationSeconds: number): Promise<EndSessionResult> => {
    try {
        await connectToDatabase();

        const result = await VoiceSession.findByIdAndUpdate(sessionId, {
            endedAt: new Date(),
            durationSeconds,
        });

        if(!result) return { success: false, error: 'Voice session not found.' }

        return { success: true }
    } catch (e) {
        console.error('Error ending voice session', e);
        return { success: false, error: 'Failed to end voice session. Please try again later.' }
    }
}