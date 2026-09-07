// 'use client';
//
// import { useAuth, Show } from '@clerk/nextjs';
// import { useUserPlan } from '@/lib/subscription.client';
// import Link from 'next/link';
//
// export default function SubscriptionsPage() {
//     const { isLoaded } = useAuth();
//     const { plan, isLoading } = useUserPlan();
//
//     if (!isLoaded || isLoading) {
//         return (
//             <div className="container flex items-center justify-center">
//                 <div className="animate-spin">
//                     <div className="w-8 h-8 border-4 border-[var(--color-brand)] border-t-transparent rounded-full"></div>
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <div className="container">
//             <Show when="signed-out">
//                 <div className="py-12 flex flex-col items-center justify-center gap-6">
//                     <div className="text-center">
//                         <h1 className="page-title">Choose Your Plan</h1>
//                         <p className="page-description">
//                             Sign in to subscribe and unlock reading features
//                         </p>
//                     </div>
//                     <Link href="/sign-in" className="btn-primary">
//                         Sign In
//                     </Link>
//                 </div>
//             </Show>
//
//             <Show when="signed-in">
//                 <div className="py-12">
//                     <div className="text-center mb-12">
//                         <h1 className="page-title">Choose Your Plan</h1>
//                         <p className="page-description">
//                             Select the perfect plan for your reading journey
//                         </p>
//                         {plan !== 'free' && (
//                             <p className="mt-6 text-lg font-semibold text-[var(--color-brand)]">
//                                 Current Plan: <span className="capitalize">{plan}</span>
//                             </p>
//                         )}
//                     </div>
//
//                     {/* Plan comparison cards */}
//                     <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//                         {/* Free Plan */}
//                         <div className={`bg-white rounded-xl p-8 shadow-soft-md transition-all ${
//                             plan === 'free' ? 'border-2 border-[var(--color-brand)]' : 'border border-[var(--border-subtle)]'
//                         }`}>
//                             <div className="mb-6">
//                                 <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">Free</h3>
//                                 <p className="text-3xl font-bold text-[var(--color-brand)]">$0</p>
//                                 <p className="text-sm text-[var(--text-secondary)] mt-2">Forever free</p>
//                             </div>
//
//                             <ul className="space-y-4 mb-8">
//                                 <li className="flex items-start gap-3">
//                                     <span className="text-[var(--success)] font-bold text-lg mt-0">✓</span>
//                                     <span className="text-[var(--text-secondary)]">1 Book</span>
//                                 </li>
//                                 <li className="flex items-start gap-3">
//                                     <span className="text-[var(--success)] font-bold text-lg mt-0">✓</span>
//                                     <span className="text-[var(--text-secondary)]">5 Sessions/Month</span>
//                                 </li>
//                                 <li className="flex items-start gap-3">
//                                     <span className="text-[var(--success)] font-bold text-lg mt-0">✓</span>
//                                     <span className="text-[var(--text-secondary)]">5 Min/Session</span>
//                                 </li>
//                                 <li className="flex items-start gap-3">
//                                     <span className="text-gray-400 font-bold text-lg mt-0">✗</span>
//                                     <span className="text-gray-400">Session History</span>
//                                 </li>
//                             </ul>
//
//                             {plan === 'free' ? (
//                                 <button disabled className="w-full py-3 px-6 bg-[var(--accent-light)] text-[var(--text-primary)] font-bold rounded-lg cursor-default">
//                                     Current Plan
//                                 </button>
//                             ) : (
//                                 <button disabled className="w-full py-3 px-6 bg-gray-200 text-gray-600 font-bold rounded-lg cursor-not-allowed">
//                                     Current Plan
//                                 </button>
//                             )}
//                         </div>
//
//                         {/* Standard Plan */}
//                         <div className={`bg-white rounded-xl p-8 shadow-soft-md transition-all border-2 ${
//                             plan === 'standard' ? 'border-[var(--color-brand)]' : 'border-[var(--border-subtle)]'
//                         } relative`}>
//                             <div className="mb-6">
//                                 <div className="inline-block mb-4">
//                                     <span className="bg-[var(--color-brand)] text-white px-4 py-1 rounded-full text-xs font-bold">
//                                         POPULAR
//                                     </span>
//                                 </div>
//                                 <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">Standard</h3>
//                                 <p className="text-3xl font-bold text-[var(--color-brand)]">$9<span className="text-lg text-gray-500">/month</span></p>
//                                 <p className="text-sm text-[var(--text-secondary)] mt-2">For serious readers</p>
//                             </div>
//
//                             <ul className="space-y-4 mb-8">
//                                 <li className="flex items-start gap-3">
//                                     <span className="text-[var(--success)] font-bold text-lg mt-0">✓</span>
//                                     <span className="text-[var(--text-secondary)]">10 Books</span>
//                                 </li>
//                                 <li className="flex items-start gap-3">
//                                     <span className="text-[var(--success)] font-bold text-lg mt-0">✓</span>
//                                     <span className="text-[var(--text-secondary)]">100 Sessions/Month</span>
//                                 </li>
//                                 <li className="flex items-start gap-3">
//                                     <span className="text-[var(--success)] font-bold text-lg mt-0">✓</span>
//                                     <span className="text-[var(--text-secondary)]">15 Min/Session</span>
//                                 </li>
//                                 <li className="flex items-start gap-3">
//                                     <span className="text-[var(--success)] font-bold text-lg mt-0">✓</span>
//                                     <span className="text-[var(--text-secondary)]">Session History</span>
//                                 </li>
//                             </ul>
//
//                             {plan === 'standard' ? (
//                                 <button disabled className="w-full py-3 px-6 bg-[var(--accent-light)] text-[var(--text-primary)] font-bold rounded-lg cursor-default">
//                                     Current Plan
//                                 </button>
//                             ) : plan === 'pro' ? (
//                                 <button disabled className="w-full py-3 px-6 bg-gray-200 text-gray-600 font-bold rounded-lg cursor-not-allowed">
//                                     Current Plan
//                                 </button>
//                             ) : (
//                                 <button className="w-full py-3 px-6 bg-[var(--color-brand)] text-white font-bold rounded-lg hover:bg-[#7a4528] transition-colors">
//                                     Upgrade Now
//                                 </button>
//                             )}
//                         </div>
//
//                         {/* Pro Plan */}
//                         <div className={`bg-white rounded-xl p-8 shadow-soft-md transition-all ${
//                             plan === 'pro' ? 'border-2 border-[var(--color-brand)]' : 'border border-[var(--border-subtle)]'
//                         }`}>
//                             <div className="mb-6">
//                                 <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">Pro</h3>
//                                 <p className="text-3xl font-bold text-[var(--color-brand)]">$29<span className="text-lg text-gray-500">/month</span></p>
//                                 <p className="text-sm text-[var(--text-secondary)] mt-2">For book enthusiasts</p>
//                             </div>
//
//                             <ul className="space-y-4 mb-8">
//                                 <li className="flex items-start gap-3">
//                                     <span className="text-[var(--success)] font-bold text-lg mt-0">✓</span>
//                                     <span className="text-[var(--text-secondary)]">100 Books</span>
//                                 </li>
//                                 <li className="flex items-start gap-3">
//                                     <span className="text-[var(--success)] font-bold text-lg mt-0">✓</span>
//                                     <span className="text-[var(--text-secondary)]">Unlimited Sessions</span>
//                                 </li>
//                                 <li className="flex items-start gap-3">
//                                     <span className="text-[var(--success)] font-bold text-lg mt-0">✓</span>
//                                     <span className="text-[var(--text-secondary)]">60 Min/Session</span>
//                                 </li>
//                                 <li className="flex items-start gap-3">
//                                     <span className="text-[var(--success)] font-bold text-lg mt-0">✓</span>
//                                     <span className="text-[var(--text-secondary)]">Session History</span>
//                                 </li>
//                             </ul>
//
//                             {plan === 'pro' ? (
//                                 <button disabled className="w-full py-3 px-6 bg-[var(--accent-light)] text-[var(--text-primary)] font-bold rounded-lg cursor-default">
//                                     Current Plan
//                                 </button>
//                             ) : (
//                                 <button className="w-full py-3 px-6 bg-[var(--color-brand)] text-white font-bold rounded-lg hover:bg-[#7a4528] transition-colors">
//                                     Upgrade Now
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//
//                     {/* FAQ Section */}
//                     <div className="mt-16 max-w-3xl mx-auto">
//                         <h2 className="section-title mb-8">Frequently Asked Questions</h2>
//                         <div className="space-y-6">
//                             <div className="bg-white rounded-lg p-6 shadow-soft-sm">
//                                 <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">Can I switch plans anytime?</h3>
//                                 <p className="text-[var(--text-secondary)]">Yes! Upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
//                             </div>
//                             <div className="bg-white rounded-lg p-6 shadow-soft-sm">
//                                 <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">What happens to my books if I downgrade?</h3>
//                                 <p className="text-[var(--text-secondary)]">Your books remain accessible, but you may not be able to add new ones if you exceed the plan limit. Existing books continue to work normally.</p>
//                             </div>
//                             <div className="bg-white rounded-lg p-6 shadow-soft-sm">
//                                 <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">Do I need a credit card for the free plan?</h3>
//                                 <p className="text-[var(--text-secondary)]">No credit card required! The free plan is completely free with no hidden charges.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Show>
//         </div>
//     );
// }
//

import { PricingTable } from "@clerk/nextjs";

export default function SubscriptionsPage() {
    return (
        <div className="container wrapper py-10">
            <div className="flex flex-col items-center text-center mb-10">
                <h1 className="text-4xl font-bold font-serif mb-4">Choose Your Plan</h1>
                <p className="text-muted-foreground max-w-2xl">
                    Upgrade to unlock more books, longer sessions, and advanced features.
                </p>
            </div>

            <div className="clerk-pricing-container">
                <PricingTable />
            </div>
        </div>
    );
}