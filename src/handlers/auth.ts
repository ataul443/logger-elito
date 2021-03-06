import { redis } from "../lib";

export function registerLogClient(req, res) {
  let username: string = req.body.username;
  let now = new Date().getTime();

  const usernameTestPattern = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
  if (username.length > 16 || !usernameTestPattern.test(username)) {
    res.code(406);
    res.send({
      status: "FAILED",
      error: "USERNAME_INVALID"
    });
    return -1;
  }
  redis
    .hexists(username, "latestSync")
    .then(result => {
      if (result == 1) {
        res.code(406);
        res.send({ status: "FAILED", error: "USER_EXISTS" });
      } else {
        return redis.hset(username, "latestSync", now);
      }
    })
    .then(result => {
      if (result == 1) {
        res.code(200);
        res.send({ status: "OK", mesg: "USER_CREATED" });
      }
    })
    .catch(e => {
      res.code(500);
      res.send({ status: "FAILED", error: "INTERNAL_SERVER_ERROR" });
      req.log.error(e);
    });
}
