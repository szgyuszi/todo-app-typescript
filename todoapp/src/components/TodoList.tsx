import React from 'react';
import {Todo} from "../typescripts/model";
import SingleTodo from "./SingleTodo";
import '../assets/App.css';
import {Droppable} from 'react-beautiful-dnd';

interface Props {
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[]
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

function TodoList({todos, setTodos, completedTodos, setCompletedTodos}: Props) {
    return (

        <div className="todo-container">
            <Droppable droppableId='TodosList'>
                {(provided) => (<div className="active-todos"
                                     ref={provided.innerRef}
                                     {...provided.droppableProps}
                >

                        <span>Active Todos</span>
                        {todos.map((todo, index) => (<SingleTodo
                            index={index}
                            todo={todo}
                            key={todo.id}
                            todos={todos}
                            setTodos={setTodos}
                        />))}

                    {provided.placeholder}
                </div>)}
            </Droppable>
            <Droppable droppableId="TodosRemove">
                {(provided) => (<div className="completed-todos"
                                     ref={provided.innerRef}
                                     {...provided.droppableProps}
                >
                        <span>Completed Todos</span>
                        {completedTodos.map((todo, index) => (<SingleTodo
                            index={index}
                            todo={todo}
                            key={todo.id}
                            todos={completedTodos}
                            setTodos={setCompletedTodos}
                        />))}
                    {provided.placeholder}
                </div>)}
            </Droppable>
        </div>);
}

export default TodoList;