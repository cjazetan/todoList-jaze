import React, { useState } from "react";

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



  const handleCheckbox = (id: number) =>{
    const updatedTodos = todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo
      );
    
      setTodos(updatedTodos);
  };

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id); // updates the todo list to not include whichever the id of the task to be deleted
    setTodos(updatedTodos);
  };

  const handleEdit = (id : number, text: string) => {
    setEditableTaskId(id);
    setEditedTaskText(text); //updates the current task id and text of the state to whatever is being edited
  };

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTaskText(event.target.value);
  };

  const handleEditSubmit = (id: number) => {
    if (!editedTaskText.trim()) {
      alert("Cannot be Empty");
      return;
    }
  
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: editedTaskText } : todo
    );
  
    setTodos(updatedTodos);
    setEditableTaskId(null);

  };


 
  return (
    <>
      <ul>
        {todos.map(({id, text, completed}) => (
          <li className="flex items-center justify-between py-2" key={id}>
            <div className="flex items-center">
            <input type="checkbox" checked={completed} onChange={() => handleCheckbox(id)} />
            {editableTaskId === id ? (
              <>
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={handleEditInputChange}
                  onBlur={() => handleEditSubmit(id)}
                  autoFocus
                />
              </>
            ) : (
              <span className="mr-20">{text}</span>
            )}
            </div>
            <div>
              <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4' onClick={() => handleDelete(id)}>Delete</button>
              <button className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4' onClick={() => handleEdit(id, text)}>
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
