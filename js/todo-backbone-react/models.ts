/// <reference path="../lib/backbone.d.ts" />
/// <reference path="../lib/backbone-localstorage.d.ts" />

module Demo.Todo.BackboneReactApp {
    /**
     * A simple representation of a todo's state.
     */
    export interface ITodoValue {
        /**
         * When this todo was originally created (used as a GUID).
         */
        timestamp: number;

        /**
         * The displayed text of the todo.
         */
        text: string;

        /**
         * Whether the todo has been completed already.
         */
        completed: boolean;

        /**
         * The Backbone ID representing this todo, if in a model.
         */
        id?: number;
    }

    /**
     * A simple Backbone model that should contain the schema in ITodoValue.
     */
    export class Todo extends Backbone.Model {
        /**
         * Toggles whether the completed attribute is true or false.
         */
        toggle(): void {
            this.set("completed", !this.get("completed"));
        }
    }

    /**
     * A simple Backbone collection of Todo models stored in localStorage.
     */
    export class TodoList extends Backbone.Collection<Todo> {
        /**
         * The type of model this stores, as the class typeof.
         */
        model: typeof Todo;

        /**
         * The localStorage plugin's location to store values locally.
         */
        localStorage: Backbone.LocalStorage;

        /**
         * Initializes a new instance of the TodoList class.
         * 
         * @param stateName   What to store this under in localStorage.
         * @param models
         * @param options
         */
        constructor(stateName: string, models?: Todo[] | Object[], options?: any) {
            this.model = Todo;
            this.localStorage = new Backbone.LocalStorage("todo-backbone-react-" + stateName);

            super(models, options);
        }
    }
}
