import type { IConversationMessage } from "./IConversationMessage";

export interface IConversation {
    id: string,
    started_by: string,
    talking_to: string,
    messages: IConversationMessage[]
}