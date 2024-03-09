import { Module } from '@nestjs/common';
import { AuthUserService } from '../services/auth-user.service';
import { AuthResolver } from '../resolvers/auth.resolver';
import { UsersModule } from 'src/app/users/modules/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/lib/strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: configService.get('jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [AuthUserService, AuthResolver, JwtStrategy],
  exports: [AuthUserService],
})
export class AuthModule {}
