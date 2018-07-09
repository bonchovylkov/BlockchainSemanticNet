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
var storage_service_1 = require("./storage.service");
var IdentityService = /** @class */ (function () {
    function IdentityService(storageService) {
        this.storageService = storageService;
        this.token = null;
        this.tokenExpiry = null;
        this.email = null;
        this.roles = null;
    }
    IdentityService_1 = IdentityService;
    IdentityService.prototype.getEmail = function () {
        if (!this.email) {
            this.email = this.storageService.getItem(IdentityService_1.EMAIL_KEY);
        }
        return this.email;
    };
    IdentityService.prototype.getToken = function () {
        if (!this.token) {
            var persistedToken = this.storageService.getItem(IdentityService_1.TOKEN_KEY);
            if (persistedToken) {
                this.token = persistedToken;
                this.tokenExpiry =
                    new Date().getTime() + parseInt(this.storageService.getItem(IdentityService_1.TOKEN_EXPIRY_KEY));
            }
        }
        if (this.tokenExpiry && new Date().getTime() > this.tokenExpiry) {
            this.removeToken();
        }
        return this.token;
    };
    IdentityService.prototype.getRoles = function () {
        if (!this.roles) {
            var persistedRoles = this.storageService.getItem(IdentityService_1.ROLES_KEY);
            if (persistedRoles) {
                this.roles = JSON.parse(persistedRoles);
            }
        }
        return this.roles;
    };
    IdentityService.prototype.setEmail = function (email) {
        this.email = email;
        this.storageService.setItem(IdentityService_1.EMAIL_KEY, email);
    };
    IdentityService.prototype.setToken = function (token, tokenExpiry) {
        this.token = token;
        this.tokenExpiry = new Date().getTime() + tokenExpiry;
        this.storageService.setItem(IdentityService_1.TOKEN_KEY, token);
        this.storageService.setItem(IdentityService_1.TOKEN_EXPIRY_KEY, tokenExpiry);
    };
    IdentityService.prototype.setRoles = function (roles) {
        this.roles = roles;
        this.storageService.setItem(IdentityService_1.ROLES_KEY, roles);
    };
    IdentityService.prototype.removeIdentity = function () {
        this.removeEmail();
        this.removeToken();
        this.removeRoles();
    };
    IdentityService.prototype.removeEmail = function () {
        this.email = null;
        this.storageService.removeItem(IdentityService_1.EMAIL_KEY);
    };
    IdentityService.prototype.removeToken = function () {
        this.token = null;
        this.tokenExpiry = null;
        this.storageService.removeItem(IdentityService_1.TOKEN_KEY);
        this.storageService.removeItem(IdentityService_1.TOKEN_EXPIRY_KEY);
    };
    IdentityService.prototype.removeRoles = function () {
        this.roles = null;
        this.storageService.removeItem(IdentityService_1.ROLES_KEY);
    };
    IdentityService.EMAIL_KEY = 'IDENTITY_EMAIL';
    IdentityService.TOKEN_KEY = 'IDENTITY_TOKEN';
    IdentityService.TOKEN_EXPIRY_KEY = 'IDENTITY_TOKEN_EXPIRY';
    IdentityService.ROLES_KEY = 'IDENTITY_ROLES';
    IdentityService = IdentityService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [storage_service_1.StorageService])
    ], IdentityService);
    return IdentityService;
    var IdentityService_1;
}());
exports.IdentityService = IdentityService;
//# sourceMappingURL=identity.service.js.map