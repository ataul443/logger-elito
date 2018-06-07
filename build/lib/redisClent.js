"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
exports.redis = new Redis(process.env.REDIS_URL);
