"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
function syncLog(req, res) {
    const username = req.body.username;
    const level = req.body.logLevel;
    lib_1.redis
        .hget(username, "latestSync")
        .then(time => {
        let latestSync = Number(time);
        return lib_1.redis.zcount(level, latestSync, "+inf");
    })
        .then(count => {
        if (count == 0) {
            res.code(404);
            res.send({ error: "NO_DATA_FOUND" });
            return -1;
        }
        else {
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
exports.syncLog = syncLog;
