"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../../services/index");
var base_subscriptions_component_1 = require("../../base/base-subscriptions.component");
var AppHeaderComponent = /** @class */ (function (_super) {
    __extends(AppHeaderComponent, _super);
    function AppHeaderComponent(authService, identityService) {
        var _this = _super.call(this) || this;
        _this.authService = authService;
        _this.identityService = identityService;
        _this.isUserAuthorized = false;
        _this.userEmail = null;
        return _this;
    }
    AppHeaderComponent.prototype.logout = function () {
        this.authService.logout();
    };
    AppHeaderComponent.prototype.onInit = function () {
        var _this = this;
        this.subscriptions.push(this.authService.isAuthorized$.subscribe(function (isAuthorized) {
            _this.isUserAuthorized = isAuthorized;
            _this.userEmail = isAuthorized ? _this.identityService.getEmail() : null;
        }));
    };
    AppHeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-header',
            templateUrl: 'app-header.component.html'
        }),
        __metadata("design:paramtypes", [index_1.AuthService, index_1.IdentityService])
    ], AppHeaderComponent);
    return AppHeaderComponent;
}(base_subscriptions_component_1.BaseSubscriptionsComponent));
exports.AppHeaderComponent = AppHeaderComponent;
//# sourceMappingURL=app-header.component.js.map