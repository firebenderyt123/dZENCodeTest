import { UserIdArgs } from 'src/lib/dto/userId.dto';
import { Comment } from '../models/comment.model';

export interface CommentPayload extends UserIdArgs {
  comment: Comment;
}
