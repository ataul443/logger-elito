import { redis } from "../lib";

export function authStatus(req, res, next) {
  let username: string = req.body.username;

  const usernameTestPattern = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
  if (username.length > 16 || !usernameTestPattern.test(username)) {
    res.code(406);
    res.send({
      error: "USERNAME_INVALID"
    });
    next();
  }

  redis
    .hexists(username, "latestSync")
    .then(result => {
      if (result != 1) {
        res.code(404);
        res.send({ error: "USER_NOT_FOUND" });
      } else {
        next();
      }
    })
    .catch(e => {
      res.code(500);
      res.send({ error: "INTERNAL_SERVER_ERROR" });
      res.log.error(e);
      next();
    });
}
