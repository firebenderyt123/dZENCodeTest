import { Controller } from '@nestjs/common';
import { RegisterUserArgs } from '../dto/register-user.dto';
import { AuthUserService } from '../services/auth-user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_MESSAGES } from '../enums/auth-messages.enum';
import { LoginUserArgs } from '../dto/login-user.dto';

@Controller()
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @MessagePattern({ cmd: AUTH_MESSAGES.REGISTER_USER })
  async registerUser(@Payload() data: RegisterUserArgs) {
    try {
      return await this.authUserService.signUp(data);
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: AUTH_MESSAGES.LOGIN_USER })
  async loginUser(@Payload() data: LoginUserArgs) {
    try {
      return await this.authUserService.signIn(data);
    } catch (error) {
      return error;
    }
  }
}
