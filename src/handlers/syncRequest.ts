import { redis } from "../lib";

export function syncLog(req, res) {
  const username = req.body.username;
  let mcs = req.body.services;
  let level = req.body.logLevel;

  redis
    .hget(username, "latestSync")
    .then(time => {
      let latestSync: number = Number(time);
      let temp = [];
      mcs.map(hostname => {
        let key = level + ":" + hostname;
        temp.push(redis.zcount(key, latestSync, "+inf"));
      });

      return Promise.all(temp);
    })
    .then(countArray => {
      let temp = countArray;
      let count = temp.reduce((total, count) => total + count);
      if (count == 0) {
        res.code(404);
        res.send({ status: "FAILED", error: "NO_DATA_FOUND" });
      } else {
        res.code(302);
        res.send({ status: "OK", newLogsCount: count });
      }
    })
    .catch(e => {
      res.code(500);
      res.send({ status: "FAILED", error: "INTERNAL_SERVER_ERROR" });
      req.log.error(e);
    });
}
