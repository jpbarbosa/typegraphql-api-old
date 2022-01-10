import { Field, ID, InputType } from 'type-graphql';
import { Article } from '../../entities/Article';

@InputType()
export class ArticleInput implements Partial<Article> {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field((type) => ID)
  authorId: string;
}
