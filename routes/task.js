const express = require('express');

const {
	getAllTasks,
	getAllWithPriority,
	getTaskById,
	createTask,
	updateTask,
	deleteTask,
} = require('../controllers/task');

const router = express.Router();

/**
 * @route GET /api/v1/tasks
 * @desc Get all tasks
 * @access Public
 */
router.get('/tasks', getAllTasks);

/**
 * @route GET /api/v1/tasks/:id
 * @desc Get a single task
 * @access Public
 */
router.get('/tasks/:id', getTaskById);

/**
 * @route GET /api/v1/tasks/priority/:level
 * @desc Get all tasks with a certain priority level
 * @access Public
 */
router.get('/tasks/priority/:level', getAllWithPriority);

/**
 * @route POST /api/v1/tasks
 * @desc Create a new task
 * @access Public
 */
router.post('/tasks', createTask);

/**
 * @route PUT /api/v1/tasks/:id
 * @desc Update a task
 * @access Public
 */
router.put('/tasks/:id', updateTask);

/**
 * @route DELETE /api/v1/tasks/:id
 * @desc Update a task
 * @access Public
 */
router.delete('/tasks/:id', deleteTask);

module.exports = router;
