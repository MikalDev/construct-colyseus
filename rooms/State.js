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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var nanoid_1 = __importDefault(require("nanoid"));
var schema_1 = require("@colyseus/schema");
var Entity_1 = require("./Entity");
var Player_1 = require("./Player");
var WORLD_SIZE = 2000;
exports.DEFAULT_PLAYER_RADIUS = 10;
var State = /** @class */ (function (_super) {
    __extends(State, _super);
    function State() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.width = WORLD_SIZE;
        _this.height = WORLD_SIZE;
        _this.entities = new schema_1.MapSchema();
        return _this;
    }
    State.prototype.initialize = function () {
        // create some food entities
        for (var i = 0; i < 20; i++) {
            this.createFood();
        }
    };
    State.prototype.createFood = function () {
        var radius = Math.max(4, (Math.random() * (exports.DEFAULT_PLAYER_RADIUS - 1)));
        var food = new Entity_1.Entity(Math.random() * this.width, Math.random() * this.height, radius);
        this.entities[nanoid_1["default"](8)] = food;
    };
    State.prototype.createPlayer = function (sessionId) {
        this.entities[sessionId] = new Player_1.Player(Math.random() * this.width, Math.random() * this.height);
    };
    State.prototype.update = function () {
        var _this = this;
        var deadEntities = [];
        for (var sessionId in this.entities) {
            var entity = this.entities[sessionId];
            if (entity.dead) {
                deadEntities.push(sessionId);
                continue;
            }
            if (entity.radius >= exports.DEFAULT_PLAYER_RADIUS) {
                for (var collideSessionId in this.entities) {
                    var collideTestEntity = this.entities[collideSessionId];
                    // prevent collision with itself
                    if (collideTestEntity === entity) {
                        continue;
                    }
                    if (entity.radius > collideTestEntity.radius &&
                        Entity_1.Entity.distance(entity, collideTestEntity) <= entity.radius - (collideTestEntity.radius / 2)) {
                        var winnerEntity = entity;
                        var loserEntity = collideTestEntity;
                        var loserEntityId = collideSessionId;
                        winnerEntity.radius += loserEntity.radius / 5;
                        loserEntity.dead = true;
                        deadEntities.push(loserEntityId);
                        // create a replacement food
                        if (collideTestEntity.radius < exports.DEFAULT_PLAYER_RADIUS) {
                            this.createFood();
                        }
                        else {
                            console.log(loserEntityId, "has been eaten!");
                        }
                    }
                }
            }
            if (entity.speed > 0) {
                entity.x -= (Math.cos(entity.angle)) * entity.speed;
                entity.y -= (Math.sin(entity.angle)) * entity.speed;
                // apply boundary limits
                if (entity.x < 0) {
                    entity.x = 0;
                }
                if (entity.x > WORLD_SIZE) {
                    entity.x = WORLD_SIZE;
                }
                if (entity.y < 0) {
                    entity.y = 0;
                }
                if (entity.y > WORLD_SIZE) {
                    entity.y = WORLD_SIZE;
                }
            }
        }
        // delete all dead entities
        deadEntities.forEach(function (entityId) { return delete _this.entities[entityId]; });
    };
    __decorate([
        schema_1.type({ map: Entity_1.Entity })
    ], State.prototype, "entities");
    return State;
}(schema_1.Schema));
exports.State = State;
