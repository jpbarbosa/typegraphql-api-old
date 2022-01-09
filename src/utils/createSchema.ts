import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ArticleResolver } from '../resolvers/ArticleResolver';

export const createSchema = () => {
  return buildSchema({
    resolvers: [ArticleResolver],
  });
};
