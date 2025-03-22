import { Model, DataTypes } from "sequelize";
import sequelize from "./model";

export interface Runner {
  id?: bigint,
  userId: string,
  latitude: number,
  longitude: number,
  asignedChatRoom?: string
}

class RunnerModel extends Model<Runner> implements Runner {
  public id!: bigint;
  userId!: string;
  public latitude!: number;
  public longitude!: number;
}

// initializing a new table with sequelize
RunnerModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "runner"
  }
);

export default RunnerModel; 