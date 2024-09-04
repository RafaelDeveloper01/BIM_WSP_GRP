import { Request, Response } from "express";
import { GetIdGroup } from "../../application/getId.group";

class GetIdGroupCtrl {
  constructor(private readonly leadCreator: GetIdGroup) {}

  public sendCtrl = async ({ body }: Request, res: Response) => {
    const { message, phone} = body;
    const response = await this.leadCreator.sendMessageAndSave({ message, phone})
    res.send(response);
  };

}


export default GetIdGroupCtrl;
