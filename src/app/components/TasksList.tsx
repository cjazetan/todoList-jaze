import React, { useState, useRef } from "react";
import axios from "axios";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TasksListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TasksList: React.FC<TasksListProps> = ({ todos, setTodos }) => {
  const [editableTaskId, setEditableTaskId] = useState<number | null>(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCheckbox = async (id: number, completed: boolean) => {
    try {
      await axios.patch(`http://localhost:5000/todos/${id}`, {
        completed: !completed,
      });

      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      setTodos(updatedTodos);
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`); //deletes selected task from backend

      const updatedTodos = todos.filter((todo) => todo.id !== id); // updates the todo list to not include whichever the id of the task to be deleted
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Failed to delete selected task.", error);
    }
  };

  const handleEdit = (id: number, text: string) => {
    setEditableTaskId(id);
    setEditedTaskText(text); //updates the current task id and text of the state to whatever is being edited
  };

  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedTaskText(event.target.value);
  };

  const handleEditSubmit = async (id: number) => {
    if (!editedTaskText.trim()) {
      alert("Cannot be Empty");
      return;
    }

    try {
      await axios.patch(`http://localhost:5000/todos/${id}`, {
        text: editedTaskText,
      });

      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: editedTaskText } : todo
      );

      setTodos(updatedTodos);
      setEditableTaskId(null);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    } catch (error) {
      console.error("Failed to Edit task", error);
    }
  };

  return (
    <>
      <ul>
        {todos.map(({ id, text, completed }) => (
          <li className="flex items-center justify-between py-2" key={id}>
            <div className="flex items-center">
              <input
                className="mr-2"
                type="checkbox"
                checked={completed}
                onChange={() => handleCheckbox(id, completed)}
              />
              {editableTaskId === id ? (
                <>
                  <input
                    ref={inputRef}
                    type="text"
                    value={editedTaskText}
                    onChange={handleEditInputChange}
                    autoFocus
                  />
                </>
              ) : (
                <span className="mr-20">{text}</span>
              )}
            </div>
            <div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={() =>
                  editableTaskId === id
                    ? handleEditSubmit(id)
                    : handleEdit(id, text)
                }
              >
                {editableTaskId === id ? "Submit" : "Edit"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TasksList;
