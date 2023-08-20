import { z } from "zod";

export const searchGameSchema = z.object({
    query: z.string().min(3),
});