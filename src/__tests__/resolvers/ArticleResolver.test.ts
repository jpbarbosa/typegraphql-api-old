import { Connection } from 'typeorm';
import { seed } from '../../utils/seed';
import { gql, gCall } from '../../test-utils/gCall';
import { testConn } from '../../test-utils/testConn';
import { createSchema } from '../../utils/createSchema';

const queries = {
  CREATE: gql`
    mutation ($data: ArticleInput!) {
      createArticle(data: $data) {
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
};

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();

  await seed();
});

afterAll(async () => {
  await conn.close();
});

describe('articles', () => {
  it('create', async () => {
    const schema = await createSchema();

    const data = {
      title: 'Title',
      text: 'Text',
      authorId: '1',
    };

    const response = await gCall(schema)({
      source: queries.CREATE,
      variableValues: {
        data,
      },
    });

    expect(response.data?.createArticle).toEqual(data);
  });

  it('retrieve all', async () => {
    const schema = await createSchema();

    const response = await gCall(schema)({
      source: queries.GET_ALL,
    });

    expect(response.data?.articles).toHaveLength(4);
  });
});
