import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './types.graphql';
import users from '../data/users';

const resolvers = {
  Query: {
    user: (_, args) => users.find(user => user.id === args.id),
    totalUsers: () => users.length,
    allUsers: () => users,
  },
  Mutation: {
    updateUserCity(_, { userID, city }) {
      const result = users.find(user => user.id == userID);
      if (!result) {
        throw new Error(`Couldn't find user with id ${userID}`);
      }
      result.city = city;
      return result;
    },
  },
}

export default makeExecutableSchema({ typeDefs, resolvers });
