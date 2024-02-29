export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT, 10) || 8000,
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    name: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV !== 'development' && {
      rejectUnauthorized: false,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    tls: process.env.NODE_ENV !== 'development' && {
      rejectUnauthorized: false,
    },
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
  recaptcha: {
    secretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
  },
});
