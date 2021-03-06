/// <reference path="../lib/backbone.d.ts" />
/// <reference path="../lib/react.d.ts" />
/// <reference path="../lib/reactdom.d.ts" />
/// <reference path="../lib/react-global.d.ts" />

/// <reference path="models.ts" />

module Demo.Todo.BackboneReactApp {
    /**
     * React props for the general AppView.
     */
    interface IAppViewProps extends React.Props<any> {
        /**
         * The backing Backbone collection.
         */
        todos: TodoList;
    }

    /**
     * React state for the general AppView.
     */
    interface IAppViewState {
        /**
         * A JSON representation of the backing Backbone collection.
         */
        todos: ITodoValue[];

        /**
         * The current value of the text input for new todos' names.
         */
        inputText?: string;
    }

    /**
     * React props for a TodoListView.
     */
    interface ITodoListViewProps extends React.Props<any> {
        /**
         * A JSON representation of some number of todos.
         */
        todos: ITodoValue[];
        
        /**
         * Bubbling callback for when a todo has been updated.
         */
        updateTodoStatus(todo: ITodoValue): void;
    }

    /**
     * React props for a single TodoView.
     */
    interface ITodoViewProps extends React.Props<any> {
        /**
         * A JSON representation of the viewed todo item.
         */
        todo: ITodoValue,

        /**
         * Bubbling callback for when the todo has been updated.
         */
        updateStatus(Todo: ITodoValue): void;
    }

    /**
     * A driving view model for a todo application.
     */
    export class AppViewModel {
        /**
         * The backing Backbone collection of added todos.
         */
        private todos: TodoList;

        /**
         * Initializes a new instanceof of the AppView class.
         */
        constructor() {
            this.todos = new TodoList("my-todos");
            this.todos.fetch();

            ReactDOM.render(
                <AppView todos={this.todos} />,
                document.getElementById("container"));
        }
    }

    /**
     * A view conaining some inputs and lists of incomplete and completed todos.
     */
    export class AppView extends React.Component<IAppViewProps, IAppViewState> {
        /**
         * Initializes a new instance of the AppView class. State is generated by
         * the initial properties' todos.
         * 
         * @param props   Initial properties to store (namely the TodoList).
         */
        constructor(props: IAppViewProps) {
            this.props = props;
            this.state = {
                todos: this.props.todos.toJSON()
            };

            super(props);
        }

        /**
         * Renders the AppView.
         * 
         * @returns The rendered JSX element.
         */
        render(): JSX.Element {
            return (
                <div id="todoapp">
                    <input id="input-text" placeholder="Insert text here" onKeyPress={this.handleInputTextChange.bind(this) } />
                    <input id="input-button" type= "button" value="Add" onClick={this.addTodo.bind(this) } />
                    <input id="input-clear" type="button" value="Clear" onClick={this.clearTodos.bind(this) } />
                    <div id="todo-list">
                        <h4>Incomplete</h4>
                        <TodoListView
                            todos={this.getTodoValuesOfStatus(false) }
                            updateTodoStatus={this.updateTodoStatus.bind(this) } />
                        <h4>Completed</h4>
                        <TodoListView
                            todos={this.getTodoValuesOfStatus(true) }
                            updateTodoStatus={this.updateTodoStatus.bind(this) } />
                        </div>
                    </div>);
        }

        /**
         * Adds a new todo to the collection and view.
         */
        addTodo(): void {
            var todo: Todo = new Todo(this.createTodoValue());

            this.props.todos.add(todo);
            todo.save();

            this.setState({
                todos: this.props.todos.toJSON()
            });
        }

        /**
         * Clears all todos from the collection and view.
         */
        clearTodos(): void {
            this.props.todos.forEach((todo: Todo): void => {
                Backbone.sync("delete", todo);
            });

            this.props.todos.reset();

            this.setState({
                todos: []
            });
        }

        /**
         * Retrieves all state todo representations with the given completed status.
         * 
         * @param status   The completed status as a boolean.
         * @returns An array of JSON representations of todos.
         */
        private getTodoValuesOfStatus(status: boolean): ITodoValue[] {
            return this.state.todos
                .filter((todo: ITodoValue): boolean => todo.completed === status);
        }

        /**
         * Generates the value for a new todo item. Text is taken from the inputText
         * field from the view state.
         *
         * @returns A JSON representation of a new, incomplete todo item.
         */
        private createTodoValue(): ITodoValue {
            return {
                timestamp: new Date().getTime(),
                text: this.state.inputText,
                completed: false
            };
        }

        /**
         * Callback for when the user types into the text input.
         * 
         * @param event   The React event generated for the key press.
         */
        private handleInputTextChange(event: React.KeyboardEvent): void {
            this.setState({
                todos: this.state.todos,
                inputText: (event.target as any).value
            });

            if ((event.nativeEvent as KeyboardEvent).charCode === 13) {
                setTimeout(this.addTodo.bind(this));
            }
        }

        /**
         * Flips a todo's completed status, saving it in the collection and
         * updating the view state.
         * 
         * @param todoRaw   A JSON representation of the todo, including its id.
         */
        private updateTodoStatus(todoRaw: ITodoValue): void {
            var todo = this.props.todos.get(todoRaw.id);

            todo.toggle();
            todo.save();

            this.setState({
                todos: this.props.todos.toJSON()
            });
        }
    }

    /**
     * A view for a list of todos, such as a list of incomplete or completed todos.
     */
    export class TodoListView extends React.Component<ITodoListViewProps, void> {
        /**
         * Renders the TodoListiew.
         * 
         * @returns The rendered JSX element.
         */
        render(): JSX.Element {
            return (
                <div className="todos">
                    {this.props.todos.map((todo: ITodoValue, i: number): JSX.Element => {
                        return (
                            <TodoView
                                key={i}
                                todo={todo}
                                updateStatus={this.props.updateTodoStatus.bind(this, todo) } />);
                    }) }
                    </div>);
        }
    }

    /**
     * A view for a single todo item.
     */
    export class TodoView extends React.Component<ITodoViewProps, void>  {
        /**
         * Renders the TodoView.
         * 
         * @returns The rendered JSX element.
         */
        render(): JSX.Element {
            return (
                <div id={this.props.todo.timestamp.toString() } className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        ref="toggle"
                        onChange={this.props.updateStatus.bind(this, this.props)}
                        defaultChecked={this.props.todo.completed}/>
                    <label>{this.props.todo.text}</label>
                    </div>);
        }
    }
}
