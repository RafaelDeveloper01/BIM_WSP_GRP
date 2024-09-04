import { v4 as uuid } from "uuid";

export class Lead {
  readonly uuid: string;
  readonly message: string ;
  readonly phone: string;
  readonly filename?: string;
  readonly caption?: string;


  constructor({ message, phone, filename, caption  }: { message: string; phone: string , filename?: string , caption?:string}) {
    this.uuid = uuid();
    this.message = message;
    this.phone = phone;
    this.filename = filename;
    this.caption = caption;
  
  }
}
