"use client";
import React, { useState } from 'react'
import AddTodo from './components/AddTodo';
import TasksList from './components/TasksList';
import TODOS_DATA from './components/ToDoData';
import DeleteCompletedTodos from './components/DeleteCompletedTodos';

const ToDoApp = () => {

  const [todos, setTodos] = useState(TODOS_DATA);

  const addTodo = (text : string) => {
    const newTodo = {
      id: todos.length + 1,
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <>
      <div className = 'flex justify-center items-center h-screen bg-slate-100'>
        <div className = 'w-128 bg-white'>
            <div className = ' m-4'>
                <AddTodo addTodo = {addTodo} />
                <DeleteCompletedTodos todos = {todos} setTodos = {setTodos} />
            </div>
            <div className="m-12">
                <TasksList todos = {todos} setTodos = {setTodos} />
            </div>
        </div>
      </div>
    </>
  );
}

export default ToDoApp;