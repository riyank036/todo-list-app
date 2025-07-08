import React, { useState } from 'react'
import {useTodo}  from '../context/TodoContext'

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
      e.preventDefault()

      if (!todo) return

      addTodo({ todo, completed: false})
      setTodo("")
    }
    
    return (
        <form onSubmit={add} className="flex flex-col sm:flex-row gap-3 sm:gap-0">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full rounded-lg sm:rounded-l-lg sm:rounded-r-none px-4 py-2 text-base bg-white/80 text-black border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="mt-0 sm:mt-0 sm:ml-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-base transition">
                Add
            </button>
        </form>
    );
}

export default TodoForm;


