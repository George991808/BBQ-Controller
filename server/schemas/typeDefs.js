const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type History {
    _id: ID
    name: String
    value: Float!
    timestamp: Date!
  }

  type Device {
    _id: ID
    name: String
    history: [History]!
    setPoint: Float
    output: Float
    controlMode: String
    gain: Float
    integral: Float
    derivative: Float
  }

  type User {
    _id: ID
    name: String
    email: String
    password: String
    devices: [Device]!
  }

  type Auth {
    token: ID!
    profile: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
    device(deviceId: ID!): Device
    firstDevice: Device
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    addDevice(
      name: String!
      setPoint: Float!
      output: Float!
      controlMode: String!
      gain: Float!
      integral: Float!
      derivative: Float!
    ): Device

    addHistory(deviceId: ID!, name: String!, value: Float!): History
  }
`;

module.exports = typeDefs;
