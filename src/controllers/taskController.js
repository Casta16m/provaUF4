const taskService = require('../services/taskService');

const getOneTask = (req, res) => {
    const { taskId } = req.params;
    try {
        const task = taskService.getOneTask(taskId);
        res.send({ status: 'OK', data: task });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
};

const createNewTask = (req, res) => {
    const { body } = req;

    if (!body.user || !body.title || !body.description || !body.status) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error:
                    "One of the following keys is missing or is empty in request body: 'user', 'title', 'description', 'status'.",
            },
        });
    }

    const newTask = {
        user: body.user,
        title: body.title,
        description: body.description,
        status: body.status,
    };

    try {
        const createdTask = taskService.createNewTask(newTask);
        res.send({ status: 'OK', data: createdTask });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
}

const updateTask = (req, res) => {
    const {
        body,
        params: { taskId },
    } = req;

    if (!body.taskId || !body.user || !body.title || !body.description || !body.status) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error:
                    "One of the following keys is missing or is empty in request body: 'user', 'title', 'description', 'status'.",
            },
        });
    }

    try {
        const updatedTask = taskService.updateTask(taskId, body);
        res.send({ status: 'OK', data: updatedTask });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
};

const deleteTask = (req, res) => {
    const {
        params: taskId
    } = req;

    if (!taskId) {
        res.status(400).send({
            status: 'FAILED',
            data: { error: "Parameter ':taskId' can not be empty" },
        });
    }

    try {
        taskService.deleteTask(taskId);
        res.send({ status: 'OK', data: deletedTask });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
};

module.exports = {
    getOneTask,
    createNewTask,
    updateTask,
    deleteTask,
};