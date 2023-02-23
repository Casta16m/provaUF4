const { v4: uuid } = require("uuid");
const User = require("../database/Tasks");

const getOneTask = (taskId) => {
    try {
        const task = Task.getOneTask(taskId);
        return task;
    } catch (error) {
        throw error;
    }
};

const createNewTask = (newTask) => {
    const taskToInsert = {
        ...newTask,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    try {
        const createdTask = Task.createNewTask(taskToInsert);
        return createdTask;
    } catch (error) {
        throw error;
    }
};

const updateOneTask = (taskId, changes) => {
    try {
        const updatedTask = Task.updateOneTask(taskId, changes);
        return updatedTask;
    } catch (error) {
        throw error;
    }
};

const deleteOneTask = (taskId) => {
    try {
        Task.deleteOneTask(taskId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getOneTask,
    createNewTask,
    updateOneTask,
    deleteOneTask,
};