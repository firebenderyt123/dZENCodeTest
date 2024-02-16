import { Entity, Column, OneToOne, ManyToOne } from 'typeorm';
import Base from './base.entity';
import User from './user.entity';

@Entity('comments')
export default class Comment extends Base {
  @ManyToOne(() => User)
  user: User;

  @OneToOne(() => Comment, { nullable: true })
  parent: Comment;

  @Column('text')
  text: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
