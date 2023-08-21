/*

DO NOT PUT TABLES HERE. TYPES ONLY, LIKE ENUMS AND SUCH

*/


// note: should match "EVENT_TYPE" enum

import { pgEnum } from "drizzle-orm/pg-core";

// todo: refactor this to use actual enum values instead of strings
export const eventTypeEnum = pgEnum('eventType', [
    "event_type_open",
    "event_type_friends",
    "event_type_collab",
    "event_type_closed",
]);

// note: should match "REQUEST_STATUS" enum 
export const requestStatusEnum = pgEnum('requestStatus', [
    "PENDING",
    "ACCEPTED",
    "DECLINED"
]);
