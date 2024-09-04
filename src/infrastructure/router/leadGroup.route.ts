import express, { Router } from "express";
import container from "../ioc";
import LeadGroupCtrl from "../controller/leadGroup.ctrl";
const router: Router = Router();

/**
 * http://localhost/leadGroup POST
 */
const leadGroupCtrl: LeadGroupCtrl= container.get("leadGroup.ctrl");
router.post("/", leadGroupCtrl.sendCtrl);

export { router };
