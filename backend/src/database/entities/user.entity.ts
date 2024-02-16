import { Entity, Column } from 'typeorm';
import Base from './base.entity';

@Entity('users')
export default class User extends Base {
  @Column('varchar', { length: 50, unique: true })
  username: string;

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  password_hash: string;

  @Column('varchar', { length: 255, nullable: true })
  site_url?: string;
}
