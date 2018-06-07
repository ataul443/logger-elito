import { redis } from "../lib";

export function syncLog(req, res) {
  const username = req.body.username;
  const level = req.body.logLevel;

  redis
    .hget(username, "latestSync")
    .then(time => {
      let latestSync: number = Number(time);
      return redis.zcount(level, latestSync, "+inf");
    })
    .then(count => {
      if (count == 0) {
        res.code(404);
        res.send({ error: "NO_DATA_FOUND" });
        return -1;
      } else {
        res.code(302);
        res.send({ newLogsCount: count });
        return -1;
      }
    })
    .catch(e => {
      res.code(500);
      res.send({ error: "INTERNAL_SERVER_ERROR" });
      req.log.error(e);
    });
}
