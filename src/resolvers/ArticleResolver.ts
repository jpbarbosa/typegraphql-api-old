import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Article } from '../entities/Article';
import { ArticleInput } from './types/ArticleInput';

@Resolver((of) => Article)
export class ArticleResolver {
  @InjectRepository(Article)
  private readonly articleRepository: Repository<Article>;

  @Query((returns) => [Article])
  articles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  @Query((returns) => Article)
  async article(@Arg('id', () => ID) id: string): Promise<Article> {
    const article = await this.articleRepository.findOne(id);

    if (!article) {
      throw new Error(`Article with id ${id} not found`);
    }

    return article;
  }

  @Mutation((returns) => Article)
  createArticle(
    @Arg('data', () => ArticleInput) articleInput: ArticleInput
  ): Promise<Article> {
    return this.articleRepository.save(articleInput);
  }

  @Mutation((returns) => Article)
  async updateArticle(
    @Arg('id', () => ID) id: string,
    @Arg('data', () => ArticleInput) articleInput: ArticleInput
  ): Promise<Article> {
    const article = await this.articleRepository.findOne(id);

    if (!article) {
      throw new Error(`Article with id ${id} not found`);
    }

    this.articleRepository.merge(article, articleInput);
    return article.save();
  }

  @Mutation((returns) => Boolean)
  async removeArticle(@Arg('id', () => ID) id: string): Promise<boolean> {
    const article = await this.articleRepository.findOne(id);

    if (!article) {
      throw new Error(`Article with id ${id} not found`);
    }

    article.remove();
    return true;
  }
}
