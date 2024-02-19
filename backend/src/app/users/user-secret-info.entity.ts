import { Entity, Column, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('secret_info')
export class SecretInfo {
  @PrimaryColumn({ name: 'user_id', type: 'int' })
  userId: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar', { name: 'password_hash', length: 255 })
  passwordHash: string;
}
