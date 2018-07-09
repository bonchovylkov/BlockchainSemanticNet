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
var map_1 = require("rxjs/operators/map");
var catchError_1 = require("rxjs/operators/catchError");
var ErrorObservable_1 = require("rxjs/observable/ErrorObservable");
var EmptyObservable_1 = require("rxjs/observable/EmptyObservable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var identity_service_1 = require("./identity.service");
var router_service_1 = require("./router.service");
var logger_service_1 = require("./logger.service");
var index_1 = require("../domain/index");
var AuthService = /** @class */ (function () {
    function AuthService(httpClient, identityService, routerService, loggerService) {
        this.httpClient = httpClient;
        this.identityService = identityService;
        this.routerService = routerService;
        this.loggerService = loggerService;
        this.isAuthorizedSubject = new BehaviorSubject_1.BehaviorSubject(this.isAuthorized());
        this.isAuthorized$ = this.isAuthorizedSubject.asObservable();
    }
    AuthService_1 = AuthService;
    AuthService.prototype.register = function (userRegister) {
        var _this = this;
        return this.httpClient.post(AuthService_1.URLS.REGISTER, userRegister).pipe(map_1.map(function () {
            var userLogin = new index_1.UserLogin();
            userLogin.email = userRegister.email;
            userLogin.password = userRegister.password;
            return _this.login(userLogin).subscribe(function () { }, function (error) { return _this.loggerService.error(error); });
        }), catchError_1.catchError(function (err) { return ErrorObservable_1.ErrorObservable.create(err); }));
    };
    AuthService.prototype.login = function (userLogin) {
        var _this = this;
        var payload = new http_1.HttpParams()
            .set('email', userLogin.email)
            .set('password', userLogin.password)
            .toString();
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this.httpClient.post(AuthService_1.URLS.LOGIN, payload, { headers: headers }).pipe(map_1.map(function (data) {
            _this.identityService.setToken(data['access_token'], data['expires_in']);
            _this.identityService.setRoles(data['roles']);
            _this.identityService.setEmail(userLogin.email);
            _this.isAuthorizedSubject.next(true);
            _this.routerService.redirectToHome();
            return EmptyObservable_1.EmptyObservable.create();
        }), catchError_1.catchError(function (err) { return ErrorObservable_1.ErrorObservable.create(err); }));
    };
    AuthService.prototype.logout = function () {
        this.identityService.removeIdentity();
        this.isAuthorizedSubject.next(false);
        this.routerService.redirectToHome();
    };
    AuthService.prototype.isAuthorized = function () {
        return this.identityService.getToken() !== null;
    };
    AuthService.URLS = {
        LOGIN: 'api/account/login',
        REGISTER: 'api/account/register'
    };
    AuthService = AuthService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            identity_service_1.IdentityService,
            router_service_1.RouterService,
            logger_service_1.LoggerService])
    ], AuthService);
    return AuthService;
    var AuthService_1;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map