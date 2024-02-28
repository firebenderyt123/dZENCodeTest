import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthTokenService } from '../services/auth-token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: configService.get('jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthTokenService],
  exports: [AuthTokenService, JwtModule],
})
export class AuthTokenModule {}
