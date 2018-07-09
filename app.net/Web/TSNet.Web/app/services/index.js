"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var todo_items_data_service_1 = require("./data/todo-items-data.service");
var auth_guard_service_1 = require("./guards/auth-guard.service");
var auth_no_guard_service_1 = require("./guards/auth-no-guard.service");
var auth_errors_interceptor_service_1 = require("./http-interceptors/auth-errors-interceptor.service");
var auth_interceptor_service_1 = require("./http-interceptors/auth-interceptor.service");
var auth_service_1 = require("./auth.service");
var identity_service_1 = require("./identity.service");
var logger_service_1 = require("./logger.service");
var router_service_1 = require("./router.service");
var storage_service_1 = require("./storage.service");
var window_ref_service_1 = require("./window-ref.service");
__export(require("./data/todo-items-data.service"));
__export(require("./guards/auth-guard.service"));
__export(require("./guards/auth-no-guard.service"));
__export(require("./http-interceptors/auth-errors-interceptor.service"));
__export(require("./http-interceptors/auth-interceptor.service"));
__export(require("./auth.service"));
__export(require("./identity.service"));
__export(require("./logger.service"));
__export(require("./router.service"));
__export(require("./storage.service"));
__export(require("./window-ref.service"));
exports.APP_SERVICES = [
    todo_items_data_service_1.TodoItemsDataService,
    auth_guard_service_1.AuthGuardService,
    auth_no_guard_service_1.AuthNoGuardService,
    auth_errors_interceptor_service_1.AuthErrorsInterceptorService,
    auth_interceptor_service_1.AuthInterceptorService,
    auth_service_1.AuthService,
    identity_service_1.IdentityService,
    logger_service_1.LoggerService,
    router_service_1.RouterService,
    storage_service_1.StorageService,
    window_ref_service_1.WindowRefService
];
//# sourceMappingURL=index.js.map