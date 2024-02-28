import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway()
export abstract class BaseGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  protected server: Server;

  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(_: Socket) {}

  handleDisconnect(client: Socket) {
    client.disconnect(true);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(_: Socket) {}
}
