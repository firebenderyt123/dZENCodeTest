import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import Comment from './comment.entity';
import File from './file.entity';

@Entity('comment_attachments')
export default class CommentAttachment {
  @PrimaryColumn('int')
  comment_id: number;

  @ManyToOne(() => Comment)
  comment: Comment;

  @PrimaryColumn('int')
  file_id: number;

  @ManyToOne(() => File, (file) => file.id)
  file: File;
}
