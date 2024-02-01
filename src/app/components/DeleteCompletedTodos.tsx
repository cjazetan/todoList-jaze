import React, { useState } from 'react'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface DeleteCompletedTodosProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const DeleteCompletedTodos: React.FC<DeleteCompletedTodosProps> = ({ todos, setTodos }) => {

    const [showModal, setShowModal] = useState(false);

    const deleteCompleted = () => {
        const filteredTodos = todos.filter(todo => !todo.completed); //sets all todos to only the ones that are not in a completed state
        setTodos(filteredTodos);//sets the array to the filtered todos
        setShowModal(false);
    }

    const handleConfirmDelete = () => {
        setShowModal(true); // Show the modal when "Delete All Completed" is clicked
      };
    
      const handleCancelDelete = () => {
        setShowModal(false); // Close the modal when "No" is clicked
      };


  return (
    <>
        <button className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick = {handleConfirmDelete}>Delete All Completed</button>

        {showModal && (
          <div className="flex justify-center items-center">
            <div className='text-center'>
              <h2 className = 'font-bold'>Confirm Deletion</h2>
              <p>Are you sure you want to delete all completed tasks?</p>
              <button className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded mr-3' onClick={deleteCompleted}>Yes</button>
              <button className = 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded' onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        )}
    </>
  )
}

export default DeleteCompletedTodos;