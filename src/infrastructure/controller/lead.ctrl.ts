import { Request, Response } from "express";
import { LeadCreate } from "../../application/lead.create";

class LeadCtrl {
  constructor(private readonly leadCreator: LeadCreate) { }

  public sendCtrl = async ({ body }: Request, res: Response) => {
    const { message, phone, filename, caption, isGroup } = body; // Añadir isGroup aquí

    // Ajustar llamada a sendMessageAndSave para incluir isGroup
    const response = await this.leadCreator.sendMessageAndSave({ message, phone, filename, caption, isGroup });
    res.send(response);
  };
}

export default LeadCtrl;
