import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { File } from '../files/file.entity';
import { Comment } from '../comments/comment.entity';

@Entity('comment_attachments')
export class CommentAttachment {
  @PrimaryColumn('int')
  comment_id: number;

  @ManyToOne(() => Comment)
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @PrimaryColumn('int')
  file_id: number;

  @ManyToOne(() => File)
  @JoinColumn({ name: 'file_id' })
  file: File;
}
