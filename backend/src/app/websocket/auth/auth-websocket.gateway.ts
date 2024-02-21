import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'auth' })
export class AuthWebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  constructor(private jwtService: JwtService) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    const token = this.extractTokenFromHandshake(client.handshake);
    const payload = await this.jwtService.decode(token);

    if (!payload) {
      this.handleDisconnect(client);
      return;
    }
  }

  handleDisconnect(client: Socket) {
    client.disconnect(true);
  }

  afterInit() {}

  private extractTokenFromHandshake(handshake: Socket['handshake']): string {
    const value = handshake.query.token;
    return Array.isArray(value) ? value[0] : value;
  }
}
