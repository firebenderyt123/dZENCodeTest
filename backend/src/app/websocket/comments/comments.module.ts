import { Module } from '@nestjs/common';
import { CommentsGateway } from './comments.gateway';

@Module({
  imports: [],
  providers: [CommentsGateway],
  exports: [CommentsGateway],
})
export class CommentsGatewayModule {}
