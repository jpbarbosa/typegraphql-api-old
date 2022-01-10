import { Arg, Mutation, Query, Resolver } from 'type-graphql';
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

  @Mutation((returns) => Article)
  createArticle(
    @Arg('data', () => ArticleInput) articleInput: ArticleInput
  ): Promise<Article> {
    return this.articleRepository.save(articleInput);
  }
}
