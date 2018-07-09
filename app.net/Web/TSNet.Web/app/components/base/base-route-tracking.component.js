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
Object.defineProperty(exports, "__esModule", { value: true });
var base_subscriptions_component_1 = require("./base-subscriptions.component");
var BaseRouteTrackingComponent = /** @class */ (function (_super) {
    __extends(BaseRouteTrackingComponent, _super);
    function BaseRouteTrackingComponent(activatedRoute) {
        var _this = _super.call(this) || this;
        _this.activatedRoute = activatedRoute;
        return _this;
    }
    // Plugability point
    BaseRouteTrackingComponent.prototype.onRouteChange = function () { };
    BaseRouteTrackingComponent.prototype.onInit = function () {
        var _this = this;
        _super.prototype.onInit.call(this);
        this.subscriptions.push(this.activatedRoute.params.subscribe(function (params) {
            _this.routeParams = params;
            _this.onRouteChange();
        }));
    };
    return BaseRouteTrackingComponent;
}(base_subscriptions_component_1.BaseSubscriptionsComponent));
exports.BaseRouteTrackingComponent = BaseRouteTrackingComponent;
//# sourceMappingURL=base-route-tracking.component.js.map