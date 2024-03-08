import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from '../controllers/comments.controller';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../entities/comment.entity';
import { FilesModule } from '../../files/files.module';
import { CommentAttachmentsService } from '../services/comment-attachments.service';
import { CommentAttachment } from '../entities/comment-attachment.entity';
import { CommentsResolver } from '../resolvers/comments.resolver';
import { UsersModule } from 'src/app/users/modules/users.module';
import { RMQModule } from 'src/lib/modules/rabbitmq.module';
import { RABBIT_CLIENT_NAME, RABBIT_QUEUE } from 'src/lib/enums/rabbitmq.enum';
import { CommentsCacheService } from '../services/comments-cache.service';

@Module({
  imports: [
    RMQModule.register({
      name: RABBIT_CLIENT_NAME.COMMENTS,
      queue: RABBIT_QUEUE.COMMENTS,
    }),
    UsersModule,
    FilesModule,
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([CommentAttachment]),
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CommentAttachmentsService,
    CommentsResolver,
    CommentsCacheService,
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
