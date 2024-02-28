import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE } from '../../../queue/queue.enums';
import { CommentsEventEmitterService } from '../services/comments-emitter.service';
import { COMMENTS_JOBS } from '../enums/comments.enum';
import { CommentsService } from 'src/app/comments/services/comments.service';
import { getValidFiles, isValidationError } from 'src/utils/validate.utils';
import { CreateCommentDto } from 'src/app/comments/dto/create-comment.dto';
import { CommentsCreate } from '../interfaces/comment-create.interface';

@Processor(QUEUE.COMMENTS)
export class CommentsQueueProcessor {
  constructor(
    private readonly commentsEventEmitterService: CommentsEventEmitterService,
    private readonly commentsService: CommentsService,
  ) {}

  @OnQueueFailed()
  handler(_: Job, error: Error) {
    return error;
  }

  @Process(COMMENTS_JOBS.CREATE_COMMENT)
  async processCreateCommentJob(job: Job<CommentsCreate>) {
    const { data, files, token } = job.data;

    const error = await isValidationError(CreateCommentDto, data);
    if (error) this.commentsEventEmitterService.emitCommentCreationError(error);

    const filesToUpload = getValidFiles(files);

    try {
      const newComment = await this.commentsService.create(
        token.userId,
        data,
        filesToUpload,
      );
      await this.commentsEventEmitterService.emitCreatedComment(newComment);
    } catch (error) {
      await this.commentsEventEmitterService.emitCommentCreationError(error);
    }
  }
}
