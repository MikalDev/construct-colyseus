import { Server } from "colyseus";
import http from "http";
import express from "express";
import path from "path";
// import basicAuth from "express-basic-auth";
// import socialRoutes from "@colyseus/social/express";
import { monitor } from "@colyseus/monitor";

import { ArenaRoom } from "./rooms/ArenaRoom";

export const port = Number(process.env.PORT || 8080);
export const endpoint = "localhost";

export let STATIC_DIR: string;

const app = express();
const gameServer = new Server({
  server: http.createServer(app),
  express: app
});

gameServer.define("arena", ArenaRoom);

    // on production, use ./public as static root
    STATIC_DIR = path.resolve(__dirname, "public");

app.use("/", express.static(STATIC_DIR));

// @colyseus/social routes
// app.use("/", socialRoutes);

// add colyseus monitor
// const auth = basicAuth({ users: { 'admin': 'admin' }, challenge: true });
app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on http://${endpoint}:${port}`);
