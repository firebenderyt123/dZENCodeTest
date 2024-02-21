import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthService } from './auth.service';

@WebSocketGateway()
export class AuthGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private authService: AuthService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    const authToken = client.handshake.auth.token;
    if (!authToken) {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: any) {
    // Handle client disconnect
  }

  afterInit(server: Server) {
    // WebSocket server initialized
  }

  // Example WebSocket message handler
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    // Handle WebSocket messages here
    return 'Hello world!';
  }
}
