import UserServices from "../services/user.services";

export const typeDefs = `#graphql
  type User{
    id: ID!
    name: String!
    email: String!
    userStream: Stream!
    streamId: ID!
  }

  type Stream{
    id: ID!
    name: String!
    users: [User!],
    courses: [Course!]
  }

  type Course{
    id: ID!
    name: String!
    courseStream: Stream!
    streamId: ID!
  }

  type Query{
    users: [User!]
    user(id: ID!): User
    streams: [Stream!]
    stream(id: ID!): Stream
    courses: [Course!]
    course(id: ID!): Course
  }

  type Mutation{
    createUser(name: String!, email: String!, streamId: ID!): User!
    createStream(name: String!): Stream!
    createCourse(name: String!, streamId: ID!): Course!
  }
`;

export const resolvers = {
  Query: {
    users: async () =>
    {
      return await UserServices.getUsers();
    },
    user: async (_: any, { id }: { id: string }) =>
    {
      return await UserServices.getUsersById(id);
    },
    streams: async () =>
    {
      return await UserServices.getStreams();
    },
    stream: async (_: any, { id }: { id: string }) =>
    {
      return await UserServices.getStreamsById(id);
    },
    courses: async () =>
    {
      return await UserServices.getCourses();
    },
  },

  Mutation: {
    createUser: async (_: any, { name, email, streamId }: { name: string, email: string, streamId: string }) =>
    {
      return await UserServices.createUser({ name, email, streamId });
    },
    createStream: async (_: any, { name }: { name: string }) =>
    {
      return await UserServices.createStream({ name });
    },
    createCourse: async (_: any, { name, streamId }: { name: string, streamId: string }) =>
    {
      return await UserServices.createCourse({ name, streamId });
    }
  },
  User: {
    userStream: async (parent: any, _: any, { prisma }: any) =>
    {
      return await UserServices.getStreamsById(parent.streamId);
    }
  },
  Course: {
    courseStream: async (parent: any, _: any, { prisma }: any) =>
    {
      return await UserServices.getStreamsById(parent.streamId);
    }
  },
  Stream: {
    users: async (parent: any, _: any, { prisma }: any) =>
    {
      return await UserServices.getUsersByStreamId(parent.id);
    },
    courses: async (parent: any, _: any, { prisma }: any) =>
    {
      return await UserServices.getCoursesByStreamId(parent.id);
    }
  }
};