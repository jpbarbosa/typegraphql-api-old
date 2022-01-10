import { Context } from 'apollo-server-core';
import { graphql, GraphQLSchema } from 'graphql';

export const gql = String.raw;

interface Options {
  source: string;
  variableValues?: {
    [key: string]: any;
  };
  contextValue?: any;
}

export const gCall =
  (schema: GraphQLSchema, contextValue?: Context) =>
  async ({ source, variableValues }: Options) => {
    const result = await graphql({
      schema,
      source,
      variableValues,
      contextValue,
    });
    if (result.errors) {
      console.error(result.errors);
    }
    return result;
  };
