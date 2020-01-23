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
var Entity_1 = require("./Entity");
var State_1 = require("./State");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        return _super.call(this, x, y, State_1.DEFAULT_PLAYER_RADIUS) || this;
    }
    return Player;
}(Entity_1.Entity));
exports.Player = Player;
