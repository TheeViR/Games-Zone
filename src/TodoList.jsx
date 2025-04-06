import React, { useState } from 'react'

function TodoList() {
    
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState("");
    const [error, setError] = useState("");
    
    const addTask = () => {
        if(taskInput.trim() === "") return;
        const newTask = {id: Date.now(), text: taskInput, isCompleted:false};
        setTasks([...tasks, newTask]);
        setTaskInput("");
        
    };

    const toggleTask = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? {...task, isCompleted: !task.isCompleted} :task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const editTask = (taskId, text) => {
        setEditingTaskId(taskId);
        setEditingTaskText(text);
    };

    const saveTask = (taskId)=>{
        if(editingTaskText.trim() === ""){
            setError("Task cannot be empty");
            return;
        };
        setError("");
        setTasks(tasks.map(task => 
            task.id === taskId ? {...task, text: editingTaskText.trim()} : task
        ));
        setEditingTaskId(null);
        setEditingTaskText("");
    };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-4'>
        <h1 className='text-2xl font-bold mb-4'>To-Do List</h1>
        <div className='flex gap-10 mb-4'>
            <input 
            type="text" 
            onChange={(e)=> setTaskInput(e.target.value)}
            value={taskInput}
            placeholder='Enter a task...'
            className='p-2 border border-gray-500 rounded text-green-600'
            />
            <button
            onClick={addTask}
            className='bg-blue-500 px-4 py-2 rounded hover:bg-blue-300'>Add</button>
        </div>
        <ul className='w-full max-w-md'>
            {tasks.map(task => (
                <li key={task.id}
                className='flex justify-between items-center bg-gray-600 p-2 my-2 rounded'
                >
                    {editingTaskId === task.id ? (
                        <>
                        <input type="text"
                        value={editingTaskText}
                        onChange={(e)=> setEditingTaskText(e.target.value)}
                        className='p-1 border border-gray-400 rounded text-white' 
                        />
                        {error && <p className='mx-4 text-red-500'>{error}</p>}
                        </>
                    ) : (
                        <span 
                        onClick={()=> toggleTask(task.id)}
                        className={`cursor-pointer ${task.isCompleted ? "line-through text-gray-400" : ""}`}>
                            {task.text} 
                    </span>
                    )}
                    <div className='flex gap-2'>
                        {editingTaskId === task.id ? (
                            <button onClick={()=> saveTask(task.id)} className='bg-green-500 px-2 py-1 rounded hover:bg-green-300'>Save</button>
                        ) : (
                            <button onClick={()=> editTask(task.id, task.text)} className='bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-300'>Edit</button>
                        )}
                         <button onClick={()=> deleteTask(task.id)} className='bg-red-500 px-2 py-1 rounded hover:bg-red-300'>Delete</button>
                    </div>
                    
                </li>
            ))}
        </ul>
        
    </div>
  )
}

export default TodoList