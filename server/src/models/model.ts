import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "nour",
  password: "",
  database: "packRunDB",
  logging: false
});

export default sequelize; 