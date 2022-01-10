import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './Article';

@ObjectType()
@Entity()
export class Author extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field((type) => [Article])
  @OneToMany((type) => Article, (article) => article.author, {
    cascade: ['insert'],
  })
  articles: Article[];
}
