import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WS_NAMESPACE } from '../../../queue/websocket.enums';
import { AUTH_EVENTS } from '../enums/auth.enum';

@Injectable()
@WebSocketGateway({ namespace: WS_NAMESPACE.AUTH, cors: true })
export class AuthGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  protected server: Server;

  handleConnection() {}

  handleDisconnect(client: Socket) {
    client.disconnect(true);
  }

  afterInit() {}

  authFailed(message: string) {
    this.server.emit(AUTH_EVENTS.AUTH_FAILED, message);
  }
}
