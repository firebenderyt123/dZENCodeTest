// import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
// import { Job } from 'bull';
// import { NAMESPACE } from '../../../queue/queue.enums';
// import { CommentsEventEmitterService } from '../services/comments-emitter.service';
// import { JOBS } from '../../queue/jobs.enum';
// import { CommentsService } from 'src/app/comments/services/comments.service';
// import { getValidFiles, isValidationError } from 'src/utils/validate.utils';
// import { CreateCommentArgs } from 'src/app/comments/dto/create-comment.dto';

// @Processor(NAMESPACE.COMMENTS)
// export class CommentsQueueProcessor {
//   constructor(
//     private readonly commentsEventEmitterService: CommentsEventEmitterService,
//     private readonly commentsService: CommentsService,
//   ) {}

//   @OnQueueFailed()
//   handler(_: Job, error: Error) {
//     return error;
//   }

//   @Process(JOBS.CREATE_COMMENT)
//   async processCreateCommentJob(job: Job<number>) {
//     console.log(job);
//     // const { data, files, token } = job.data;
//     // const error = await isValidationError(CreateCommentArgs, data);
//     // if (error) this.commentsEventEmitterService.emitCommentCreationError(error);
//     // const filesToUpload = getValidFiles(files);
//     // try {
//     //   const newComment = await this.commentsService.create(
//     //     token.userId,
//     //     data,
//     //     filesToUpload,
//     //   );
//     //   await this.commentsEventEmitterService.emitCreatedComment(newComment);
//     // } catch (error) {
//     //   await this.commentsEventEmitterService.emitCommentCreationError(error);
//     // }
//   }
// }
