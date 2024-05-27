import {z} from "zod";

export const jobFilterSchema = z.object({
    // q:z.string().optional(),
    experience:z.string().optional(),
    type:z.string().optional(),
    location:z.string().optional(),
    work:z.string().optional(),
})

export type JobFilterValues = z.infer<typeof jobFilterSchema>