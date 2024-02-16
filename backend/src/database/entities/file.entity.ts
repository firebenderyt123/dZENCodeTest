import { Entity, Column } from 'typeorm';
import Base from './base.entity';

@Entity('files')
export default class File extends Base {
  @Column('varchar', { length: 255, unique: true })
  filename: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  uploaded_at: Date;
}
