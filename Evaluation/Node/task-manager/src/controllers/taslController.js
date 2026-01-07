const task = require('../models/Task');
const {
    validateTaskStatus,
    validatePriority,
    validateDate,
    sanitizeInput
} = require('../validators/validators');

const getAllTasks = async (req, res) => {
    try 
    {
        const {status, priority, sortBy} = req.query;
        const filter = {};
        const sort = {};
        if(status && validateTaskStatus(status)){
            filter.status = status;
        }
        if(priority && validatePriority(priority)){
            filter.priority = priority;
        }
        if(sortBy){
            const validatedSortFields = ['dueDate', 'createdAt', 'priority'];
            if(validatedSortFields.includes(sortBy)){
                sort[sortBy] = 1;
            }
        }
        else {
            sort.createdAt = -1;
        }
        const tasks = await task.find(filter).sort(sort);
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    }
    catch (error)
    {
        console.error("Get all tasks error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const getTaskById = async (req, res) => {
    try
    {
        const { id } = req.params;
        const task = await task.findById(id);
        if(!task){
            return res.status(404).json({
                success: false,
                message: "Task not found",
                error: "Invalid task ID"
            })
        }
        res.status(200).json({
            success: true,
            data: task
        })
    }
    catch (error)
    {
        console.error("Get task by ID error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const createTask = async (req, res) => {
    try
    {
        const { title, description, status, priority, dueDate, tags } = req.body;
        if(!title){
            return res.status(400).json({
                success: false,
                message: "Title is required",
                error: "Missing required field: title"
            })
        }
        const taskData = {
            title: sanitizeInput(title),
            description: description ? sanitizeInput(description) : undefined,
        };
        if(status && validateTaskStatus(status)){
            taskData.status = status;
        }
        if(priority && validatePriority(priority)){
            taskData.priority = priority;
        }
        if(dueDate && validateDate(dueDate)){
            taskData.dueDate = new Date(dueDate);
        }
        if(Array.isArray(tags)){
            taskData.tags = tags.map(tag => sanitizeInput(tag));
        }

        const task = new task(taskData);
        await task.save();
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        })
    }
    catch (error)
    {
        console.error("Create task error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const updateTask = async (req, res) => {
    try
    {
        const { id } = req.params;
        const { title, description, status, priority, dueDate, tags } = req.body;
        const task = await task.findById(id);
        if(!task){
            return res.status(404).json({
                success: false,
                message: "Task not found",
                error: "Invalid task ID"
            })
        }
        if(title !== undefined){
            task.title = sanitizeInput(title);

        }
        if(description !== undefined){
            task.description = sanitizeInput(description);
        }
        if(status !== undefined){
            if(!validateTaskStatus(status)){
                return res.status(400).json({
                    success: false,
                    message: "Invalid task status",
                    error: "Invalid task status"
                })
            }
            task.status = status;
        }
        if(priority !== undefined){
            if(!validatePriority(priority)){
                return res.status(400).json({
                    success: false,
                    message: "Invalid priority value",
                    error: "Invalid priority value"
                })
            }
            task.priority = priority;
        }
        if(dueDate !== undefined){
            if(!validateDate(dueDate)){
                return res.status(400).json({
                    success: false,
                    message: "Invalid date format",
                    error: "Invalid date format"
                })
            }
            task.dueDate = new Date(dueDate);
        }
        if(tags !== undefined){
            if(!Array.isArray(tags)){
                return res.status(400).json({
                    success: false,
                    message: "Tags must be an array",
                    error: "Malformed request body"
                })
            }
            task.tags = tags.map(tag => sanitizeInput(tag));
        }
        await task.save();
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        })
    }
    catch (error)
    {
        console.error("Update task error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await task.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json({
                success: false,
                message: "Task not found",
                error: "Invalid task ID"
            })
        }
        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })
    }
    catch (error) {
        console.error("Delete task error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}