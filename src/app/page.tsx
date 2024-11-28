"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTodo from "./components/AddTodo";
import TasksList from "./components/TasksList";
import TODOS_DATA from "./components/ToDoData";
import DeleteCompletedTodos from "./components/DeleteCompletedTodos";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const ToDoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addTodo = (text: string) => {
    axios
      .post("http://localhost:5000/todos", { text, completed: false })
      .then((response) => setTodos([...todos, response.data]))
      .catch((error) => console.error("Failed to add Todo:", error));
  };
  //finished fetch and add todo. edit and delete to be continued.

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <div className="w-128 bg-white">
          <div className=" m-4">
            <AddTodo addTodo={addTodo} />
            <DeleteCompletedTodos todos={todos} setTodos={setTodos} />
          </div>
          <div className="m-12">
            <TasksList todos={todos} setTodos={setTodos} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoApp;
