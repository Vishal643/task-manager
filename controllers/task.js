const tasks = require('../data/task.json');
const { validateTask } = require('../utils/validateTask');
const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '..', 'data');
const filePath = path.join(dirPath, 'task.json');

// Ensure the directory exists
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath, { recursive: true });
}

const getAllTasks = async (req, res) => {
	const { completed, sortByDate } = req.query;

	if (tasks.length === 0) {
		return res.status(404).send({ message: 'No tasks found', error: true });
	}

	let filteredTasks = [...tasks];
	if (completed) {
		let status = completed === 'true' ? true : false;
		filteredTasks = filteredTasks.filter((task) => task.completed === status);
	}

	if (sortByDate) {
		if (sortByDate === 'asc') {
			filteredTasks = filteredTasks.sort(
				(a, b) => new Date(a.createdAt) - new Date(b.createdAt),
			);
		} else if (sortByDate === 'desc') {
			filteredTasks = filteredTasks.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
			);
		}
	}
	res.status(200).json(filteredTasks);
};

const getAllWithPriority = async (req, res) => {
	const { level } = req.params;

	if (tasks.length === 0) {
		return res.status(404).send({ message: 'No tasks found', error: true });
	}

	const filteredTasks = tasks.filter((task) => task.priority === level);

	res.status(200).json(filteredTasks);
};

const getTaskById = async (req, res) => {
	const { id } = req.params;
	const task = tasks.find((task) => task.id === parseInt(id));
	if (!task) {
		return res
			.status(404)
			.send({ message: `Task with id : ${id} not found`, error: true });
	}
	res.status(200).json(task);
};

const createTask = async (req, res) => {
	const data = req.body;

	// validate data
	const { error, message } = validateTask(data);
	if (error) {
		return res.status(400).send({
			message,
			error,
		});
	}

	if (data.hasOwnProperty('id')) {
		delete data.id;
	}

	const newTask = {
		id: tasks.length + 1,
		...data,
		createdAt: new Date().toISOString(),
		priority: data.priority ? data.priority : 'low',
	};
	const newTasks = [...tasks, newTask];

	// write to file
	fs.writeFileSync(filePath, JSON.stringify(newTasks, null, 2), {
		encoding: 'utf8',
	});

	res.status(201).json(newTask);
};

const updateTask = async (req, res) => {
	const data = req.body;
	const { id } = req.params;

	const taskToBeUpdated = tasks.find((task) => task.id === parseInt(id));

	if (!taskToBeUpdated) {
		return res
			.status(404)
			.send({ message: `Task with id : ${id} not found`, error: true });
	}

	const { error, message } = validateTask(data);

	if (error) {
		return res.status(400).send({
			message,
			error,
		});
	}

	const newTask = {
		id: taskToBeUpdated.id,
		...data,
	};

	const updatedTasks = tasks.map((task) => {
		if (task.id === parseInt(id)) {
			return { ...task, ...newTask };
		}
		return task;
	});

	// write to file
	fs.writeFileSync(filePath, JSON.stringify(updatedTasks, null, 2), {
		encoding: 'utf8',
	});

	res.status(200).json(updatedTasks);
};

const deleteTask = async (req, res) => {
	const { id } = req.params;

	const task = tasks.find((task) => task.id === parseInt(id));

	if (!task) {
		return res
			.status(404)
			.send({ message: `Task with id : ${id} not found`, error: true });
	}

	const updatedTasks = tasks.filter((task) => task.id !== parseInt(id));

	// write to file
	fs.writeFileSync(filePath, JSON.stringify(updatedTasks, null, 2), {
		encoding: 'utf8',
	});

	res.status(200).json(task);
};

module.exports = {
	getAllTasks,
	getAllWithPriority,
	getTaskById,
	createTask,
	updateTask,
	deleteTask,
};
