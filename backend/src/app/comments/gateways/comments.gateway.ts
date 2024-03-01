// import { Injectable, UseGuards } from '@nestjs/common';
// import {
//   ConnectedSocket,
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   OnGatewayInit,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Socket, Server } from 'socket.io';
// import { COMMENTS_EVENTS } from '../enums/comments-events.enum';
// import { COMMENTS_JOBS } from '../enums/comments-jobs.enum';
// import { WS_NAMESPACE } from '../../../queue/websocket.enums';
// import { CommentsCreate } from '../interfaces/comment-create.interface';
// import { JwtWebSocketAuthGuard } from 'src/app/auth/guards/jwt-websocket-auth.guard';
// import { RecaptchaWebSocketGuard } from 'src/app/auth/guards/recaptcha.guard';
// import { CommentsQueueService } from '../services/comments-queue.service';
// import { NewComment } from '../models/new-comment.model';

// @Injectable()
// @WebSocketGateway({ namespace: WS_NAMESPACE.COMMENTS, cors: true })
// export class CommentsGateway
//   implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
// {
//   constructor(private readonly commentsQueueService: CommentsQueueService) {}

//   @WebSocketServer()
//   protected server: Server;

//   handleConnection() {}

//   handleDisconnect(client: Socket) {
//     client.disconnect(true);
//   }

//   afterInit() {}

//   @UseGuards(JwtWebSocketAuthGuard, RecaptchaWebSocketGuard)
//   @SubscribeMessage(COMMENTS_JOBS.CREATE_COMMENT)
//   async onCommentCreate(
//     @ConnectedSocket() client: Socket,
//     @MessageBody() body: CommentsCreate,
//   ) {
//     await this.commentsQueueService.createCommentJob(body);
//     client.disconnect();
//   }

//   commentCreationSuccess(comment: NewComment) {
//     this.server.emit(COMMENTS_EVENTS.COMMENT_CREATED, comment);
//   }

//   commentCreationFailed(message: string) {
//     this.server.emit(COMMENTS_EVENTS.COMMENT_CREATION_FAILED, message);
//   }
// }
