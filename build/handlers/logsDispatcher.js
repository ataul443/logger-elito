"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
function logsDispatcher(req, res) {
    const username = req.body.username;
    const level = req.body.logLevel;
    const now = new Date().getTime();
    lib_1.redis
        .hget(username, "latestSync")
        .then(time => {
        let latestSync = Number(time);
        return lib_1.redis.zrangebyscore(level, latestSync, "+inf");
    })
        .then(logArray => {
        if (logArray.length == 0) {
            res.code(404);
            res.send({ error: "NO_DATA_FOUND" });
            return -1;
        }
        else {
            lib_1.redis
                .hset(username, "latestSync", now)
                .then(result => {
                res.code(302);
                res.send({ newLogs: logArray });
                return -1;
            })
                .catch(e => {
                res.code(500);
                res.send({ error: "INTERNAL_SERVER_ERROR" });
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
exports.logsDispatcher = logsDispatcher;
