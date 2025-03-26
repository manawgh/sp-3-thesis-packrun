import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
<<<<<<< HEAD
  username: "postgres",
  password: "OrangeFire393.",
  database: "packrundb",
=======
  username: "db_user",
  password: "1243",
  database: "packRunDB",
>>>>>>> d76fc1e4d6990c40b13a982ca834d090621b290d
});

export default sequelize; 