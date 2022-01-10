import { ObjectType, Field, ID } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Author } from './Author';

@ObjectType()
@Entity()
export class Article extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  text: string;

  @Field((type) => Author)
  @ManyToOne((type) => Author)
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @Field()
  @Column()
  authorId: string;
}
