import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();

const name: string = process.env.DB_NAME || '';
const user: string = process.env.DB_USER || '';
const password: string = process.env.DB_PASSWORD || '';
const host: string = process.env.DB_HOST || '';

const sequelize = new Sequelize({
  database: name,
  username: user,
  password: password,
  host:host,
  dialect: 'mysql',
});

export const tables = sequelize.sync()
  .then(() => {
    console.log('Tablas creadas correctamente.');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });



export default sequelize;


