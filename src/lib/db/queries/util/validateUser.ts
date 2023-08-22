
import type { RequestEvent } from "@sveltejs/kit";
import type { Session } from "lucia";

export async function validateUser(event: RequestEvent) {
    try {
        const { user } = (await event.locals.auth.validate()) as Session;
        return user;
    } catch {
        return null;
    }

}
