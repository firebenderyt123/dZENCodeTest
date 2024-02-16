import { Entity, Column } from 'typeorm';
import Base from './base.entity';

@Entity()
export default class User extends Base {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column({ nullable: true })
  site_url?: string;
}
