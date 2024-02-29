import { DataSource } from 'typeorm';
import { migrations } from './migrations';
import { config } from 'dotenv';

config({
  path: !process.env.NODE_ENV.includes('production')
    ? '.env.development'
    : '.env.production',
});

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  migrations: migrations,
  synchronize: false,
  ssl: process.env.NODE_ENV.includes('production') && {
    rejectUnauthorized: false,
  },
});
