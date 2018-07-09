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
var TodoItemsComponent = /** @class */ (function () {
    function TodoItemsComponent(todoItemsDataService) {
        this.todoItemsDataService = todoItemsDataService;
        this.todoItems = [];
        this.errorMessage = null;
    }
    TodoItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todoItemsDataService.getAll().subscribe(function (data) { return _this.todoItems = data; });
    };
    TodoItemsComponent.prototype.markAsDone = function (todoItem) {
        var _this = this;
        this.todoItemsDataService.markAsDone(todoItem.id).subscribe(function () {
            _this.errorMessage = null;
            todoItem.isDone = true;
        }, function (error) { return _this.errorMessage = error.error || 'Mark TODO as done failed.'; });
    };
    TodoItemsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'todo-items',
            templateUrl: 'todo-items.component.html'
        }),
        __metadata("design:paramtypes", [index_1.TodoItemsDataService])
    ], TodoItemsComponent);
    return TodoItemsComponent;
}());
exports.TodoItemsComponent = TodoItemsComponent;
//# sourceMappingURL=todo-items.component.js.map