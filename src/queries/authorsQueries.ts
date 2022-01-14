import { gql } from '../test-utils/gCall';

export const authorsQueries = {
  CREATE: gql`
    mutation ($data: AuthorInput!) {
      createAuthor(data: $data) {
        id
        name
      }
    }
  `,
  GET: gql`
    query ($id: ID!) {
      author(id: $id) {
        id
        name
      }
    }
  `,
  GET_ALL: gql`
    query {
      authors {
        id
      }
    }
  `,
  UPDATE: gql`
    mutation ($id: ID!, $data: AuthorInput!) {
      updateAuthor(id: $id, data: $data) {
        id
        name
      }
    }
  `,
  REMOVE: gql`
    mutation ($id: ID!) {
      removeAuthor(id: $id)
    }
  `,
};
