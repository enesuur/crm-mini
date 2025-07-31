const config = {
  API_PREFIX: process.env.API_PREFIX || "v1",
  PORT: process.env.PORT || "3000",
  MODE: process.env.MODE || "dev",
  BASE_URL: process.env.BASE_URL || "localhost",
  REMOTE_HOST: process.env.REMOTE_HOST || "http://127.0.0.1",
  REMOTE_PORT: process.env.REMOTE_PORT || 8000,
  REMOTE_API_PREFIX: process.env.REMOTE_API_PREFIX || "v1",
  AUTH_JWT_KEY: process.env.AUTH_JWT_KEY || "default_jwt_secret_key",
};

Object.freeze(config);

export default config;
