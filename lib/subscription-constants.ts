// // Plan types
// export type PlanType = 'free' | 'standard' | 'pro';
//
// // Subscription plan limits
// export const PLAN_LIMITS: Record<PlanType, {
//     maxBooks: number;
//     maxSessionsPerMonth: number;
//     maxSessionDurationMinutes: number;
//     hasSessionHistory: boolean;
// }> = {
//     free: {
//         maxBooks: 1,
//         maxSessionsPerMonth: 5,
//         maxSessionDurationMinutes: 5,
//         hasSessionHistory: false,
//     },
//     standard: {
//         maxBooks: 10,
//         maxSessionsPerMonth: 100,
//         maxSessionDurationMinutes: 15,
//         hasSessionHistory: true,
//     },
//     pro: {
//         maxBooks: 100,
//         maxSessionsPerMonth: Infinity,
//         maxSessionDurationMinutes: 60,
//         hasSessionHistory: true,
//     },
// };
//
// // Plan display names
// export const PLAN_NAMES: Record<PlanType, string> = {
//     free: 'Free',
//     standard: 'Standard',
//     pro: 'Pro',
// };
//
//
//
// export const getCurrentBillingPeriodStart = (): Date => {
//     const now = new Date();
//     return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
// };

export const PLANS = {
    FREE: 'free',
    STANDARD: 'standard',
    PRO: 'pro',
} as const;

export type PlanType = typeof PLANS[keyof typeof PLANS];

export interface PlanLimits {
    maxBooks: number;
    maxSessionsPerMonth: number;
    maxDurationPerSession: number; // in minutes
    hasSessionHistory: boolean;
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
    [PLANS.FREE]: {
        maxBooks: 1,
        maxSessionsPerMonth: 5,
        maxDurationPerSession: 5,
        hasSessionHistory: false,
    },
    [PLANS.STANDARD]: {
        maxBooks: 10,
        maxSessionsPerMonth: 100,
        maxDurationPerSession: 15,
        hasSessionHistory: true,
    },
    [PLANS.PRO]: {
        maxBooks: 100,
        maxSessionsPerMonth: Infinity,
        maxDurationPerSession: 60,
        hasSessionHistory: true,
    },
};

export const getCurrentBillingPeriodStart = (): Date => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);

};