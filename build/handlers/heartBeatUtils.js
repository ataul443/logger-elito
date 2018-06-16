"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function heartBeatRegister(req, res) {
    res.send({ status: "OK", service: "UP" });
}
exports.heartBeatRegister = heartBeatRegister;
