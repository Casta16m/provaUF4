const DB = require("./db.json");
const { saveToDatabase } = require("./utils");


const getAllUsers = (filterParams) => {
    try {
        let users = DB.users;
        if (filterParams.name) {
            return DB.users.filter((users) =>
                users.name.toLowerCase().includes(filterParams.name)
            );
        }
        return users;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getOneUser = (userId) => {
    try {
        const user = DB.users.find((user) => user.id === userId);

        if (!user) {
            throw {
                status: 400,
                message: `Can't find user with the id '${userId}'`,
            };
        }

        return user;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

