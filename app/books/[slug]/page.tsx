// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import Image from 'next/image';
// import { ArrowLeft, Mic, MicOff } from 'lucide-react';
// import { getBookBySlug } from '@/lib/actions/book.actions';
//
// export default async function BookDetailsPage({ params }: { params: { slug: string } }) {
//   // Check authentication
//   const { userId } = await auth();
//   if (!userId) {
//     redirect('/sign-in');
//   }
//
//   // Fetch book by slug
//   const result = await getBookBySlug(params.slug);
//
//   if (!result.success || !result.data) {
//     redirect('/');
//   }
//
//   const book = result.data as any;
//
//   return (
//     <div className="book-page-container">
//       {/* Back Button */}
//       <a
//         href="/public"
//         className="back-btn-floating hover:bg-gray-50"
//         aria-label="Go back"
//       >
//         <ArrowLeft className="w-5 h-5 text-[var(--text-primary)]" />
//       </a>
//
//       {/* Main Container - Centered with max-w-4xl */}
//       <div className="mx-auto max-w-4xl flex flex-col gap-6">
//         {/* Header Card */}
//         <div className="vapi-header-card">
//           {/* Book Cover with Mic Button */}
//           <div className="vapi-cover-wrapper">
//             <Image
//               src={book.coverURL || '/assets/book-cover.svg'}
//               alt={book.title}
//               width={120}
//               height={180}
//               className="vapi-cover-image"
//               priority
//             />
//             {/* Floating Mic Button */}
//             <div className="vapi-mic-wrapper">
//               <button
//                 className="vapi-mic-btn"
//                 aria-label="Start voice conversation"
//                 title="Start voice conversation"
//               >
//                 <MicOff className="w-6 h-6 text-[#212a3b]" />
//               </button>
//             </div>
//           </div>
//
//           {/* Book Info Section */}
//           <div className="flex flex-col flex-1 min-w-0">
//             {/* Title and Author */}
//             <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#212a3b] mb-1">
//               {book.title}
//             </h1>
//             <p className="text-[#3d485e] text-base sm:text-lg mb-4">
//               by {book.author}
//             </p>
//
//             {/* Badge Row */}
//             <div className="flex flex-wrap gap-2 sm:gap-3">
//               {/* Status Badge */}
//               <div className="vapi-status-indicator">
//                 <span className="vapi-status-dot vapi-status-dot-ready"></span>
//                 <span className="vapi-status-text">Ready</span>
//               </div>
//
//               {/* Voice Badge */}
//               <div className="vapi-status-indicator">
//                 <span className="vapi-status-text">Voice: {book.persona || 'Default'}</span>
//               </div>
//
//               {/* Timer Badge */}
//               <div className="vapi-status-indicator">
//                 <span className="vapi-status-text">0:00/15:00</span>
//               </div>
//             </div>
//           </div>
//         </div>
//
//         {/* Transcript Area */}
//         <div className="transcript-container min-h-[400px]">
//           <div className="transcript-empty">
//             <Mic className="w-12 h-12 text-[#212a3b] mb-4" />
//             <p className="transcript-empty-text">No conversation yet</p>
//             <p className="transcript-empty-hint">Click the mic button above to start talking</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MicOff, Mic } from "lucide-react";

import { getBookBySlug } from "@/lib/actions/book.actions";
import VapiControls from "@/components/VapiControls";
// import VapiControls from "@/components/VapiControls";

export default async function BookDetailsPage({
                                                  params,
                                              }: {
    params: Promise<{ slug: string }>;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const { slug } = await params;
    const result = await getBookBySlug(slug);

    if (!result.success || !result.data) {
        redirect("/");
    }

    const book = result.data;

    return (
        <div className="book-page-container">
            <Link href="/" className="back-btn-floating">
                <ArrowLeft className="size-6 text-[#212a3b]" />
            </Link>

            {/*<VapiControls book={book} />*/}


                <VapiControls book={book} />

                        </div>



    );
}
