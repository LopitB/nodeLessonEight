import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {CommonFields} from './commonFields';
import {User} from "./user";
import {Comment} from "./comment";

export interface IPost {
  title: string;
  text: string;
  userId: number;
}

@Entity('Posts', {database: 'okten'})
export class Post extends CommonFields implements IPost {
  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
  })
  title: string; // name of the column

  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
  })
  text: string; // name of the column

  @Column({
    type: 'int',
  })
  userId: number; // name of the column

  // references Users table, second argument is connection between tables
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[]
}
