import { useState, useEffect } from "react";
import { TodoProvider } from "./context"; 
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (todo) => {
   setTodos((prev) => [...prev, {id: Date.now(), ...todo}])    
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  // local storage

  useEffect(() => {
   const todos = JSON.parse(localStorage.getItem("todos"))

   if (todos && todos.length > 0) {
    setTodos(todos)
   }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="min-h-screen flex items-center justify-center bg-[#172842] px-2 py-6">
        <div className="w-full max-w-lg bg-white/10 shadow-lg rounded-2xl px-4 sm:px-8 py-6 sm:py-8 text-white">
          <h1 className="text-3xl font-extrabold text-center mb-8 mt-2 tracking-tight">Manage Your Todos</h1>
          <div className="mb-6">
            <TodoForm />
          </div>
          <div className="flex flex-col gap-4">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
