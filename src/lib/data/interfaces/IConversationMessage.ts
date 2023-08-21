export interface IConversationMessage {
    username: string,
    content: string,
    sentAt: string,
    unread: boolean,
    isYou: boolean
}