import { gCall } from '../../testUtils/gCall';
import { articlesQueries as queries } from '../../queries/articlesQueries';

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
    const response = await gCall({
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
    const response = await gCall({
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

  it('retrieve article with author', async () => {
    const response = await gCall({
      source: queries.GET_WITH_AUTHOR,
      variableValues: {
        id,
      },
    });

    expect(response.data?.article.author.name).toBeDefined();
  });

  it('update', async () => {
    const response = await gCall({
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
    const response = await gCall({
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
    const response = await gCall({
      source: queries.GET_ALL,
    });

    expect(response.data?.articles).toHaveLength(3);
  });
});
