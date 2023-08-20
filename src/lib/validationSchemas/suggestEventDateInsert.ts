import { eventDates } from "$lib/db/schema/events";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const pattern = /^\d{2}:\d{2}$/;

export const suggestEventDateInsert = createInsertSchema(eventDates, {
    date: z.date({
        required_error: "Please select a date",
        invalid_type_error: "That's not a date!",
    }),
    startTime: z.string({
        required_error: "Please select a time",
        invalid_type_error: "That's not a time!",
    }).regex(pattern, {
        message: "Please select a time",
    }),
});