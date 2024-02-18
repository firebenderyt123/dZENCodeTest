import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = userData.username;
    user.email = userData.email;
    user.siteUrl = userData.siteUrl;

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        switch (error.constraint) {
          case 'users_username_key':
            throw new ConflictException(
              'User with this username already exists',
            );
          case 'users_email_key':
            throw new ConflictException('User with this email already exists');
        }
      } else {
        throw error;
      }
    }
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
