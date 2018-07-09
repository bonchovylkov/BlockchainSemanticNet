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
var index_1 = require("../../../services/index");
var index_2 = require("../../../domain/index");
var TodoItemCreateComponent = /** @class */ (function () {
    function TodoItemCreateComponent(todoItemsDataService, routerService) {
        this.todoItemsDataService = todoItemsDataService;
        this.routerService = routerService;
        this.todoItem = new index_2.TodoItem();
        this.errorMessage = null;
    }
    TodoItemCreateComponent.prototype.create = function () {
        var _this = this;
        this.todoItemsDataService.create(this.todoItem).subscribe(function () { return _this.routerService.navigateByUrl('/user/todo-items'); }, function (error) { return _this.errorMessage = error.error || 'Create TODO item failed.'; });
    };
    TodoItemCreateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'todo-item-create',
            templateUrl: 'todo-item-create.component.html'
        }),
        __metadata("design:paramtypes", [index_1.TodoItemsDataService, index_1.RouterService])
    ], TodoItemCreateComponent);
    return TodoItemCreateComponent;
}());
exports.TodoItemCreateComponent = TodoItemCreateComponent;
//# sourceMappingURL=todo-item-create.component.js.map