import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn({ type: 'int' })
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar', { length: 255 })
  password_hash: string;
}
