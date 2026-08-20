// "use client"
//
// import React, { useRef, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import UploadSchema, { UploadFormValues } from '../lib/zod'
// import VoiceSelector from './VoiceSelector'
// import { DEFAULT_VOICE } from '../lib/constants'
//
// const LoadingOverlay = ({ visible }: { visible: boolean }) => {
//   if (!visible) return null
//   return (
//     <div className="absolute inset-0 bg-white/60 z-40 flex items-center justify-center">
//       <div className="text-lg font-medium">Processing…</div>
//     </div>
//   )
// }
//
// const bytesToMB = (n: number) => `${(n / (1024 * 1024)).toFixed(2)} MB`
//
// const UploadForm: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<UploadFormValues>({
//     resolver: zodResolver(UploadSchema),
//     defaultValues: { voice: DEFAULT_VOICE },
//   })
//
//   const pdfFile = watch('file') as File | undefined | null
//   const coverFile = watch('cover') as File | undefined | null
//
//   const fileInputRef = useRef<HTMLInputElement | null>(null)
//   const coverInputRef = useRef<HTMLInputElement | null>(null)
//
//   const [isLoading, setIsLoading] = useState(false)
//
//   const onSubmit = async (data: UploadFormValues) => {
//     setIsLoading(true)
//
//     await new Promise((r) => setTimeout(r, 900))
//
//     console.log('Submitted', data)
//     setIsLoading(false)
//
//   }
//
//   const handlePdfPick = (files?: FileList | null) => {
//     const f = files?.[0] ?? null
//     setValue('file', f as any, { shouldValidate: true })
//   }
//
//   const handleCoverPick = (files?: FileList | null) => {
//     const f = files?.[0] ?? null
//     setValue('cover', f as any, { shouldValidate: true })
//   }
//
//   const removePdf = () => setValue('file', null as any, { shouldValidate: true })
//   const removeCover = () => setValue('cover', null as any, { shouldValidate: true })
//
//   return (
//     <div className="new-book-wrapper relative p-6 bg-[#faf3ec] rounded-xl max-w-3xl mx-auto">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//         <LoadingOverlay visible={isLoading || isSubmitting} />
//
//
//         <div className="space-y-2">
//           <label className="form-label">Book PDF File</label>
//           <div
//             className="upload-dropzone p-6 border-2 border-dashed rounded-lg bg-white text-center cursor-pointer"
//             onClick={() => fileInputRef.current?.click()}
//           >
//             {!pdfFile ? (
//               <div className="text-gray-600">
//                 <div className="mb-2">📤</div>
//                 <div className="font-medium">Click to upload PDF</div>
//                 <div className="text-sm">PDF file (max 50MB)</div>
//               </div>
//             ) : (
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="font-medium">{pdfFile.name}</div>
//                   <div className="text-sm text-gray-600">{bytesToMB(pdfFile.size)}</div>
//                 </div>
//                 <button type="button" onClick={removePdf} className="text-sm text-red-600">
//                   Remove
//                 </button>
//               </div>
//             )}
//             <input
//
//               ref={fileInputRef}
//               type="file"
//               accept="application/pdf"
//               className="hidden"
//               onChange={(e) => handlePdfPick(e.target.files)}
//             />
//           </div>
//           {errors.file && <div className="text-sm text-red-600">{errors.file?.message as unknown as string}</div>}
//         </div>
//
//
//         <div className="space-y-2">
//           <label className="form-label">Cover Image (Optional)</label>
//           <div
//             className="upload-dropzone p-6 border-2 border-dashed rounded-lg bg-white text-center cursor-pointer"
//             onClick={() => coverInputRef.current?.click()}
//           >
//             {!coverFile ? (
//               <div className="text-gray-600">
//                 <div className="mb-2">🖼️</div>
//                 <div className="font-medium">Click to upload cover image</div>
//                 <div className="text-sm">Leave empty to auto-generate from PDF</div>
//               </div>
//             ) : (
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <img src={URL.createObjectURL(coverFile)} alt="cover preview" className="w-16 h-20 object-cover rounded" />
//                   <div>
//                     <div className="font-medium">{coverFile.name}</div>
//                     <div className="text-sm text-gray-600">{bytesToMB(coverFile.size)}</div>
//                   </div>
//                 </div>
//                 <button type="button" onClick={removeCover} className="text-sm text-red-600">
//                   Remove
//                 </button>
//               </div>
//             )}
//             <input
//
//               ref={coverInputRef}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => handleCoverPick(e.target.files)}
//             />
//           </div>
//           {errors.cover && <div className="text-sm text-red-600">{errors.cover?.message as unknown as string}</div>}
//         </div>
//
//
//         <div className="space-y-2">
//           <label className="form-label">Title</label>
//           <input {...register('title')} placeholder="ex: Rich Dad Poor Dad" className="form-input w-full" />
//           {errors.title && <div className="text-sm text-red-600">{errors.title.message}</div>}
//         </div>
//
//
//         <div className="space-y-2">
//           <label className="form-label">Author Name</label>
//           <input {...register('author')} placeholder="ex: Robert Kiyosaki" className="form-input w-full" />
//         </div>
//         {errors.author && <div className="text-sm text-red-600">{errors.author.message}</div>}
//
//
//         <div>
//           <VoiceSelector
//             value={(watch('voice') as string) ?? DEFAULT_VOICE}
//             onChange={(v) => setValue('voice', v as any, { shouldValidate: true })}
//           />
//           {errors.voice && <div className="text-sm text-red-600">{errors.voice.message}</div>}
//         </div>
//
//
//         <div>
//           <button
//             type="submit"
//             className="form-btn w-full bg-[#663820] text-white font-serif py-3 rounded-lg"
//             disabled={isSubmitting || isLoading}
//           >
//             Begin Synthesis
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }
//
// export default UploadForm

