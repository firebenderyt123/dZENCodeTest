import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from '../controllers/comments.controller';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../entities/comment.entity';
import { AuthModule } from '../../auth/modules/auth.module';
import { UsersProfileModule } from '../../users/modules/users-profile.module';
import { FilesModule } from '../../files/files.module';
import { CommentAttachmentsService } from '../services/comment-attachments.service';
import { CommentAttachment } from '../entities/comment-attachment.entity';
import { CommentsEventEmitterService } from '../services/comments-emitter.service';
// import { CommentsEventListenerService } from '../services/comments-listener.service';
// import { CommentsGateway } from '../gateways/comments.gateway';
import { CommentsQueueService } from '../services/comments-queue.service';
import { CommentsQueueProcessor } from '../processors/comments-queue.processor';
import { BullModule } from '@nestjs/bull';
import { QUEUE } from 'src/queue/queue.enums';
import { CommentsCacheService } from '../services/comments-cache.service';
import { CommentsResolver } from '../resolvers/comments.resolver';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE.COMMENTS,
    }),
    AuthModule,
    FilesModule,
    UsersProfileModule,
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([CommentAttachment]),
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CommentAttachmentsService,
    CommentsEventEmitterService,
    // CommentsEventListenerService,
    // CommentsGateway,
    CommentsQueueService,
    CommentsQueueProcessor,
    CommentsCacheService,
    CommentsResolver,
  ],
  exports: [CommentsService, CommentsResolver],
})
export class CommentsModule {}
