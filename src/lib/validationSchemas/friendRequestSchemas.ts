import { friends } from "$lib/db/schema/relationships";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sendFriendRequestSchema = createInsertSchema(friends, {
    senderUsername: z.string({
        required_error: "Sender username needed",
        invalid_type_error: "Invalid sender username",
    }),
    recipientUsername: z.string({
        required_error: "Recipient username needed",
        invalid_type_error: "Invalid recipient username",
    }),
});

export const answerFriendRequestSchema = z.object({
    senderUsername: z.string({
        required_error: "Sender username needed",
        invalid_type_error: "Invalid sender username",
    }),
    recipientUsername: z.string({
        required_error: "Recipient username needed",
        invalid_type_error: "Invalid recipient username",
    }),
    accepted: z.boolean({
        required_error: "Answer needed",
        invalid_type_error: "Invalid answer (true/false needed)",
    }),
});

export const removeFriendshipRequestSchema = z.object({
    friendshipId: z.number({
        required_error: "Friendship ID needed",
        invalid_type_error: "Invalid friendship ID",
    }),
});