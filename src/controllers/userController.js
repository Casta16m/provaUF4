const userService = require('../services/userService');

const getAllUsers = (req, res) => {
    const { mode } = req.query;
    try {
        const allUsers = userService.getAllUsers({ mode });
        res.send({ status: 'OK', data: allUsers });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
};

const creteNewUser = (req, res) => {
    const { body } = req;

    if (!body.username || !body.fullname) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error:
                    "One of the following keys is missing or is empty in request body: 'username', 'fullname',",
            },
        });
    }

    const newUser = {
        username: body.username,
        fullname: body.fullname,
    };

    try {
        const createdUser = userService.createNewUser(newUser);
        res.send({ status: 'OK', data: createdUser });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
};

module.exports = { getAllUsers, creteNewUser };