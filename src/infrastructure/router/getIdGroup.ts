import express, { Router } from "express";
import container from "../ioc";
import GetIdGroupCtrl from "../controller/getGroup.ctrl";
const router: Router = Router();

/**
 * http://localhost/leadGroup POST
 */
const getIdGroupCtrl: GetIdGroupCtrl= container.get("getGroup.ctrl");
router.post("/", getIdGroupCtrl.sendCtrl);

export { router };
