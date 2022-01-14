import { gql } from '../testUtils/gCall';

const ARTICLE_FIELDS = gql`
  fragment ArticleFields on Article {
    id
    title
    text
    authorId
  }
`;

export const articlesQueries = {
  CREATE: gql`
    ${ARTICLE_FIELDS}
    mutation ($data: ArticleInput!) {
      createArticle(data: $data) {
        ...ArticleFields
      }
    }
  `,
  GET: gql`
    ${ARTICLE_FIELDS}
    query ($id: ID!) {
      article(id: $id) {
        ...ArticleFields
      }
    }
  `,
  GET_WITH_AUTHOR: gql`
    ${ARTICLE_FIELDS}
    query ($id: ID!) {
      article(id: $id) {
        ...ArticleFields
        author {
          id
          name
        }
      }
    }
  `,
  GET_ALL: gql`
    ${ARTICLE_FIELDS}
    query {
      articles {
        ...ArticleFields
      }
    }
  `,
  UPDATE: gql`
    ${ARTICLE_FIELDS}
    mutation ($id: ID!, $data: ArticleInput!) {
      updateArticle(id: $id, data: $data) {
        ...ArticleFields
      }
    }
  `,
  REMOVE: gql`
    mutation ($id: ID!) {
      removeArticle(id: $id)
    }
  `,
};
