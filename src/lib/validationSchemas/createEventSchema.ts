import { z } from "zod";

export const createEventSchema = z.object({
    eventType: z.string().nonempty({
        message: "Pick an event type"
    }),
    ids: z.array(z.number()).nonempty({
        message: "Pick at least one game.",
    })
});