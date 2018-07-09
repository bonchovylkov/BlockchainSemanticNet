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
var router_1 = require("@angular/router");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var window_ref_service_1 = require("./window-ref.service");
var RouterService = /** @class */ (function () {
    function RouterService(router, windowRefService) {
        var _this = this;
        this.router = router;
        this.windowRefService = windowRefService;
        this.routes = {};
        this.onStart = new ReplaySubject_1.ReplaySubject(1);
        this.onEnd = new ReplaySubject_1.ReplaySubject(1);
        this.router.events.subscribe(function (e) {
            if (e instanceof router_1.NavigationStart) {
                _this.routes[e.url] = true;
                _this.onStart.next(true);
            }
            else if (e instanceof router_1.NavigationEnd || e instanceof router_1.NavigationCancel || e instanceof router_1.NavigationError) {
                delete _this.routes[e.url];
                if (Object.getOwnPropertyNames(_this.routes).length === 0) {
                    _this.onEnd.next(true);
                }
            }
        });
    }
    RouterService.prototype.getUrl = function () {
        return this.router.url;
    };
    RouterService.prototype.navigateByUrl = function (url) {
        this.router.navigateByUrl(url);
    };
    RouterService.prototype.redirectToLogin = function () {
        this.navigateByUrl('/account/login');
    };
    RouterService.prototype.redirectToHome = function () {
        this.navigateByUrl('/');
    };
    RouterService.prototype.reloadApp = function () {
        this.windowRefService.nativeWindow.location.reload(true);
    };
    RouterService.prototype.subscribeOnStart = function (observerOrNext) {
        return this.onStart.subscribe(observerOrNext);
    };
    RouterService.prototype.subscribeOnEnd = function (observerOrNext) {
        return this.onEnd.subscribe(observerOrNext);
    };
    RouterService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, window_ref_service_1.WindowRefService])
    ], RouterService);
    return RouterService;
}());
exports.RouterService = RouterService;
//# sourceMappingURL=router.service.js.map