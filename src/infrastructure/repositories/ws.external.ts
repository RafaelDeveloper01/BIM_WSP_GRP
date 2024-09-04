import { Client, LocalAuth } from "whatsapp-web.js";
import { image as imageQr } from "qr-image";
import LeadExternal from "../../domain/lead-external.repository";

/**
 * Extendemos los super poderes de whatsapp-web
 */
class WsTransporter extends Client implements LeadExternal {
  private status = false;

  constructor() {
    super({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: [
          "--disable-setuid-sandbox",
          "--unhandled-rejections=strict",
        ],
      },
    });

    console.log("Iniciando....");

    this.initialize();

    this.on("ready", () => {
      this.status = true;
      console.log("LOGIN_SUCCESS");
    });

    this.on("auth_failure", () => {
      this.status = false;
      console.log("LOGIN_FAIL");
    });

    this.on("qr", (qr) => {
      console.log("Escanea el codigo QR que esta en la carpeta tmp");
      this.generateImage(qr);
    });
  }

  getGroupInfoFromInviteLink({ message, phone, filename, caption }: { message: string; phone: string; filename: string; caption: string; }): Promise<any> {
    throw new Error("Method not implemented.");
  }

  sendImageFromBase64Group({ message, phone, filename, caption }: { message: string; phone: string; filename: string; caption: string; }): Promise<any> {
    throw new Error("Method not implemented.");
  }

  sendFileFromBase64Group({ message, phone, filename, caption }: { message: string; phone: string; filename: string; caption: string; }): Promise<any> {
    throw new Error("Method not implemented.");
  }

  sendFileFromBase64({ message, phone, filename, caption }: { message: string; phone: string; filename: string; caption: string; }): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async sendImageFromBase64({ message, phone }: { message: string; phone: string; }): Promise<any> {
    throw new Error("Method not implemented.");
  }

  /**
   * Enviar mensaje de WS
   * @param lead
   * @returns
   */
  async sendMsg(lead: { message: string; phone: string; isGroup: boolean }): Promise<any> {
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      const { message, phone, isGroup } = lead;
      const target = isGroup ? `${phone}@g.us` : `${phone}@c.us`; // Usa el sufijo correcto
      const response = await this.sendMessage(target, message);
      return { id: response.id.id };
    } catch (e: any) {
      return Promise.resolve({ error: e.message });
    }
  }

  getStatus(): boolean {
    return this.status;
  }

  private generateImage = (base64: string) => {
    const path = `${process.cwd()}/tmp`;
    let qr_svg = imageQr(base64, { type: "svg", margin: 4 });
    qr_svg.pipe(require("fs").createWriteStream(`${path}/qr.svg`));
    console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡`);
    console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
  };
}

export default WsTransporter;
