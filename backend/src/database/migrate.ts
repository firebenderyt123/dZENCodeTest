import { DataSource } from 'typeorm';
import { migrations } from './migrations';
import { config } from 'dotenv';
import { getEnvFile, parseBoolean } from 'src/lib/utils/environment.utils';

config({
  path: getEnvFile(),
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
  ssl: parseBoolean(process.env.POSTGRES_SSL) && {
    rejectUnauthorized: false,
  },
});
