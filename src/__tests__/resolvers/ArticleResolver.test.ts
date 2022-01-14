import { Connection } from 'typeorm';
import { seed } from '../../utils/seed';
import { createSchema } from '../../utils/createSchema';
import { gCall } from '../../test-utils/gCall';
import { testConn } from '../../test-utils/testConn';
import { articlesQueries as queries } from '../../queries/articlesQueries';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();

  await seed();
});

afterAll(async () => {
  await conn.close();
});

const article = {
  title: 'Title',
  text: 'Text',
  authorId: '1',
};

const updatedArticle = {
  title: 'Title Updated',
  text: 'Text Updated',
  authorId: '2',
};

describe('articles', () => {
  let id: string;

  it('create', async () => {
    const schema = await createSchema();

    const response = await gCall(schema)({
      source: queries.CREATE,
      variableValues: {
        data: article,
      },
    });

    expect(response).toMatchObject({
      data: {
        createArticle: article,
      },
    });

    id = response.data?.createArticle.id;
  });

  it('retrieve', async () => {
    const schema = await createSchema();

    const response = await gCall(schema)({
      source: queries.GET,
      variableValues: {
        id,
      },
    });

    expect(response).toMatchObject({
      data: {
        article,
      },
    });
  });

  it('update', async () => {
    const schema = await createSchema();

    const response = await gCall(schema)({
      source: queries.UPDATE,
      variableValues: {
        id,
        data: updatedArticle,
      },
    });

    expect(response).toMatchObject({
      data: {
        updateArticle: updatedArticle,
      },
    });
  });

  it('remove', async () => {
    const schema = await createSchema();

    const response = await gCall(schema)({
      source: queries.REMOVE,
      variableValues: {
        id,
      },
    });

    expect(response).toMatchObject({
      data: {
        removeArticle: true,
      },
    });
  });

  it('retrieve all', async () => {
    const schema = await createSchema();

    const response = await gCall(schema)({
      source: queries.GET_ALL,
    });

    expect(response.data?.articles).toHaveLength(3);
  });
});
