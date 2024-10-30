import express, { Router } from "express";
import LeadCtrl from "../controller/lead.ctrl";
import container from "../ioc";
const router: Router = Router();

/**
 * http://localhost/lead POST
 */
const leadCtrl: LeadCtrl = container.get("lead.ctrl");

// Ruta existente para el envío de otros mensajes (archivos, imágenes, etc.)
router.post("/", leadCtrl.sendCtrl);

// Nueva ruta para el envío de OTP por WhatsApp
router.post("/send-otp-whatsapp", leadCtrl.sendOtpByWhatsApp);

export { router };