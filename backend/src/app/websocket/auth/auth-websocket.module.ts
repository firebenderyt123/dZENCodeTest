import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthWebSocketGateway } from './auth-websocket.gateway';

@Module({
  imports: [JwtModule],
  providers: [AuthWebSocketGateway],
  exports: [AuthWebSocketGateway],
})
export class AuthWebSocketModule {}
