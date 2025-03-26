import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "OrangeFire393.",
  database: "packrundb",
});

export default sequelize; 