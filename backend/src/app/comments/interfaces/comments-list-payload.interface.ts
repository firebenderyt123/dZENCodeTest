import { UUIDArgs } from 'src/lib/dto/uuid.dto';
import { CommentList } from '../models/comment-list.model';

export interface CommentsListPayload extends UUIDArgs {
  commentsList: CommentList;
}
