import { config as configDotenv } from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { createConnection, useContainer } from 'typeorm';
import { createSchema } from './utils/createSchema';
import Container from 'typedi';
import { seed } from './utils/seed';

configDotenv();

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

useContainer(Container);

const main = async () => {
  await createConnection();

  await seed();

  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
  });

  server.listen(port, () => {
    console.log(`Server has started on port ${port}`);
  });
};

main();
