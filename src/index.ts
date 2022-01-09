import { ApolloServer } from 'apollo-server';
import { createSchema } from './utils/createSchema';

const port = 4000;

const main = async () => {
  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
  });

  server.listen(port, () => {
    console.log(`Server has started on port ${port}`);
  });
};

main();
