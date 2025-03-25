//id, location[], owner, converted

import sequelize from "./model";
import { DataTypes, Model } from "sequelize";
import { Location } from "../types";

export interface Track {
  id?: bigint,
  owner: string,
  location: Location[],
}


class TrackModel extends Model<Track> implements Track {
  id?: bigint;
  owner!: string;
  location!: Location[];
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

}, { sequelize, tableName: "track" });

export default TrackModel;
