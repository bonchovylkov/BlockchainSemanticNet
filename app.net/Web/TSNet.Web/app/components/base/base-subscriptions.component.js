"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseSubscriptionsComponent = /** @class */ (function () {
    function BaseSubscriptionsComponent() {
        this.subscriptions = [];
    }
    // Plugability point
    BaseSubscriptionsComponent.prototype.onInit = function () { };
    // Plugability point
    BaseSubscriptionsComponent.prototype.onDestroy = function () { };
    BaseSubscriptionsComponent.prototype.ngOnInit = function () {
        this.onInit();
    };
    BaseSubscriptionsComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
        this.onDestroy();
    };
    return BaseSubscriptionsComponent;
}());
exports.BaseSubscriptionsComponent = BaseSubscriptionsComponent;
//# sourceMappingURL=base-subscriptions.component.js.map