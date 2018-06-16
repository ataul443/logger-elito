import { logger } from "../lib";

export function registerLog(req, res) {
  let errorObject = req.body.error;
  let hostname = req.body.host;
  hostname = hostname.replace("https://", "");
  hostname = hostname.replace(".herokuapp.com", "");
  logger.error({ host: hostname }, errorObject);
  res.send({ status: "OK", mesg: "ERROR_REGISTERED" });
}
