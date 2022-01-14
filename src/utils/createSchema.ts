import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import { ArticleResolver } from '../resolvers/ArticleResolver';
import { AuthorResolver } from '../resolvers/AuthorResolver';

export const createSchema = () => {
  return buildSchema({
    resolvers: [ArticleResolver, AuthorResolver],
    container: Container,
  });
};
