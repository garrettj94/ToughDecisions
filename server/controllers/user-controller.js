const { User } = require('../models')
const { signToken } = require('../utils/auth')

module.exports = {
    async getUser({ user = null, params }, res) {
        const findUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!findUser) {
            return res.status(400).json({ message: 'Did not find user with this id. Try again' });
        }

        res.json(findUser)
    },

    async createUser({ body }, res) {
        const user = await User.create(body);

        if(!user) {
            return res.status(400).json({ message: 'Something went wrong when trying to create a user. Try again' });
        }
        const token = signToken(user);
        res.json({ token, user });
    },

    async login({ body }, res) {
        const user = await User.findOne({ $or: [{ username: body.username}, { email: body.email }] });
        if(!user) {
            return res.status(400).json({ message: 'Could not find user with those credentials. Try again' });
        }
        const loginPassword = await user.isCorrectPassword(body.password);

        if (!loginPassword) {
            return res.status(400).json({ message: 'Incorrect password. Try again' });
        }
        const token = signToken(user);
        res.json({ token, user });
    },
};