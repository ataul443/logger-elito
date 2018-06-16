"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
function syncLog(req, res) {
    const username = req.body.username;
    let mcs = req.body.services;
    let level = req.body.logLevel;
    lib_1.redis
        .hget(username, "latestSync")
        .then(time => {
        let latestSync = Number(time);
        let temp = [];
        mcs.map(hostname => {
            let key = level + ":" + hostname;
            temp.push(lib_1.redis.zcount(key, latestSync, "+inf"));
        });
        return Promise.all(temp);
    })
        .then(countArray => {
        let temp = countArray;
        let count = temp.reduce((total, count) => total + count);
        if (count == 0) {
            res.code(404);
            res.send({ status: "FAILED", error: "NO_DATA_FOUND" });
        }
        else {
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
exports.syncLog = syncLog;
