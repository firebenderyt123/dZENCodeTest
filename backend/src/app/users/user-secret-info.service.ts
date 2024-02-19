import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import { createHash } from 'crypto';
import { SecretInfo } from './user-secret-info.entity';

@Injectable()
export class SecretInfoService {
  constructor(
    @InjectRepository(SecretInfo)
    private secretInfoRepository: Repository<SecretInfo>,
  ) {}

  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<SecretInfo> {
    return this.secretInfoRepository.createQueryBuilder(alias, queryRunner);
  }

  async savePassword(userId: number, password: string): Promise<void> {
    const passwordHash = this.hashPassword(password);
    const secretInfo = this.secretInfoRepository.create({
      userId,
      passwordHash,
    });
    await this.secretInfoRepository.save(secretInfo);
  }

  hashPassword(password: string): string {
    return createHash('md5').update(password).digest('hex');
  }
}
