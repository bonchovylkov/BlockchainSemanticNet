"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_service_1 = require("../auth.service");
var router_service_1 = require("../router.service");
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(routerService, authService) {
        this.routerService = routerService;
        this.authService = authService;
    }
    AuthGuardService.prototype.canActivate = function (route, state) {
        return this.checkAuth();
    };
    AuthGuardService.prototype.canActivateChild = function (route, state) {
        return this.checkAuth();
    };
    AuthGuardService.prototype.checkAuth = function () {
        if (this.authService.isAuthorized()) {
            return true;
        }
        this.routerService.redirectToLogin();
        return false;
    };
    AuthGuardService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_service_1.RouterService, auth_service_1.AuthService])
    ], AuthGuardService);
    return AuthGuardService;
}());
exports.AuthGuardService = AuthGuardService;
//# sourceMappingURL=auth-guard.service.js.map