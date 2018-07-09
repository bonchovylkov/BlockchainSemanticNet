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
var identity_service_1 = require("../identity.service");
var AuthInterceptorService = /** @class */ (function () {
    function AuthInterceptorService(identityService) {
        this.identityService = identityService;
    }
    AuthInterceptorService.prototype.intercept = function (request, next) {
        var authToken = this.identityService.getToken();
        if (authToken) {
            var authRequest = request.clone({ setHeaders: { Authorization: "Bearer " + authToken } });
            return next.handle(authRequest);
        }
        return next.handle(request);
    };
    AuthInterceptorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [identity_service_1.IdentityService])
    ], AuthInterceptorService);
    return AuthInterceptorService;
}());
exports.AuthInterceptorService = AuthInterceptorService;
//# sourceMappingURL=auth-interceptor.service.js.map