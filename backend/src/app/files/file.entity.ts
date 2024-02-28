import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('files')
@Index(['containerName', 'blobName'], { unique: true })
export class File {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { name: 'container_name', length: 255 })
  containerName: string;

  @Column('varchar', { name: 'blob_name', length: 255 })
  blobName: string;

  @Column('varchar', { name: 'file_url', length: 255 })
  fileUrl: string;

  @Column('timestamp', {
    name: 'uploaded_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  uploadedAt: Date;
}
