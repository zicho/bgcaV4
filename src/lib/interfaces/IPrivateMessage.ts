export interface IPrivateMessage {
    username: string,
    content: string,
    sentAt: string,
    unread: boolean,
    isYou: boolean
}