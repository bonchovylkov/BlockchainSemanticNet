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
var http_1 = require("@angular/common/http");
var tap_1 = require("rxjs/operators/tap");
var identity_service_1 = require("../identity.service");
var router_service_1 = require("../router.service");
var app_constants_1 = require("../../app.constants");
var AuthErrorsInterceptorService = /** @class */ (function () {
    function AuthErrorsInterceptorService(identityService, routerService) {
        this.identityService = identityService;
        this.routerService = routerService;
    }
    AuthErrorsInterceptorService.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).pipe(tap_1.tap(function () { }, function (err) {
            if (err instanceof http_1.HttpErrorResponse) {
                if (err.status === app_constants_1.STATUS_CODES.UNAUTHORIZED) {
                    _this.identityService.removeIdentity();
                    _this.routerService.redirectToLogin();
                }
                else if (err.status === app_constants_1.STATUS_CODES.FORBIDDEN) {
                    _this.routerService.redirectToHome();
                }
            }
        }));
    };
    AuthErrorsInterceptorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [identity_service_1.IdentityService, router_service_1.RouterService])
    ], AuthErrorsInterceptorService);
    return AuthErrorsInterceptorService;
}());
exports.AuthErrorsInterceptorService = AuthErrorsInterceptorService;
//# sourceMappingURL=auth-errors-interceptor.service.js.map