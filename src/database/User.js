const DB = require("./db.json");
const { saveToDatabase } = require("./utils");


const getAllUsers = (filterParams) => {
    try {
        let users = DB.users;
        if (filterParams.name) {
            return DB.users.filter((user) =>
                user.name.toLowerCase().includes(filterParams.name)
            );
        }
        return users;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const createNewUser = (newUser) => {
    try {
        const isAlreadyAdded =
            DB.users.findIndex((user) => user.username === newUser.name) > -1;

        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `User with the name '${newUser.name}' already exists`,
            };
        }

        DB.users.push(newUser);
        saveToDatabase(DB);

        return newUser;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

module.exports = { getAllUsers, createNewUser };