import LeadExternal from "../domain/lead-external.repository";
import LeadRepository from "../domain/lead.repository";

export class LeadCreateGroup {
  private leadRepository: LeadRepository;
  private leadExternal: LeadExternal;
  constructor(respositories: [LeadRepository, LeadExternal]) {
    const [leadRepository, leadExternal] = respositories;
    this.leadRepository = leadRepository;
    this.leadExternal = leadExternal;
  }

  public async sendMessageAndSave({
    message,
    phone,
    filename,
    caption
  }: {
    message: string;
    phone: string;
    filename: string;
    caption: string;
  }) {

    let responseExSave;
    const responseDbSave = await this.leadRepository.save({ message, phone }); //TODO DB

    if (message.startsWith("data:image/")) {
      responseExSave = await this.leadExternal.sendImageFromBase64Group({ message, phone, filename, caption });
    } else if (message.startsWith("data:application/")) {
      responseExSave = await this.leadExternal.sendFileFromBase64Group({ message, phone, filename, caption });
    } else {
      responseExSave = await this.leadExternal.sendMsg({ message, phone, isGroup: true }); // Añadir isGroup aquí
    }

    return { responseDbSave, responseExSave };
  }
}
