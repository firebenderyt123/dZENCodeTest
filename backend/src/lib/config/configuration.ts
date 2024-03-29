import { isProd, parseBoolean } from 'src/lib/utils/environment.utils';

export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 8000,
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    name: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: parseBoolean(process.env.POSTGRES_SSL) && {
      rejectUnauthorized: false,
    },
  },
  rabbitmq: {
    urls: [process.env.RABBITMQ_URL],
    queueDurable: parseBoolean(process.env.RABBITMQ_QUEUE_DURABLE) || false,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
    tls: parseBoolean(process.env.REDIS_TLS) && {
      rejectUnauthorized: false,
    },
    isTls: parseBoolean(process.env.REDIS_TLS),
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
  azure: {
    storage: {
      accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
      accountKey: process.env.AZURE_STORAGE_ACCOUNT_KEY,
    },
  },
  graphql: {
    graphiql: !isProd(),
  },
  recaptcha: {
    secretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
    skipIf: !isProd(),
    debug: !isProd(),
  },
});
