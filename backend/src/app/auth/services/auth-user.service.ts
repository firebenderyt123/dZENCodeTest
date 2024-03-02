import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { UsersProfileService } from '../../users/services/users-profile.service';
import { RegisterUserArgs } from '../dto/register-user.dto';
import { Auth } from '../interfaces/auth.interface';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class AuthUserService {
  constructor(
    private authTokenService: AuthTokenService,
    private usersProfileService: UsersProfileService,
  ) {}

  async signUp(userData: RegisterUserArgs): Promise<Auth> {
    const { siteUrl, password, ...restData } = userData;
    const user = await this.usersProfileService.create(
      { ...restData, siteUrl: siteUrl || null },
      password,
    );
    return await this.authTokenService.getAuth(user);
  }

  async signIn(user: User): Promise<Auth> {
    return await this.authTokenService.getAuth(user);
  }

  async validateUser(email: string, password: string): Promise<User> {
    return await this.usersProfileService.searchByEmailAndPassword(
      email,
      password,
    );
  }
}
