import { Request, Response } from "express"
import RunnerModel, { Runner } from "../models/runnerModel";
import { removeRunnerFromChatRoom } from "../helpers/chatFunctions";
import { Op } from "sequelize";
import ChatRoomModel from "../models/chatRoomModel";

//minutes of inactivity to autologout users
const LOGIN_EXPIRES_MINUTES = 5;

export async function logUser(req: Request, res: Response, next: Function) {

  if (isMissingFields(req)) res.status(400).json('Missing fields');
  else if (incorrectCoordinates(req)) res.status(400).json('Incorrect coordinates ');
  else {

    const { userId, longitude, latitude } = req.body;
    const runner: Runner = { userId, longitude, latitude }

    const isRunnerLoggedIn = await RunnerModel.findOne({ where: { userId } });

    if (isRunnerLoggedIn) await RunnerModel.update({ longitude, latitude }, { where: { userId } });
    else await RunnerModel.create(runner);

    console.log(`long=${longitude} lat=${latitude} userId=${userId}`);
    next();
  }
}

function isMissingFields(req: Request): boolean {
  /*  return !req.body || Object.keys(req.body).length === 0
     || !Object.keys(req.body).includes('longitude') || !Object.keys(req.body).includes('latitude')
     || !Object.keys(req.body).includes('userId') */

  return !req.body || Object.keys(req.body).length === 0
    || !Object.keys(req.body).includes('userId') || !Object.keys(req.body).includes('coords')
    || !Object.keys(req.body.coords).includes('longitude')
    || !Object.keys(req.body.coords).includes('latitude');

}

function incorrectCoordinates(req: Request) {
  return req.body.latitude < -90 || req.body.latitude > 90 || req.body.longitude < -180 || req.body.longitude > 180;
}

async function checkExpiringSessions() {

  const expiringRunners = await RunnerModel
    .findAll({ where: { updatedAt: { [Op.lt]: new Date(Date.now() - LOGIN_EXPIRES_MINUTES * 60 * 1000) } } });

  if (expiringRunners && expiringRunners.length !== 0) {
    Promise.all(expiringRunners.map(async (runner) => removeRunnerFromChatRoom(runner.userId, runner.assignedChatRoom)))
      .then(() => checkForEmptyChatRooms())
      .catch(err => console.log(err));
  } else console.log('nada aun');
  await RunnerModel.destroy({ where: { updatedAt: { [Op.lt]: new Date(Date.now() - LOGIN_EXPIRES_MINUTES * 60 * 1000) } } });

}

async function checkForEmptyChatRooms() {
  const chatRooms = await ChatRoomModel.findAll();
  chatRooms.forEach(room => room.usersId.length === 0 && room.destroy());
}

export async function checkIfLogged(req: Request, res: Response, next: Function) {
  const userId = req.params.userId;
  const isLoggedIn = await RunnerModel.findOne({ where: { userId } });

  isLoggedIn ? next() : res.status(400).send('User not logged in');

}

setInterval(checkExpiringSessions, 1000 * 60 * LOGIN_EXPIRES_MINUTES / 2);
