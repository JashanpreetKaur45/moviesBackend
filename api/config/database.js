import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { POSTGRES_URL } = process.env;

export const sequelize = new Sequelize(POSTGRES_URL, {
  logging: false,
  dialect: "postgres",
  dialectModule: pg,

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Consider using a valid SSL certificate in production
    },
  },
});
// Test the connection
sequelize
  .authenticate()
  .then(async () => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
