import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { User } from '../entities/user.entity';
import { User as UserModel } from '../models/user.model';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from 'src/lib/models/app-error.model';
import { RegisterUserArgs } from 'src/app/auth/dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: RegisterUserArgs): Promise<UserModel> {
    const { username, email, siteUrl, password } = userData;

    await this.checkDuplicateCredentials(username, email);

    const passwordHash = this.hashPassword(password);
    const user = this.usersRepository.create({
      username,
      email,
      siteUrl,
      passwordHash,
    });
    const newUser = await this.usersRepository.save(user);
    return newUser;
  }

  async patchUser(id: number, userData: Partial<UserModel>) {
    const { username, email } = userData;
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundError('User with provided id was not found!');
    }

    if (username || email) {
      await this.checkDuplicateCredentials(username, email);
    }

    const patchedUser = await this.usersRepository.save(user);
    return patchedUser;
  }

  async findOneById(userId: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id: userId });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async searchByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserModel> {
    const passwordHash = this.hashPassword(password);

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user || passwordHash !== user.passwordHash) {
      throw new UnauthorizedError('Invalid email or password');
    }
    return user;
  }

  private async checkDuplicateCredentials(username: string, email: string) {
    const existingUser = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        throw new ConflictError(
          'User with the provided username already exists',
        );
      } else {
        throw new ConflictError('User with the provided email already exists');
      }
    }
  }

  private hashPassword(password: string): string {
    return createHash('md5').update(password).digest('hex');
  }
}
