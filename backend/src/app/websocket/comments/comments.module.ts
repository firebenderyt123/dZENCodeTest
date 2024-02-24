import { Module } from '@nestjs/common';
import { CommentsGateway } from './comments.gateway';
import { CommentsModule } from 'src/app/comments/comments.module';

@Module({
  imports: [CommentsModule],
  providers: [CommentsGateway],
  exports: [CommentsGateway],
})
export class CommentsGatewayModule {}
