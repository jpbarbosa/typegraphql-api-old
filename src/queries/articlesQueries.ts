import { gql } from '../test-utils/gCall';

export const articlesQueries = {
  CREATE: gql`
    mutation ($data: ArticleInput!) {
      createArticle(data: $data) {
        id
        title
        text
        authorId
      }
    }
  `,
  GET: gql`
    query ($id: ID!) {
      article(id: $id) {
        id
        title
        text
        authorId
      }
    }
  `,
  GET_ALL: gql`
    query {
      articles {
        id
      }
    }
  `,
  UPDATE: gql`
    mutation ($id: ID!, $data: ArticleInput!) {
      updateArticle(id: $id, data: $data) {
        id
        title
        text
        authorId
      }
    }
  `,
  REMOVE: gql`
    mutation ($id: ID!) {
      removeArticle(id: $id)
    }
  `,
};
