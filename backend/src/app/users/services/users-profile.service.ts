import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersSecretInfoService } from './users-secret-info.service';

type CreateUser = Omit<User, 'id'>;

@Injectable()
export class UsersProfileService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersSecretInfoService: UsersSecretInfoService,
  ) {}

  async create(userData: CreateUser, password: string): Promise<User> {
    const { username, email, siteUrl } = userData;

    await this.checkDuplicateCredentials(username, email);

    const user = this.usersRepository.create({ username, email, siteUrl });
    const newUser = await this.usersRepository.save(user);
    await this.usersSecretInfoService.savePassword(newUser.id, password);
    return newUser;
  }

  async patchUser(id: number, userData: Partial<User>) {
    const { username, email } = userData;
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User with provided id was not found!');
    }

    if (username || email) {
      await this.checkDuplicateCredentials(username, email);
    }

    Object.assign(user, userData);
    const patchedUser = await this.usersRepository.save(user);
    return patchedUser;
  }

  async findOneBy(
    where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
  ): Promise<User | null> {
    return await this.usersRepository.findOneBy(where);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async searchByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const passwordHash = this.usersSecretInfoService.hashPassword(password);

    const query = this.usersSecretInfoService
      .createQueryBuilder('secretInfo')
      .innerJoinAndSelect('secretInfo.user', 'user')
      .where('user.email = :email', { email })
      .andWhere('secretInfo.passwordHash = :passwordHash', { passwordHash });

    const secretInfo = await query.getOne();

    return secretInfo ? secretInfo.user : null;
  }

  private async checkDuplicateCredentials(username: string, email: string) {
    const existingUser = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        throw new ConflictException(
          'User with the provided username already exists',
        );
      } else {
        throw new ConflictException(
          'User with the provided email already exists',
        );
      }
    }
  }
}
