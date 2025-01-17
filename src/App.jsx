import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"


function App() {
  

const [todos, setTodos] = useState([])
const [todoValue, setTodoValue] = useState('')

function persistData(newList) {
  localStorage.setItem('todos', JSON.stringify({
    todos: newList
  }))
}

function handleAddTodos(newTodo) {
  const newTodosList = [...todos, newTodo]
  persistData(newTodosList)
  setTodos(newTodosList)
}

function handleDeleteTodo(index){
  const newTodooList = todos.filter((todo, todoIndex)=> {
    return todoIndex !== index
  })
  persistData(newTodosList)
  setTodos(newTodooList)
}

function handleEditTodo(index){
  const valueToBeEdited = todos[index]
  setTodoValue(valueToBeEdited)
  handleDeleteTodo(index)
}

useEffect(()=>{
  if(!localStorage){
    return
  }

  let localTodos = localStorage.getItem('todos')
  if(!localTodos){
    return
  }

  localTodos = JSON.parse(localTodos).todos
  setTodos(localTodos)
}, [])

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos= {handleAddTodos}  />
      <TodoList handleDeleteTodo={handleDeleteTodo} todos = {todos} handleEditTodo= {handleEditTodo} />
    </>
  )
}

export default App
