import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { File } from '../../files/file.entity';
import { Comment } from '../comment.entity';

@Entity('comment_attachments')
export class CommentAttachment {
  @PrimaryColumn('int')
  comment_id: number;

  @ManyToOne(() => Comment)
  comment: Comment;

  @PrimaryColumn('int')
  file_id: number;

  @ManyToOne(() => File, (file) => file.id)
  file: File;
}
