import { redis } from "../lib";

export function heartBeatRegister(req, res) {
  res.send({ status: "OK", service: "UP" });
}
