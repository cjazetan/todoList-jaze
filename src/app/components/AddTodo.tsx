import React, { useState } from 'react'

interface AddTodoProps {
  addTodo: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    //Checks if input is either empty or full of white spaces
    if (!inputValue.trim()){
      alert('Please enter a task.');
      return;
    }
    //If not empty, it adds the input to the To Do list, then resets the field to be empty again
    addTodo(inputValue);
    setInputValue('');
  }




  return (
    <>
      <input className="border-solid border-2 border-gray-600 w-[260px]" type="text" placeholder = "Add To Do" value = {inputValue} onChange = {handleInputChange}/>
      <button className = 'mx-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick = {handleAddTodo}>Create Task</button>
    </>
  )
}

export default AddTodo;