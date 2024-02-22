import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'auth' })
export class AuthWebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  constructor(private jwtService: JwtService) {}

  async handleConnection() {}

  handleDisconnect(client: Socket) {
    client.disconnect(true);
  }

  afterInit() {}

  @SubscribeMessage('isAuthenticated')
  async handleEvent(@MessageBody() token: string): Promise<boolean> {
    const payload = await this.jwtService.decode(token);
    return !!payload;
  }
}
