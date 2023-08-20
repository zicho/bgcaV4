import { z } from "zod";

export const addGamesToEventSchema = z.object({
    eventType: z.string().min(3),
    ids: z.array(z.number())
});