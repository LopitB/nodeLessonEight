import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 7000,

  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY,
  
  EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS,
  EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH,
}
