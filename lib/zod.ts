// import { z } from 'zod'
// import { ACCEPTED_PDF_TYPES, MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE, DEFAULT_VOICE, voiceOptions } from './constants'
//
// const fileTypeCheck = (file: File | null, acceptedTypes: string[]) => {
//   if (!file) return false
//   return acceptedTypes.includes(file.type)
// }
//
// export const UploadSchema = z.object({
//   title: z.string().min(2, 'Title is too short').max(200, 'Title is too long'),
//   author: z.string().min(2, 'Author name is too short').max(100, 'Author name is too long'),
//   voice: z.string().refine((v) => Object.keys(voiceOptions).includes(v), 'Invalid voice selected'),
//   // We'll validate files via refinements using the File object shape
//   file: z.any().refine((f) => f instanceof File, 'A PDF file is required').refine((f: File) => {
//     if (!(f instanceof File)) return false
//     if (!fileTypeCheck(f, ACCEPTED_PDF_TYPES)) return false
//     if (f.size > MAX_FILE_SIZE) return false
//     return true
//   }, `File must be a PDF under ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB`),
//   cover: z.any().optional().nullable().refine((f) => {
//     if (f == null) return true
//     if (!(f instanceof File)) return false
//     if (!fileTypeCheck(f, ACCEPTED_IMAGE_TYPES)) return false
//     if (f.size > MAX_IMAGE_SIZE) return false
//     return true
//   }, `Cover image must be an image (${ACCEPTED_IMAGE_TYPES.join(',')}) and under ${Math.round(MAX_IMAGE_SIZE / (1024 * 1024))}MB`),
// })
//
// export type UploadFormValues = z.infer<typeof UploadSchema>
//
// export default UploadSchema


import { z } from 'zod';
import {MAX_FILE_SIZE, ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE} from './constants';

export const UploadSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    author: z.string().min(1, "Author name is required").max(100, "Author name is too long"),
    persona: z.string().min(1, "Please select a voice"),
    pdfFile: z.instanceof(File, { message: "PDF file is required" })
        .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 50MB")
        .refine((file) => ACCEPTED_PDF_TYPES.includes(file.type), "Only PDF files are accepted"),
    coverImage: z.instanceof(File).optional()
        .refine((file) => !file || file.size <= MAX_IMAGE_SIZE, "Image size must be less than 10MB")
        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .jpeg, .png and .webp formats are supported"),
});