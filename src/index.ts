import express from 'express';
import { expressMiddleware } from "@apollo/server/express4";
import createApolloServer from './apollo_server/createApolloServer';
import { config } from 'dotenv';
config();


async function main()
{
  const app = express();

  const apolloServer = await createApolloServer();

  app.use(express.json());

  app.get('/', (req, res) =>
  {
    res.send('Hello World');
  });

  app.use("/graphql", expressMiddleware(apolloServer) as any);

  app.listen(Number(process.env.PORT), () =>
  {
    console.log(`Server is running on port ${Number(process.env.PORT)}`);
  });
};

main();