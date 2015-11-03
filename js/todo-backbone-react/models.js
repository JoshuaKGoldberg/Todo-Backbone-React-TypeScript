/// <reference path="../lib/backbone.d.ts" />
/// <reference path="../lib/backbone-localstorage.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Demo;
(function (Demo) {
    var Todo;
    (function (Todo_1) {
        var BackboneReactApp;
        (function (BackboneReactApp) {
            /**
             * A simple Backbone model that should contain the schema in ITodoValue.
             */
            var Todo = (function (_super) {
                __extends(Todo, _super);
                function Todo() {
                    _super.apply(this, arguments);
                }
                /**
                 * Toggles whether the completed attribute is true or false.
                 */
                Todo.prototype.toggle = function () {
                    this.set("completed", !this.get("completed"));
                };
                return Todo;
            })(Backbone.Model);
            BackboneReactApp.Todo = Todo;
            /**
             * A simple Backbone collection of Todo models stored in localStorage.
             */
            var TodoList = (function (_super) {
                __extends(TodoList, _super);
                /**
                 * Initializes a new instance of the TodoList class.
                 *
                 * @param stateName   What to store this under in localStorage.
                 * @param models
                 * @param options
                 */
                function TodoList(stateName, models, options) {
                    this.model = Todo;
                    this.localStorage = new Backbone.LocalStorage("todo-backbone-react-" + stateName);
                    _super.call(this, models, options);
                }
                return TodoList;
            })(Backbone.Collection);
            BackboneReactApp.TodoList = TodoList;
        })(BackboneReactApp = Todo_1.BackboneReactApp || (Todo_1.BackboneReactApp = {}));
    })(Todo = Demo.Todo || (Demo.Todo = {}));
})(Demo || (Demo = {}));
