import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/entities/user.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthUserService } from '../services/auth-user.service';
import { Auth } from '../interfaces/auth.interface';

@Controller()
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Req() req: { user: User }): Promise<Auth> {
    return await this.authUserService.signIn(req.user);
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() userData: CreateUserDto): Promise<Auth> {
    return await this.authUserService.signUp(userData);
  }
}
