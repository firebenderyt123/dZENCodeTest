import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { CommentAttachment } from './comment-attachment.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.replies, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_comment_id' })
  parent: Comment | null;

  @OneToMany(() => Comment, (comment) => comment.parent, { cascade: true })
  replies: Comment[];

  @OneToMany(() => CommentAttachment, (attachment) => attachment.comment, {
    cascade: true,
  })
  attachments: CommentAttachment[];

  @Column('text')
  text: string;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
