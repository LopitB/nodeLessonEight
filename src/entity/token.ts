import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from "./user";

export interface IToken {
  refreshToken: string;
  accessToken: string;
  userId: number;
}

@Entity('Tokens', {database: 'okten'})
export class Token extends CommonFields implements IToken {
  @Column({
    type: 'varchar',
    width: 250,
    nullable: false,
  })
  refreshToken: string; // name of the column

  @Column({
    type: 'varchar',
    width: 250,
    nullable: false,
  })
  accessToken: string; // name of the column

  @Column({
    type: 'int',
  })
  userId: number; // name of the column

  // references Users table, second argument is connection between tables
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User
}
