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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var schema_1 = require("@colyseus/schema");
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity(x, y, radius) {
        var _this = _super.call(this) || this;
        _this.dead = false;
        _this.angle = 0;
        _this.speed = 0;
        _this.x = x;
        _this.y = y;
        _this.radius = radius;
        return _this;
    }
    Entity.distance = function (a, b) {
        return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    };
    __decorate([
        schema_1.type("float64")
    ], Entity.prototype, "x");
    __decorate([
        schema_1.type("float64")
    ], Entity.prototype, "y");
    __decorate([
        schema_1.type("float32")
    ], Entity.prototype, "radius");
    return Entity;
}(schema_1.Schema));
exports.Entity = Entity;
