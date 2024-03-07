import { Module } from '@nestjs/common';
import { AuthUserService } from '../services/auth-user.service';
import { AuthResolver } from '../resolvers/auth.resolver';
import { AuthUserController } from '../controllers/auth-user.controller';
import { UsersModule } from 'src/app/users/modules/users.module';
import { RMQModule } from 'src/lib/modules/rabbitmq.module';
import { RABBIT_CLIENT_NAME, RABBIT_QUEUE } from 'src/lib/enums/rabbitmq.enum';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/lib/strategies/jwt.strategy';

@Module({
  imports: [
    RMQModule.register({
      name: RABBIT_CLIENT_NAME.AUTH,
      queue: RABBIT_QUEUE.AUTH,
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: configService.get('jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService, AuthResolver, JwtStrategy],
  exports: [AuthUserService],
})
export class AuthModule {}
