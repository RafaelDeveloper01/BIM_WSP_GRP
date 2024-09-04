import { ContainerBuilder } from "node-dependency-injection";
import { LeadCreate } from "../application/lead.create";
import LeadCtrl from "./controller/lead.ctrl";
// import MetaRepository from "./repositories/meta.repository";
import MockRepository from "./repositories/mock.repository";
// import TwilioService from "./repositories/twilio.repository";

import { VenomTransporter } from "./repositories/venom.repository";
import { LeadCreateGroup } from "../application/lead.group";
import LeadGroupCtrl from "./controller/leadGroup.ctrl";
import GetIdGroupCtrl from "./controller/getGroup.ctrl";
import { GetIdGroup } from "../application/getId.group";

const container = new ContainerBuilder();
/**
 * Inicamos servicio de WS / Bot / Twilio
 */
container.register("ws.transporter", VenomTransporter);
const wsTransporter = container.get("ws.transporter");

container.register("db.repository", MockRepository);
const dbRepository = container.get("db.repository");

//*************** SEND CONTACT **************/
container
  .register("lead.creator", LeadCreate)
  .addArgument([dbRepository, wsTransporter])
  ;
  
const leadCreator = container.get("lead.creator");
container.register("lead.ctrl", LeadCtrl).addArgument(leadCreator);

// *********SEND GROUP ************
container
  .register("leadGroup.creator", LeadCreateGroup)
  .addArgument([dbRepository, wsTransporter])
  ;

const leadCreatorGroup = container.get("leadGroup.creator");
container.register("leadGroup.ctrl", LeadGroupCtrl).addArgument(leadCreatorGroup);

// ********* GET GROUP ************
container
  .register("IdGroup.get", GetIdGroup)
  .addArgument([dbRepository, wsTransporter]);

const getIdGroup = container.get("IdGroup.get");
container.register("getGroup.ctrl", GetIdGroupCtrl).addArgument(getIdGroup);


export default container;
