"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("./index");
var index_2 = require("../../services/index");
var ACCOUNT_ROUTES = [
    {
        path: '',
        component: index_1.UserComponent,
        canActivate: [index_2.AuthGuardService],
        canActivateChild: [index_2.AuthGuardService],
        children: [
            { path: '', redirectTo: '/user/todo-items', pathMatch: 'full' },
            { path: 'todo-item-create', component: index_1.TodoItemCreateComponent },
            { path: 'todo-items', component: index_1.TodoItemsComponent }
        ]
    }
];
var UserRoutingModule = /** @class */ (function () {
    function UserRoutingModule() {
    }
    UserRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(ACCOUNT_ROUTES)],
            exports: [router_1.RouterModule]
        })
    ], UserRoutingModule);
    return UserRoutingModule;
}());
exports.UserRoutingModule = UserRoutingModule;
//# sourceMappingURL=user.routes.js.map