import { CreateCommentDto } from 'src/app/comments/dto/create-comment.dto';
import { FileUpload } from '../../files/interfaces/file-input.interface';
import { TokenInfo } from '../../auth/interfaces/token-info.interface';

export interface CommentsCreate {
  data: CreateCommentDto;
  files: FileUpload[];
  token: TokenInfo;
}
