import { Request, Response } from "express";
import { LeadCreateGroup } from "../../application/lead.group";

class LeadGroupCtrl {
  constructor(private readonly leadCreator: LeadCreateGroup) {}

  public sendCtrl = async ({ body }: Request, res: Response) => {
    const { message, phone, filename, caption } = body;
    const response = await this.leadCreator.sendMessageAndSave({ message, phone , filename , caption})
    res.send(response);
  };

}


export default LeadGroupCtrl;
