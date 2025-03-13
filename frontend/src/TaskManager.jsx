import React, {useEffect, useState} from 'react'
import {FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash} from 'react-icons/fa'
import {ToastContainer} from 'react-toastify'
import { CreateTask, DeleteTasksById, GetAllTasks, UpdateTasksById } from './api'
import { notify } from './utils'

// editTask feature 

function TaskManager() {
    const [input,setInput] = useState('')
    const [tasks,setTasks] = useState([])
    const [copyTasks,setCopyTasks] = useState([])
    const [updateTasks,setUpdateTask] = useState(null)

    const handleTask = ()=> {
        if(updateTasks && input){
            //update api call
            console.log('update api call')
            const obj = {
                taskName:input,
                isDone: updateTasks.isDone,
                _id: updateTasks._id
            }
            handleUpdateTask(obj)
        }else if(updateTasks === null && input) {
            // create api call
            console.log('create api call')
            handleAddTask()
            
        }
        setInput('')
    }

    useEffect(()=> {
        if(updateTasks){
            setInput(updateTasks.taskName)
        }
    },[updateTasks])

    const handleAddTask = async () => {
        const obj = {
            'taskName':input,
            'isDone': false,
        }
        try {
            const {success,message} = await CreateTask(obj);
            if(success){
                notify(message,"success")
            }else{
                notify(message,"Error")
            }
            setInput('')
            fetchAllTasks()
        } catch (error) {
            console.error(error)
            notify("Failed to create Task","Error")

        }
    }

    const fetchAllTasks = async () => {
        try {
            const {data} = await GetAllTasks();
            console.log(data)
            setTasks(data)
            setCopyTasks(data)
        } catch (error) {
            console.error(error)
            notify("Failed to Add Task","Error")
        }
    }

    useEffect(()=> {
        fetchAllTasks()
    },[])

    const onClickDeleteTask = async (id) => {
        try {
            const {success, message} = await DeleteTasksById(id);
            if(success){
                notify(message,"success")
            }else{
                notify(message,"Error")
            }
            fetchAllTasks()
        } catch (error) {
            console.error(error)
            notify("Failed to Delete Task","Error")
        }

    }

    const handleCheckUnCheck = async (eachTasks) => {
        const {_id, isDone, taskName} = eachTasks
        const obj = {
            taskName,
            isDone: !isDone
        }
        try {
            const {success, message} = await UpdateTasksById(_id, obj);
            if(success){
                notify(message,"success")
            }else{
                notify(message,"Error")
            }
            fetchAllTasks()
        } catch (error) {
            console.error(error)
            notify("Failed to Update Task","Error")
        }

    }

    const handleUpdateTask  = async (eachTasks) => {
        const {_id, isDone, taskName} = eachTasks
        const obj = {
            taskName,
            isDone: isDone
        }
        try {
            const {success, message} = await UpdateTasksById(_id, obj);
            if(success){
                notify(message,"success")
            }else{
                notify(message,"Error")
            }
            fetchAllTasks()
        } catch (error) {
            console.error(error)
            notify("Failed to Update Task","Error")
        }
    }

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase()
        const oldTask = [...copyTasks];
        const results = oldTask.filter((eachItem)=> eachItem.taskName.toLowerCase().includes(term))
        setTasks(results);
    }

    return (
        <div className='d-flex flex-column align-items-center w-50 m-auto mt-5'>
            <h1 className='mb-4'>Task Manager</h1>
            <div className='d-flex justify-content-between align-items-center mb-4 w-100'>
            <div className='input-group flex-grow-1 me-1'>
                <input 
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    type="text" 
                    className='form-control me-1'
                    placeholder='Add Task'
                />
                <button
                    onClick={handleTask}
                    className='btn btn-primary btn-sm me-3'
                    type='button'>
                    <FaPlus className='m-2' />
                </button>
            </div>

            <div className='input-group flex-grow-1'>
                <span className='input-group-text'>
                    <FaSearch />
                </span>
                <input 
                    onChange={handleSearch}
                    type="text"
                    className='form-control me-1'
                    placeholder='Search Task'
                />
            </div>
            </div>

            {/* list of item */}

            <div className='d-flex flex-column w-100'>
                {
                    tasks.map((eachTasks)=> (
                        <div key={eachTasks._id} className='m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align item-center'>
                            <span className={eachTasks.isDone ? 'text-decoration-line-through': ''}>
                                {eachTasks.taskName}
                            </span>
                            <div>
                                <button 
                                    onClick={() => handleCheckUnCheck(eachTasks)}
                                    className='btn btn-success btn-sm me-2'
                                    type='button'>
                                    <FaCheck className='' />
                                </button>
                                <button
                                    onClick={()=> setUpdateTask(eachTasks)}
                                    className='btn btn-secondary btn-sm me-2'
                                    type='button'>
                                    <FaPencilAlt />
                                </button>
                                <button
                                    onClick={() => onClickDeleteTask(eachTasks._id)}
                                    className='btn btn-danger btn-sm me-2'
                                    type='button'>
                                    <FaTrash className='' />
                                </button>
                            </div>
                            </div>
                                ))
                }
            </div>

            {/* toastify */}
            <ToastContainer 
                position='top-right' 
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    )
}

export default TaskManager