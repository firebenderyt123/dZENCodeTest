import { PrimaryGeneratedColumn } from 'typeorm';

export default abstract class Base {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
}
