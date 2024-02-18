import { ApolloServer } from "@apollo/server";
import { typeDefs, resolvers } from "../graphql/gql_file";

async function createApolloServer()
{
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  return server;
}

export default createApolloServer;