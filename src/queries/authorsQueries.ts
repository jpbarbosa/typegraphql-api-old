import { gql } from '../testUtils/gCall';

const AUTHOR_FIELDS = gql`
  fragment AuthorFields on Author {
    id
    name
  }
`;

export const authorsQueries = {
  CREATE: gql`
    ${AUTHOR_FIELDS}
    mutation ($data: AuthorInput!) {
      createAuthor(data: $data) {
        ...AuthorFields
      }
    }
  `,
  GET: gql`
    ${AUTHOR_FIELDS}
    query ($id: ID!) {
      author(id: $id) {
        ...AuthorFields
      }
    }
  `,
  GET_WITH_ARTICLES: gql`
    ${AUTHOR_FIELDS}
    query ($id: ID!) {
      author(id: $id) {
        ...AuthorFields
        articles {
          id
        }
      }
    }
  `,
  GET_ALL: gql`
    ${AUTHOR_FIELDS}
    query {
      authors {
        ...AuthorFields
      }
    }
  `,
  UPDATE: gql`
    ${AUTHOR_FIELDS}
    mutation ($id: ID!, $data: AuthorInput!) {
      updateAuthor(id: $id, data: $data) {
        ...AuthorFields
      }
    }
  `,
  REMOVE: gql`
    mutation ($id: ID!) {
      removeAuthor(id: $id)
    }
  `,
};
