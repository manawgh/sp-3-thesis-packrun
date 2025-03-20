import { Model, DataTypes } from "sequelize";
import sequelize from "./model";

interface chatRoomAttributes {
  id: bigint,
  position: string,
  UsersId: string[],
  messages: string[]

}