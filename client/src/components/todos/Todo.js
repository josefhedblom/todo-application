import React, { useState } from "react";
import '../../App.css'
import axios from 'axios'

function Todo({ id, title, completed }) {
    const [todo, SetTodo] = useState('');


    const deleteTodo = (todoId) => {
        axios.delete(`http://localhost:3000/todo/${todoId}`)
    }
    return (
        <li key={id} className="todo stack-small">
            <div className="c-cb">
                <input id={id} type="checkbox" defaultChecked={completed} />
                <label className="todo-label" htmlFor={id}>{title}</label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn">
                    Edit <span className="visually-hidden"></span>
                </button>
                <button onClick={deleteTodo} type="button" className="btn btn__danger">
                    Delete <span className="visually-hidden"></span>
                </button>
            </div>
        </li>
    );
}
export default Todo