"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StorageService = /** @class */ (function () {
    function StorageService() {
    }
    StorageService.prototype.getItem = function (key) {
        return localStorage.getItem(key);
    };
    StorageService.prototype.setItem = function (key, data) {
        if (data && typeof data !== 'string') {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }
            else {
                data = data.toString();
            }
        }
        localStorage.setItem(key, data);
    };
    StorageService.prototype.removeItem = function (key) {
        localStorage.removeItem(key);
    };
    StorageService = __decorate([
        core_1.Injectable()
    ], StorageService);
    return StorageService;
}());
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map