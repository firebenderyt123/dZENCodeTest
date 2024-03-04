import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from '../controllers/comments.controller';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../entities/comment.entity';
import { AuthModule } from '../../auth/modules/auth.module';
import { FilesModule } from '../../files/files.module';
import { CommentAttachmentsService } from '../services/comment-attachments.service';
import { CommentAttachment } from '../entities/comment-attachment.entity';
// import { CommentsEventEmitterService } from '../services/comments-emitter.service';
// import { CommentsEventListenerService } from '../services/comments-listener.service';
// import { CommentsGateway } from '../gateways/comments.gateway';
import { CommentsQueueService } from '../../queue/queue.service';
// import { CommentsQueueProcessor } from '../processors/comments-queue.processor';
import { BullModule } from '@nestjs/bull';
import { NAMESPACE } from 'src/lib/enums/resolvers-namespace.enums';
// import { CommentsCacheService } from '../services/comments-cache.service';
import { CommentsResolver } from '../resolvers/comments.resolver';
import { UsersModule } from 'src/app/users/modules/users.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: NAMESPACE.COMMENTS,
    }),
    AuthModule,
    UsersModule,
    FilesModule,
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([CommentAttachment]),
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CommentAttachmentsService,
    // CommentsEventEmitterService,
    // CommentsEventListenerService,
    // CommentsGateway,
    CommentsQueueService,
    // CommentsQueueProcessor,
    // CommentsCacheService,
    CommentsResolver,
  ],
  exports: [CommentsService, CommentsResolver],
})
export class CommentsModule {}
