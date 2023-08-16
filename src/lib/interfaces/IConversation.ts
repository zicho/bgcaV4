import type { IConversationMessage } from "./IConversationMessage";

export interface IConversation {
    id: number,
    started_by: string,
    talking_to: string,
    messages: IConversationMessage[]
}