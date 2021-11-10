import React, { useState, useEffect } from 'react'
import '../../App.css'
import axios from 'axios'
function TodosComp() {
    const [todos, SetTodos] = useState([]);
    const [todo, SetTodo] = useState("");
    const [todoEditing, SetTodoEditing] = useState(null);
    const [todoTextEditing, SetTodoTextEditing] = useState("");
    const [isRendered, SetIsRendered] = useState(false)

    const fetchData = () => {
        SetIsRendered(true);
        axios('http://localhost:3000/todo')
            .then(results => {
                console.log(results.data.todos)
                SetTodos(results.data.todos)
            })
        return () => {
            SetIsRendered(false);
        };
    }
    useEffect(() => {
        fetchData()
    }, []);

    const handleSubmit = async () => {
        const newTodo = { title: todo }
        await axios.post(`http://localhost:3000/todo/new/`, newTodo)
            .then(response => {
                SetTodo("")
                fetchData()
            })
            .catch(error => {
                console.log(error)
            })
    }

    const editTodo = async (id) => {
        const newTodo = { title: todoTextEditing }
        await axios.patch(`http://localhost:3000/todo/${id}`, newTodo)
            .then(response => {
                SetTodoTextEditing("");
                SetTodoEditing(null);
                fetchData()
            })
            .catch(error => {
                console.log(error)
            })
    }
    const deleteTodo = async (todoId) => {
        await axios.delete(`http://localhost:3000/todo/${todoId}`)
        fetchData()
    }
    return (
        <div>

            <div className="todoapp stack-large">
                <h1>Missions</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        id="new-todo-input"
                        className="input input__lg"
                        label="Todo" name="todo"
                        type="text" onChange={(e) => SetTodo(e.target.value)}
                        value={todo}
                    />
                    <button on type="submit" className="btn btn__primary btn__lg">
                        Add
                    </button>
                </form>
                {todos.map((todo) => {
                    return (
                        <li key={todo._id} className="todo stack-small">
                            <div className="btn-group">
                                {todoEditing === todo._id ? (
                                    <input
                                        type="text"
                                        onChange={(e) => SetTodoTextEditing(e.target.value)}
                                        value={todoTextEditing}
                                    />
                                ) :
                                    (
                                        <div>
                                            <label className="todo-label" >{todo.title}</label>
                                        </div>
                                    )}

                                {todoEditing === todo._id ? (
                                    <button onClick={() => editTodo(todo._id)} type="submit" className="btn">
                                        Submit <span className="visually-hidden"></span>
                                    </button>
                                ) : (
                                    <button onClick={() => SetTodoEditing(todo._id)} type="button" className="btn">
                                        Edit <span className="visually-hidden"></span>
                                    </button>
                                )}

                                <button onClick={() => deleteTodo(todo._id)} type="submit" className="btn btn__danger">
                                    Delete <span className="visually-hidden"></span>
                                </button>
                            </div>
                        </li>
                    )
                })}
            </div>
        </div>
    )
}

export default TodosComp
