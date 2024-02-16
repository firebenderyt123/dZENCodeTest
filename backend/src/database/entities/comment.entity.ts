import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import Base from './base.entity';
import User from './user.entity';

@Entity()
export default class Comment extends Base {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Comment, { nullable: true })
  @JoinColumn()
  parent: Comment;

  @Column()
  text: string;

  @Column({ type: 'bigint' })
  created_at: number;
}
