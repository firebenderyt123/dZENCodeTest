import { DataSource } from 'typeorm';
import { migrations } from './migrations';
import { config } from 'dotenv';

config({ path: '.env.development' });

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWD,
  migrations: migrations,
  synchronize: false,
});
