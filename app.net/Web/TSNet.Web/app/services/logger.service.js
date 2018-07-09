"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LoggerService = /** @class */ (function () {
    function LoggerService() {
    }
    LoggerService.prototype.log = function (message) {
        console.log(this.format(message));
    };
    LoggerService.prototype.logWithColor = function (message, color) {
        if (color === void 0) { color = '#3F73F8'; }
        console.log("%c" + this.format(message), "color:" + color + ";");
    };
    LoggerService.prototype.warn = function (message) {
        console.warn(this.format(message));
    };
    LoggerService.prototype.error = function (message) {
        console.error(this.format(message));
    };
    LoggerService.prototype.format = function (message) {
        var date = new Date();
        return "[" + date.toISOString() + "] " + message;
    };
    LoggerService = __decorate([
        core_1.Injectable()
    ], LoggerService);
    return LoggerService;
}());
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map