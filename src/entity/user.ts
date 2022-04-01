import {Column, Entity, OneToMany} from 'typeorm';

import { CommonFields } from './commonFields';
import {IPost, Post} from "./post";
import {Comment} from "./comment";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  age?: number;
  phone: string;
  email: string;
  password: string;
  posts: IPost[];
}

@Entity('Users', { database: 'okten' })
export class User extends CommonFields implements IUser {
  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
  })
    firstName: string; // name of the column

  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
  })
    lastName: string; // name of the column

  @Column({
    type: 'int',
  })
    age?: number; // name of the column

  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    unique: true,
  })
    phone: string; // name of the column

  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    unique: true,
  })
    email: string; // name of the column

  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
  })
    password: string; // name of the column
  // references Posts table, second argument is connection between tables
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]
}
