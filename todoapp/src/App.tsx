import React, {useState} from 'react';
import './assets/App.css';
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import {Todo} from "./typescripts/model";
import {DragDropContext, DropResult} from 'react-beautiful-dnd'

function App() {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (todo) {
            setTodos([...todos, {id: Date.now(), todo, isDone: false}]);
            setTodo("");
        }

    }

    const onDragEnd = (result: DropResult) => {
        const {source, destination} = result
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;
        let add;
        let active = todos
        let completed = completedTodos

        if (source.droppableId === 'TodosList') {
            add = active[source.index]
            active.splice(source.index, 1)
        } else {
            add = completed[source.index]
            completed.splice(source.index, 1)
        }

        if (destination.droppableId === 'TodosList') {
            active.splice(destination.index, 0, add)
        } else {
            completed.splice(destination.index, 0, add)
        }

        setCompletedTodos(completed)
        setTodos(active)

    }

    return (<DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <header className="header">
                    <h1>Taskify</h1>
                    <InputField
                        todo={todo}
                        setTodo={setTodo}
                        handleAdd={handleAdd}
                    />
                    <TodoList
                        todos={todos}
                        setTodos={setTodos}
                        completedTodos={completedTodos}
                        setCompletedTodos={setCompletedTodos}
                    />
                </header>
            </div>
        </DragDropContext>

    );
}

export default App;
