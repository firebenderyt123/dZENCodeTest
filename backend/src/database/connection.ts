import { DataSource } from 'typeorm';
import { migrations } from './migrations';
import { entities } from './entities';
import 'dotenv/config';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWD,
  entities: entities,
  migrations: migrations,
  synchronize: false,
});
