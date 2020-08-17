import { Sequelize } from 'sequelize';

export const dbConfig = new Sequelize(
  (process.env.DB_NAME = 'postgres'),
  (process.env.DB_USER = 'postgres'),
  (process.env.DB_PASSWORD = 'postgres'),
  {
    port: Number(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000
    }
  }
);
