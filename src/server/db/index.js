import { Sequelize } from 'sequelize';
import { config } from '../config.js';

export const sequelize = new Sequelize(config.databaseUrl, {
  logging: false,
  define: { underscored: false, timestamps: true },
});
