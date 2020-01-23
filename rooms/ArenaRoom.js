"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var colyseus_1 = require("colyseus");
var Entity_1 = require("./Entity");
var State_1 = require("./State");
var ArenaRoom = /** @class */ (function (_super) {
    __extends(ArenaRoom, _super);
    function ArenaRoom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArenaRoom.prototype.onCreate = function () {
        var _this = this;
        this.setState(new State_1.State());
        this.state.initialize();
        this.setSimulationInterval(function () { return _this.state.update(); });
    };
    ArenaRoom.prototype.onJoin = function (client, options) {
        console.log(client.sessionId, "JOINED");
        this.state.createPlayer(client.sessionId);
    };
    ArenaRoom.prototype.onMessage = function (client, message) {
        var entity = this.state.entities[client.sessionId];
        // skip dead players
        if (!entity) {
            console.log("DEAD PLAYER ACTING...");
            return;
        }
        var command = message[0], data = message[1];
        // change angle
        if (command === "mouse") {
            var dst = Entity_1.Entity.distance(entity, data);
            entity.speed = (dst < 20) ? 0 : Math.min(dst / 15, 4);
            entity.angle = Math.atan2(entity.y - data.y, entity.x - data.x);
        }
    };
    ArenaRoom.prototype.onLeave = function (client) {
        console.log(client.sessionId, "LEFT!");
        var entity = this.state.entities[client.sessionId];
        // entity may be already dead.
        if (entity) {
            entity.dead = true;
        }
    };
    return ArenaRoom;
}(colyseus_1.Room));
exports.ArenaRoom = ArenaRoom;
