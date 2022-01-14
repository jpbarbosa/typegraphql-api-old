import { graphql, GraphQLSchema } from 'graphql';
import { createSchema } from '../utils/createSchema';

export const gql = String.raw;

interface Options {
  source: string;
  variableValues?: {
    [key: string]: any;
  };
  contextValue?: any;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }

  const result = await graphql({
    schema,
    source,
    variableValues,
  });
  if (result.errors) {
    console.error(result.errors);
  }
  return result;
};
