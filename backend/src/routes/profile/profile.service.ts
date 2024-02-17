import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private usersRepository: Repository<Profile>,
  ) {}

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
