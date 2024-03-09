import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { File } from '../../files/file.entity';
import { Comment } from './comment.entity';

@Entity('comment_attachments')
export class CommentAttachment {
  @PrimaryColumn({ name: 'file_id', type: 'int' })
  fileId: number;

  @Column({ name: 'comment_id', type: 'int' })
  commentId: number;

  @ManyToOne(() => Comment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @OneToOne(() => File, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'file_id' })
  file: File;
}
