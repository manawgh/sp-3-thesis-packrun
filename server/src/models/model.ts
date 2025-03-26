import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
<<<<<<< HEAD
  username: "postgres",
  password: "OrangeFire393.",
  database: "packrundb",
=======
  username: "nour",
  password: "",
  database: "packRunDB",
  logging: false
>>>>>>> ae7e53eb2fa0e1758cf16592722a9613370d4123
});

export default sequelize; 