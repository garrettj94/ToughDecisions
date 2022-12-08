// const { Book, User, User, User } = require('../models');

// const resolvers = {
//   Query: {
//     User: async () => {
//       return User.find({});
//     },
//     Book: async (parent, { _id }) => {
//       const params = _id ? { _id } : {};
//       return Book.find(params);
//     },
//   },
//   Mutation: {
//     createUser: async (parent, args) => {
//       const User = await User.create(args);
//       return User;
//     },
//     createBook: async (parent, { _id, techNum }) => {
//       const Book = await Book.findOneAndUpdate(
//         { _id },
//         // { $inc: { [`tech${techNum}_votes`]: 1 } },
//         { new: true }
//       );
//       return ;
//     },
//   },
// };

// module.exports = resolvers;
