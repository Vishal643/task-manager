const validateTask = (task) => {
	if (!task) {
		return { error: true, message: 'Task is required' };
	}
	if (!task.title) {
		return { error: true, message: 'Title is required' };
	}
	if (!task.description) {
		return { error: true, message: 'Description is required' };
	}
	if (typeof task.completed !== 'boolean') {
		return {
			error: true,
			message: 'Completed is required and should be a boolean',
		};
	}
	return { error: false };
};

module.exports = { validateTask };