'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, ImageIcon } from 'lucide-react';
import { UploadSchema } from '@/lib/zod';
import { BookUploadFormValues } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES, DEFAULT_VOICE } from '@/lib/constants';
import FileUploader from './FileUploader';
import VoiceSelector from './VoiceSelector';
import LoadingOverlay from './LoadingOverlay';

import {useAuth, useUser} from "@clerk/nextjs";
import { toast } from 'sonner';
import {checkBookExists, createBook, saveBookSegments} from "@/lib/actions/book.actions";
import {useRouter} from "next/navigation";
import {parsePDFFile} from "@/lib/utils";
import {upload} from "@vercel/blob/client";

const UploadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const { userId } = useAuth();
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm<BookUploadFormValues>({
        resolver: zodResolver(UploadSchema),
        defaultValues: {
            title: '',
            author: '',
            persona: '',
            pdfFile: undefined,
            coverImage: undefined,
        },
    });

    const onSubmit = async (data: BookUploadFormValues) => {
        if(!userId) {
            return toast.error("Please login to upload books");
        }

        setIsSubmitting(true);



        try {
            const existsCheck = await checkBookExists(data.title);

            if(existsCheck.exists && existsCheck.book) {
                toast.info("Book with same title already exists.");
                form.reset()
                router.push(`/books/${existsCheck.book.slug}`)
                return;
            }

            const fileTitle = data.title.replace(/\s+/g, '-').toLowerCase();
            const pdfFile = data.pdfFile;

            const parsedPDF = await parsePDFFile(pdfFile);

            if(parsedPDF.content.length === 0) {
                toast.error("Failed to parse PDF. Please try again with a different file.");
                return;
            }

            const uploadedPdfBlob = await upload(fileTitle, pdfFile, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                contentType: 'application/pdf'
            });

            let coverUrl: string;

            if(data.coverImage) {
                const coverFile = data.coverImage;
                const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, coverFile, {
                    access: 'public',
                    handleUploadUrl: '/api/upload',
                    contentType: coverFile.type
                });
                coverUrl = uploadedCoverBlob.url;
            } else {
                const response = await fetch(parsedPDF.cover)
                const blob = await response.blob();

                const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, blob, {
                    access: 'public',
                    handleUploadUrl: '/api/upload',
                    contentType: 'image/png'
                });
                coverUrl = uploadedCoverBlob.url;
            }

            const book = await createBook({
                clerkId: userId,
                title: data.title,
                author: data.author,
                persona: data.persona,
                fileURL: uploadedPdfBlob.url,
                fileBlobKey: uploadedPdfBlob.pathname,
                coverURL: coverUrl,
                fileSize: pdfFile.size,
            });

            if(!book.success) {
                const errorMsg = book.error as string || "Failed to create book";
                toast.error(errorMsg);
                setIsSubmitting(false);
                return;
            }

            if(book.alreadyExists) {
                toast.info("Book with same title already exists.");
                form.reset()
                router.push(`/books/${book.data.slug}`)
                return;
            }

            const segments = await saveBookSegments(book.data._id, userId, parsedPDF.content);

            if(!segments.success) {
                toast.error("Failed to save book segments");
                throw new Error("Failed to save book segments");
            }

            form.reset();
            router.push('/');
        // } catch (error) {
        //     console.error(error);
        //
        //     toast.error("Failed to upload book. Please try again later.");
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : typeof error === 'string'
                    ? error
                    : JSON.stringify(error);

            console.error('Upload submission error:', message);
            toast.error(message || "Failed to upload book. Please try again later.");

        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isMounted) return null;

    return (
        <>
            {isSubmitting && <LoadingOverlay />}

            <div className="new-book-wrapper">
                <Form {...form}>

                    {/*==========================================================*/}
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


                        {/* 1. PDF File Upload */}
                        <FileUploader
                            control={form.control}
                            name="pdfFile"
                            label="Book PDF File"
                            acceptTypes={ACCEPTED_PDF_TYPES}
                            icon={Upload}
                            placeholder="Click to upload PDF"
                            hint="PDF file (max 50MB)"
                            disabled={isSubmitting}
                        />

                        {/* 2. Cover Image Upload */}
                        <FileUploader
                            control={form.control}
                            name="coverImage"
                            label="Cover Image (Optional)"
                            acceptTypes={ACCEPTED_IMAGE_TYPES}
                            icon={ImageIcon}
                            placeholder="Click to upload cover image"
                            hint="Leave empty to auto-generate from PDF"
                            disabled={isSubmitting}
                        />

                        {/* 3. Title Input */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="form-input"
                                            placeholder="ex: Rich Dad Poor Dad"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 4. Author Input */}
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Author Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="form-input"
                                            placeholder="ex: Robert Kiyosaki"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 5. Voice Selector */}
                        <FormField
                            control={form.control}
                            name="persona"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                                    <FormControl>
                                        <VoiceSelector
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 6. Submit Button */}
                        <Button type="submit" className="form-btn" disabled={isSubmitting}>
                            Begin Synthesis
                        </Button>

                     </form>
                </Form>
            </div>
        </>
    );
};

export default UploadForm;