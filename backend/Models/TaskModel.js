import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
        },
        isDone: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
)

const TaskModel = mongoose.model("todos", TaskSchema);

export default TaskModel;