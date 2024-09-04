import LeadExternal from "../domain/lead-external.repository";
import LeadRepository from "../domain/lead.repository";

export class LeadCreate {
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
    caption,
    isGroup // Añadir isGroup aquí
  }: {
    message: string;
    phone: string;
    filename: string;
    caption: string;
    isGroup: boolean; // Añadir isGroup aquí
  }) {

    let responseExSave;
    const responseDbSave = await this.leadRepository.save({ message, phone }); //TODO DB

    if (message.startsWith("data:image/")) {
      responseExSave = isGroup
        ? await this.leadExternal.sendImageFromBase64Group({ message, phone, filename, caption })
        : await this.leadExternal.sendImageFromBase64({ message, phone, filename, caption });
    } else if (message.startsWith("data:application/")) {
      responseExSave = isGroup
        ? await this.leadExternal.sendFileFromBase64Group({ message, phone, filename, caption })
        : await this.leadExternal.sendFileFromBase64({ message, phone, filename, caption });
    } else {
      responseExSave = await this.leadExternal.sendMsg({ message, phone, isGroup }); // Ajustar llamada con isGroup
    }

    return { responseDbSave, responseExSave };
  }
}
