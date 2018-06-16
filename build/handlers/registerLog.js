"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
function registerLog(req, res) {
    let errorObject = req.body.error;
    let hostname = req.body.host;
    console.log(hostname, errorObject);
    hostname = hostname.replace("https://", "");
    hostname = hostname.replace(".herokuapp.com", "");
    lib_1.logger.error({ host: hostname }, errorObject);
    res.send({ status: "OK", mesg: "ERROR_REGISTERED" });
}
exports.registerLog = registerLog;
