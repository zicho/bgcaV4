export interface IPrivateMessage {
    username: string,
    content: string,
    sentAt: string | undefined,
    unread: boolean,
    isYou: boolean
}