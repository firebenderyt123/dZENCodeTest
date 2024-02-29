export const isProd = () =>
  process.env.NODE_ENV && process.env.NODE_ENV.includes('production');

export const getEnvFile = () =>
  !isProd() ? '.env.development' : '.env.production';

export const parseBoolean = (value: string) =>
  value && value.toLowerCase() === 'true' ? true : false;
