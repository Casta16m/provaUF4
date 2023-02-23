const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getOneTask = (taskId) => {
    try {
        const task = DB.tasks.find((task) => task.id === taskId);

        if (!task) {
            throw {
                status: 400,
                message: `Can't find task with the id '${taskId}'`,
            };
        }

        return task;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createNewTask = (newTask) => {
    try {
        const isAlreadyAdded =
            DB.tasks.findIndex((task) => task.name === newTask.name) > -1;

        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Task with the name '${newTask.name}' already exists`,
            };
        }

        DB.tasks.push(newTask);
        saveToDatabase(DB);

        return newTask;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const updateOneTask = (taskId, changes) => {
    try {
        const isAlreadyAdded =
            DB.tasks.findIndex((task) => task.name === changes.name) > -1;

        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Task with the name '${changes.name}' already exists`,
            };
        }

        const task = getOneTask(taskId);

        const updatedTask = {
            ...task,
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        };

        const taskIndex = DB.tasks.findIndex((task) => task.id === taskId);

        DB.tasks[taskIndex] = updatedTask;
        saveToDatabase(DB);

        return updatedTask;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const deleteOneTask = (taskId) => {
    try {
        const indexForDeletion = DB.tasks.findIndex(
            (task) => task.id === taskId
        );

        if (indexForDeletion === -1) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }

        DB.tasks.splice(indexForDeletion, 1);
        saveToDatabase(DB);

    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

module.exports = {
    getOneTask,
    createNewTask,
    updateOneTask,
    deleteOneTask,
};