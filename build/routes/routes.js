"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("../handlers");
const middlewares_1 = require("../middlewares");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post("/register", handlers_1.registerLogClient);
        fastify.post("/sync", { beforeHandler: [middlewares_1.authStatus] }, handlers_1.syncLog);
        fastify.post("/logs", handlers_1.logsDispatcher);
    });
}
exports.routes = routes;
