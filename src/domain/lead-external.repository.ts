export default interface LeadExternal {
    sendMsg({ message, phone, isGroup }: { message: string, phone: string, isGroup: boolean }): Promise<any>
    sendImageFromBase64({ message, phone, filename, caption }: { message: string, phone: string, filename: string, caption: string }): Promise<any>
    sendFileFromBase64({ message, phone, filename, caption }: { message: string, phone: string, filename: string, caption: string }): Promise<any>
    sendImageFromBase64Group({ message, phone, filename, caption }: { message: string, phone: string, filename: string, caption: string }): Promise<any>
    sendFileFromBase64Group({ message, phone, filename, caption }: { message: string, phone: string, filename: string, caption: string }): Promise<any>
    getGroupInfoFromInviteLink({ message, phone }: { message: string, phone: string }): Promise<any>
}