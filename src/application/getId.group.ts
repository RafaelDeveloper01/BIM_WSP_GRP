import LeadExternal from "../domain/lead-external.repository";
import LeadRepository from "../domain/lead.repository";

export class GetIdGroup {
  private leadRepository: LeadRepository;
  private leadExternal: LeadExternal;
  constructor(respositories: [LeadRepository, LeadExternal]) {
    const [leadRepository, leadExternal] = respositories;
    this.leadRepository = leadRepository;
    this.leadExternal = leadExternal;
  }

  public async sendMessageAndSave({
    message,
    phone

  }: {
    message: string;
    phone: string;
  }) {

    let responseExSave;
    const responseDbSave = await this.leadRepository.save({ message, phone });//TODO DB

    responseExSave = await this.leadExternal.getGroupInfoFromInviteLink({ message, phone });

    return { responseDbSave, responseExSave };
  }
}
