import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 50, unique: true })
  username: string;

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Column('varchar', { length: 255, nullable: true })
  site_url?: string;
}
