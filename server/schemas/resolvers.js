const { AuthenticationError } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");

const { User, Device, History } = require("../models");
const { signToken } = require("../utils/auth");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    users: async (parent, args, context) => {
      //if (context.user) {
      return User.find();
      //  }
      //  throw new AuthenticationError("You need to be logged in!");
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("devices");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    device: async (parent, args, context) => {
      if (context.user) {
        return Device.findById(args.deviceId).populate("history");
        // TODO args.deviceId
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    firstDevice: async (parent, args, context) => {
      if (context.user) {
        return Device.findOne().sort({ _id: -1 }).populate("history");
        // TODO args.deviceId
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    // Add a third argument to the resolver to access data in our `context`
    addDevice: async (parent, args, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        const device = new Device(args);
        await device.save();

        const loggedUser = await User.findByIdAndUpdate(context.user._id, {
          $push: {
            devices: device._id,
          },
        });

        return device;
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },
    addHistory: async (parent, { deviceId, name, value }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        const history = new History({
          name,
          value,
          timestamp: this.Date.now(),
        });
        await history.save();

        const loggedUser = await Device.findByIdAndUpdate(deviceId, {
          $push: {
            history: history._id,
          },
        });

        return history;
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
