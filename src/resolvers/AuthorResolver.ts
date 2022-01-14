import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Author } from '../entities/Author';
import { AuthorInput } from './types/AuthorInput';

@Resolver((of) => Author)
export class AuthorResolver {
  @InjectRepository(Author)
  private readonly authorRepository: Repository<Author>;

  @Query((returns) => [Author])
  authors(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  @Query((returns) => Author)
  async author(@Arg('id', () => ID) id: string): Promise<Author> {
    const author = await this.authorRepository.findOne(id);

    if (!author) {
      throw new Error(`Author with id ${id} not found`);
    }

    return author;
  }

  @Mutation((returns) => Author)
  createAuthor(
    @Arg('data', () => AuthorInput) authorInput: AuthorInput
  ): Promise<Author> {
    return this.authorRepository.save(authorInput);
  }

  @Mutation((returns) => Author)
  async updateAuthor(
    @Arg('id', () => ID) id: string,
    @Arg('data', () => AuthorInput) authorInput: AuthorInput
  ): Promise<Author> {
    const author = await this.authorRepository.findOne(id);

    if (!author) {
      throw new Error(`Author with id ${id} not found`);
    }

    this.authorRepository.merge(author, authorInput);
    return author.save();
  }

  @Mutation((returns) => Boolean)
  async removeAuthor(@Arg('id', () => ID) id: string): Promise<boolean> {
    const author = await this.authorRepository.findOne(id);

    if (!author) {
      throw new Error(`Author with id ${id} not found`);
    }

    await author.remove();

    return true;
  }
}
