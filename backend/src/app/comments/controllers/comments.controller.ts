import { Controller } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { AuthTokenService } from '../../auth/services/auth-token.service';
import { CommentAttachmentsService } from '../services/comment-attachments.service';
import { CommentList } from '../models/comment-list.model';
import { GetCommentListArgs } from '../dto/get-comment-list.dto';
import { MessagePattern } from '@nestjs/microservices';
import { COMMENTS_MESSAGES } from '../enums/comments-messages.enum';

@Controller()
export class CommentsController {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly commentsService: CommentsService,
    private readonly commentAttachmentsService: CommentAttachmentsService,
  ) {}

  @MessagePattern({ cmd: COMMENTS_MESSAGES.GET_COMMENTS })
  async getComments(args: GetCommentListArgs): Promise<CommentList> {
    try {
      return await this.commentsService.getComments(args);
    } catch (error) {
      throw error;
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @Delete('/:id')
  // @HttpCode(HttpStatus.OK)
  // async remove(
  //   @Param('id') commentId: number,
  //   @Req() req: FastifyRequest,
  // ): Promise<'ok'> {
  //   if (isNaN(commentId)) {
  //     throw new BadRequestException(':id must be a number');
  //   }

  //   const { id } = this.authTokenService.isAuthenticated(req.headers);

  //   await this.commentsService.remove(commentId, id);
  //   return 'ok';
  // }
}
