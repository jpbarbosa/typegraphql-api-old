import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import { ArticleResolver } from '../resolvers/ArticleResolver';

export const createSchema = () => {
  return buildSchema({
    resolvers: [ArticleResolver],
    container: Container,
  });
};
