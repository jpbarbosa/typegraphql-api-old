import { gCall } from '../../testUtils/gCall';
import { authorsQueries as queries } from '../../queries/authorsQueries';

const author = {
  name: 'Name',
};

const updatedAuthor = {
  name: 'Name Updated',
};

describe('authors', () => {
  let id: string;

  it('create', async () => {
    const response = await gCall({
      source: queries.CREATE,
      variableValues: {
        data: author,
      },
    });

    expect(response).toMatchObject({
      data: {
        createAuthor: author,
      },
    });

    id = response.data?.createAuthor.id;
  });

  it('retrieve', async () => {
    const response = await gCall({
      source: queries.GET,
      variableValues: {
        id,
      },
    });

    expect(response).toMatchObject({
      data: {
        author,
      },
    });
  });

  it('retrieve author with articles', async () => {
    const response = await gCall({
      source: queries.GET_WITH_ARTICLES,
      variableValues: {
        id: 1,
      },
    });

    expect(response.data?.author.articles.length).toBeGreaterThan(0);
  });

  it('update', async () => {
    const response = await gCall({
      source: queries.UPDATE,
      variableValues: {
        id,
        data: updatedAuthor,
      },
    });

    expect(response).toMatchObject({
      data: {
        updateAuthor: updatedAuthor,
      },
    });
  });

  it('remove', async () => {
    const response = await gCall({
      source: queries.REMOVE,
      variableValues: {
        id,
      },
    });

    expect(response).toMatchObject({
      data: {
        removeAuthor: true,
      },
    });
  });

  it('retrieve all', async () => {
    const response = await gCall({
      source: queries.GET_ALL,
    });

    expect(response.data?.authors).toHaveLength(3);
  });
});
