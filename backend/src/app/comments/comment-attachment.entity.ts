import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { File } from '../files/file.entity';
import { Comment } from '../comments/comment.entity';

@Entity('comment_attachments')
export class CommentAttachment {
  @PrimaryColumn({ name: 'comment_id', type: 'int' })
  commentId: number;

  @ManyToOne(() => Comment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @PrimaryColumn({ name: 'file_id', type: 'int', unique: true })
  fileId: number;

  @OneToOne(() => File, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'file_id' })
  file: File;
}
