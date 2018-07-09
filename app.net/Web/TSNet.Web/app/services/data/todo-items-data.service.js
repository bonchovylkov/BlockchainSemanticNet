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
var TodoItemsDataService = /** @class */ (function () {
    function TodoItemsDataService(httpClient) {
        this.httpClient = httpClient;
    }
    TodoItemsDataService_1 = TodoItemsDataService;
    TodoItemsDataService.prototype.getAll = function () {
        return this.httpClient.get(TodoItemsDataService_1.URLS.ALL);
    };
    TodoItemsDataService.prototype.create = function (todoItem) {
        return this.httpClient.post(TodoItemsDataService_1.URLS.CREATE, todoItem);
    };
    TodoItemsDataService.prototype.markAsDone = function (id) {
        return this.httpClient.post("" + TodoItemsDataService_1.URLS.MARK_AS_DONE + id, null);
    };
    TodoItemsDataService.URLS = {
        ALL: 'api/todoitems/all',
        CREATE: 'api/todoitems/create',
        MARK_AS_DONE: 'api/todoitems/markasdone/'
    };
    TodoItemsDataService = TodoItemsDataService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], TodoItemsDataService);
    return TodoItemsDataService;
    var TodoItemsDataService_1;
}());
exports.TodoItemsDataService = TodoItemsDataService;
//# sourceMappingURL=todo-items-data.service.js.map