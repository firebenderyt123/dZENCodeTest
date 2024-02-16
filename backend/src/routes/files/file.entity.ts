import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 255, unique: true })
  filename: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  uploaded_at: Date;
}
