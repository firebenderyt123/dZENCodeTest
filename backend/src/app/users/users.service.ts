import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { SecretInfoService } from './user-secret-info.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private secretInfoService: SecretInfoService,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    const { username, email, siteUrl, password } = userData;

    const existingUserByEmail = await this.findOneBy({ email });
    if (existingUserByEmail)
      throw new ConflictException(
        'User with the provided email already exists',
      );

    const existingUserByUsername = await this.findOneBy({
      username,
    });
    if (existingUserByUsername)
      throw new ConflictException(
        'User with the provided username already exists',
      );

    const user = this.usersRepository.create({
      username,
      email,
      siteUrl,
    });

    const newUser = await this.usersRepository.save(user);
    await this.secretInfoService.savePassword(newUser.id, password);
    return newUser;
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
    const passwordHash = this.secretInfoService.hashPassword(password);

    const query = this.secretInfoService
      .createQueryBuilder('secretInfo')
      .innerJoinAndSelect('secretInfo.user', 'user')
      .where('user.email = :email', { email })
      .andWhere('secretInfo.passwordHash = :passwordHash', { passwordHash });

    const secretInfo = await query.getOne();

    return secretInfo ? secretInfo.user : null;
  }
}
