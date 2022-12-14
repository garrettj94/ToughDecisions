const { AuthenticationError } = require('apollo-server-express');
const { Question, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.
                    findOne({ _id: context.user._id })
                    .select('-__V -password')
                return userData
            }
            throw new AuthenticationError('Error')
        },
    },

    Mutation: {
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new AuthenticationError('Incorrect login information, please try again')
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },
        createQuestion: async (parent, args, context) => {
            if (context.user) {
                return await Question.create(req.body).then((question) => {
                User.findOneAndUpdate({_id: context.user._id}, {$push: { classes: question }}, { new: true })
            });
        }
        throw new AuthenticationError('You must be logged in to create a question. Please log in')
        },
    //     deleteQuestion: async (parent, args, context) => {
            
    //     }
    }
}

module.exports = resolvers