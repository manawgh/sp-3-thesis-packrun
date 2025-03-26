//id, location[], owner, converted

import sequelize from "./model";
import { DataTypes, Model } from "sequelize";
import { Location } from "../types";

export interface Track {
  id?: bigint,
  owner: string,
  location: Location[],
<<<<<<< HEAD
  estimatedTime?: string,
  distance?: string,
  updatedAt?: Date,
  createdAt?: Date,
}

/*
total time
total distance
elevation
speed?

*/
=======
}


>>>>>>> ae7e53eb2fa0e1758cf16592722a9613370d4123
class TrackModel extends Model<Track> implements Track {
  id?: bigint;
  owner!: string;
  location!: Location[];
<<<<<<< HEAD
  estimatedTime?: string | undefined;
  distance?: string;
  updatedAt?: Date;
  createdAt?: Date;
=======
>>>>>>> ae7e53eb2fa0e1758cf16592722a9613370d4123
}
TrackModel.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false
  },
<<<<<<< HEAD
  estimatedTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  distance: {
    type: DataTypes.STRING,
    allowNull: true,
  }
=======

>>>>>>> ae7e53eb2fa0e1758cf16592722a9613370d4123
}, { sequelize, tableName: "track" });

export default TrackModel;
