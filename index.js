"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var colyseus_1 = require("colyseus");
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
// import basicAuth from "express-basic-auth";
// import socialRoutes from "@colyseus/social/express";
var monitor_1 = require("@colyseus/monitor");
var ArenaRoom_1 = require("./rooms/ArenaRoom");
exports.port = Number(process.env.PORT || 8080);
exports.endpoint = "localhost";
var app = express_1["default"]();
var gameServer = new colyseus_1.Server({
    server: http_1["default"].createServer(app),
    express: app
});
gameServer.define("arena", ArenaRoom_1.ArenaRoom);
// on production, use ./public as static root
exports.STATIC_DIR = path_1["default"].resolve(__dirname, "public");
app.use("/", express_1["default"].static(exports.STATIC_DIR));
// @colyseus/social routes
// app.use("/", socialRoutes);
// add colyseus monitor
// const auth = basicAuth({ users: { 'admin': 'admin' }, challenge: true });
app.use("/colyseus", monitor_1.monitor());
gameServer.listen(exports.port);
console.log("Listening on http://" + exports.endpoint + ":" + exports.port);
