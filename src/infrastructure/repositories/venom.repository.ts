import { image as imageQr } from "qr-image";
import LeadExternal from "../../domain/lead-external.repository";
import { create, Whatsapp } from "venom-bot";
import { Client, LocalAuth } from "whatsapp-web.js";

export class VenomTransporter extends Client implements LeadExternal {
  instance: Whatsapp | undefined;

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

    create({ session: "session" }).then((client) => {
      this.instance = client;

      // Añadir un listener para capturar mensajes entrantes
      this.instance.onMessage(async (message) => {
        if (message.body && typeof message.body === 'string') {
          // Obtener la hora del mensaje
          const date = new Date(message.timestamp * 1000);
          const time = date.toLocaleTimeString();

          // Verificar si el mensaje es de un grupo o de un chat personal
          if (message.isGroupMsg) {
            console.log(`Mensaje recibido (grupo - ${message.sender.pushname} - hora : ${time}): ${message.body}`);
          } else {
            console.log(`Mensaje recibido (chat - ${message.sender.pushname} - hora : ${time}): ${message.body}`);
          }

          // Verificar si el mensaje contiene la palabra 'chicos', ignorando mayúsculas y minúsculas
          if (message.body.toLowerCase().includes("hhhh")) {
            console.log("Palabra 'chicos' detectada en el mensaje");

            // Enviar un mensaje de respuesta si se detecta la palabra
            const responseMessage = "He detectado la palabra 'chicos'. ¿En qué puedo ayudarte?";
            const target = message.isGroupMsg ? message.from : message.sender.id; // Definir el destino basado en el tipo de mensaje
            await this.sendMsg({ message: responseMessage, phone: target.split('@')[0], isGroup: message.isGroupMsg }); // Enviar mensaje al grupo o al contacto
          }
        } else {
          console.log('Mensaje no tiene un cuerpo de texto o no es una cadena.');
        }
      });
    });
  }

  // ########### SEND MESSAGE (CONTACTO O GRUPO) ##############
  sendMsg(lead: { message: string; phone: string; isGroup: boolean }): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.instance) {
        const { message, phone, isGroup } = lead;
        const target = isGroup ? `${phone}@g.us` : `${phone}@c.us`;
        console.log(`Enviando mensaje a: ${target}, isGroup: ${isGroup}, mensaje: ${message}`);
        this.instance.sendText(target, message).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      } else {
        reject(new Error("Instance not initialized"));
      }
    });
  }

  // ########### SEND FILE BASE 64 ####################
  sendFileFromBase64(lead: { message: string; phone: string; filename: string; caption: string; isGroup: boolean }): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.instance) {
        const { message, phone, filename, caption, isGroup } = lead;
        const target = isGroup ? `${phone}@g.us` : `${phone}@c.us`;
        this.instance.sendFileFromBase64(target, message, filename, caption).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      } else {
        reject(new Error("Instance not initialized"));
      }
    });
  }

  // ########### SEND IMAGE ####################
  sendImageFromBase64(lead: { message: string; phone: string; filename: string; caption: string; isGroup: boolean }): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.instance) {
        const { message, phone, filename, caption, isGroup } = lead;
        const target = isGroup ? `${phone}@g.us` : `${phone}@c.us`;
        this.instance.sendImageFromBase64(target, message, filename, caption).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      } else {
        reject(new Error("Instance not initialized"));
      }
    });
  }

  // ########### SEND IMAGE GROUP ####################
  sendImageFromBase64Group(lead: { message: string; phone: string; filename: string; caption: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.instance) {
        const { message, phone, filename, caption } = lead;
        const target = `${phone}@g.us`;
        this.instance.sendImageFromBase64(target, message, filename, caption).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      } else {
        reject(new Error("Instance not initialized"));
      }
    });
  }

  // ########### SEND FILE BASE 64 GROUP ####################
  sendFileFromBase64Group(lead: { message: string; phone: string; filename: string; caption: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.instance) {
        const { message, phone, filename, caption } = lead;
        const target = `${phone}@g.us`;
        this.instance.sendFileFromBase64(target, message, filename, caption).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      } else {
        reject(new Error("Instance not initialized"));
      }
    });
  }

  // ########### GET GROUP INFO FROM INVITE LINK ####################
  getGroupInfoFromInviteLink(lead: { message: string; phone: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.instance) {
        const { phone } = lead;
        this.instance.getGroupInfoFromInviteLink(phone)
          .then(response => resolve(response))
          .catch(error => reject(error));
      } else {
        reject(new Error("Instance not initialized"));
      }
    });
  }

  private generateImage = (base64: string) => {
    const path = `${process.cwd()}/tmp`;
    let qr_svg = imageQr(base64, { type: "svg", margin: 4 });
    qr_svg.pipe(require("fs").createWriteStream(`${path}/qr.svg`));
    console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡`);
    console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
  };
}

export default VenomTransporter;
