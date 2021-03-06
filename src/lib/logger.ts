import * as pino from "pino";

import { pinoRedis } from "./pino-redis";
import { redis } from "./redisClent";

const pinoRedisPipe = pinoRedis({
  redisClient: redis,
  includeLevels: ["fatal", "error"],
  expireDuration: 60 * 60 * 24
});

export const logger = pino(
  {
    serializers: {
      err: pino.stdSerializers.err,
      fatal: pino.stdSerializers.err
    }
  },
  pinoRedisPipe
);
