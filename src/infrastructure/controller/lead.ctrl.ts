import { Request, Response } from "express";
import { LeadCreate } from "../../application/lead.create";

class LeadCtrl {
  constructor(private readonly leadCreator: LeadCreate) { }

  // Método para enviar mensajes de todo tipo (archivos, imágenes, grupos)
  public sendCtrl = async ({ body }: Request, res: Response) => {
    const { message, phone, filename, caption, isGroup } = body; // Añadir isGroup aquí

    // Ajustar llamada a sendMessageAndSave para incluir isGroup
    const response = await this.leadCreator.sendMessageAndSave({ message, phone, filename, caption, isGroup });
    res.send(response);
  };

  // Nuevo método para enviar OTP por WhatsApp
  public sendOtpByWhatsApp = async ({ body }: Request, res: Response) => {
    const { otp, phone } = body; // Recibe el OTP y el número de teléfono

    try {
      // Usar Venom Bot para enviar el OTP como mensaje a WhatsApp
      const message = `Tu código OTP es: ${otp}`;  // Construimos el mensaje de OTP
      const response = await this.leadCreator.sendMessageAndSave({ message, phone, isGroup: false });
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error("Error enviando OTP por WhatsApp:", error);
      res.status(500).json({ success: false, message: "Error enviando OTP por WhatsApp" });
    }
  };
}

export default LeadCtrl;
