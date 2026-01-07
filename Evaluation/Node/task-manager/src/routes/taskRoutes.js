const express = require('express');
const verifyApiKey = require('../middleware/verifyApiKey');
const {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

const router = express.Router();
router.use(verifyApiKey);
router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
module.exports = router;