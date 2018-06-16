import { redis } from "../lib";

export function logsDispatcher(req, res) {
  const username = req.body.username;
  const hostname = req.body.host;
  let key = req.body.logLevel + ":" + hostname;
  const now = new Date().getTime();

  redis
    .hget(username, "latestSync")
    .then(time => {
      let latestSync: number = Number(time);
      return redis.zrangebyscore(key, latestSync, "+inf");
    })
    .then(logArray => {
      if (logArray.length == 0) {
        res.code(404);
        res.send({ status: "FAILED", error: "NO_DATA_FOUND" });
      } else {
        redis
          .hset(username, "latestSync", now)
          .then(result => {
            res.code(302);
            logArray = logArray.map(err => {
              return JSON.parse(err);
            });
            res.send({ status: "OK", newLogs: logArray });
          })
          .catch(e => {
            res.code(500);
            res.send({ status: "FAILED", error: "INTERNAL_SERVER_ERROR" });
            req.log.error(e);
          });
      }
    })
    .catch(e => {
      res.code(500);
      res.send({ error: "INTERNAL_SERVER_ERROR" });
      req.log.error(e);
    });
}
