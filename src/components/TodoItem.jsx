import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'

function TodoItem({ todo }) {

  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const {updateTodo, deleteTodo, toggleComplete} = useTodo()

  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: todoMsg})
    setIsTodoEditable(false)
  }

  const toggleCompleted = () => {
    toggleComplete(todo.id)
  }

    return (
        <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 border border-black/10 rounded-xl px-4 py-3 shadow-md bg-white/80 transition text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#e9d7f7]"
            }`}
        >
            <div className="flex items-center gap-2 w-full">
                <input
                    type="checkbox"
                    className="cursor-pointer w-5 h-5 accent-green-600"
                    checked={todo.completed}
                    onChange={toggleCompleted}
                />
                <input
                    type="text"
                    className={`border outline-none w-full bg-transparent rounded-lg px-2 py-1 text-base ${
                        isTodoEditable ? "border-black/10" : "border-transparent"
                    } ${todo.completed ? "line-through text-gray-500" : "text-black"}`}
                    value={todoMsg}
                    onChange={(e) => setTodoMsg(e.target.value)}
                    readOnly={!isTodoEditable}
                />
            </div>
            <div className="flex gap-2 shrink-0">
                {/* Edit, Save Button */}
                <button
                    className="w-9 h-9 rounded-lg text-lg border border-black/10 flex justify-center items-center bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
                    onClick={() => {
                        if (todo.completed) return;
                        if (isTodoEditable) {
                            editTodo();
                        } else setIsTodoEditable((prev) => !prev);
                    }}
                    disabled={todo.completed}
                >
                    {isTodoEditable ? "📁" : "✏️"}
                </button>
                {/* Delete Todo Button */}
                <button
                    className="w-9 h-9 rounded-lg text-lg border border-black/10 flex justify-center items-center bg-gray-100 hover:bg-red-200 transition"
                    onClick={() => deleteTodo(todo.id)}
                >
                    ❌
                </button>
            </div>
        </div>
    );
}

export default TodoItem;

