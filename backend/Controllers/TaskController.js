import TaskModel from "../Models/TaskModel.js";

const createTask = async (req, res) => {
    const data = req.body;
    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({ message: "Task is created", success: true });
    } catch (error) {
        res.status(500).json({ message: "Failed to create task", success: false });
    }
};

const fetchAllTasks = async (req, res) => {
    try {
        const data = await TaskModel.find({});
        res.status(200).json({ message: "All tasks", success: true, data });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", success: false });
    }
};

const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const obj = { $set: { ...body}}
        await TaskModel.findByIdAndUpdate(id, obj)
        res.status(200).json({ message: "Tasks Updated", success: true, });
    } catch (error) {
        res.status(500).json({ message: "Failed to Update tasks", success: false });
    }
};

const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        await TaskModel.findByIdAndDelete(id)
        res.status(200).json({ message: "Task Deleted", success: true });
    } catch (error) {
        res.status(500).json({ message: "Failed to Delete tasks", success: false });
    }
};

export { createTask, fetchAllTasks, updateTaskById, deleteTaskById};
