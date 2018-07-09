"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var app_footer_component_1 = require("./theme/app-footer.component");
var app_header_component_1 = require("./theme/app-header.component");
var index_1 = require("../../directives/index");
var index_2 = require("../../pipes/index");
require("d3");
require("nvd3");
var ng2_nvd3_1 = require("ng2-nvd3");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, router_1.RouterModule, ng2_nvd3_1.NvD3Module],
            declarations: [
                app_footer_component_1.AppFooterComponent,
                app_header_component_1.AppHeaderComponent,
                index_1.APP_DIRECTIVES,
                index_2.APP_PIPES
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                app_footer_component_1.AppFooterComponent,
                app_header_component_1.AppHeaderComponent,
                index_1.APP_DIRECTIVES,
                index_2.APP_PIPES,
                ng2_nvd3_1.NvD3Module
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map