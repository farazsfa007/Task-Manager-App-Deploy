import {createTask, fetchAllTasks, updateTaskById, deleteTaskById} from "../Controllers/TaskController.js"
import express from "express"

const router = express.Router()

// to get all task
router.get('/',fetchAllTasks)

//to create a task Post Method
router.post('/',createTask)

// to Update task
router.put('/:id',updateTaskById)

// to delete task
router.delete('/:id',deleteTaskById)

export default router