import { Query, Resolver } from 'type-graphql';

@Resolver()
export class ArticleResolver {
  @Query((returns) => String)
  helloWorld(): string {
    return 'Hello World!';
  }
}
