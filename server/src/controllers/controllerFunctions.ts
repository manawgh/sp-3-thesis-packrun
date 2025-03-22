import ChatRoomModel, { chatRoom } from "../models/chatRoomModel";
import { Runner } from "../models/runnerModel";

const CHAT_ROOM_AREA_IN_MTS = 60 * 1000;

export async function assignToDatabase(runner: Runner): Promise<string | undefined> {

  let chatRoomId = await getNearestChatRoom(runner);
  if (!chatRoomId) {
    chatRoomId = runner.latitude + '_' + runner.longitude;
    const newChatRoom = { chatRoomId, usersId: [], messages: [] }
    const isChatRoomCreated = await ChatRoomModel.create(newChatRoom);
    if (isChatRoomCreated) console.log('chatroomcreated');
    else return undefined;
  }
  const nearestChatRoom = await ChatRoomModel.findOne({ where: { chatRoomId } });
  if (nearestChatRoom) {
    if (!nearestChatRoom.usersId.includes(runner.userId)) nearestChatRoom.usersId.push(runner.userId);
    console.log('pushed', nearestChatRoom.usersId);

    const isUserAdded = await ChatRoomModel.update({ usersId: nearestChatRoom.usersId }, { where: { chatRoomId } });
    if (isUserAdded) {
      
      return chatRoomId;
    }
    else return undefined;
  }
}
const indent = () => { for (let i = 0; i < 5; i++)console.log() };
export async function getNearestChatRoom(referencePoint: Runner): Promise<string | undefined> {
  indent();
  console.log('entering near');
  try {
    const nearestChatRoom = await ChatRoomModel.findAll();
    console.log('neareeeest', nearestChatRoom.length, nearestChatRoom);
    if (nearestChatRoom) {
      if (nearestChatRoom.length === 0) return undefined;

      const result = nearestChatRoom
        .map(chatRoom => { return { ...chatRoom, distance: calculateDistance(referencePoint, chatRoom) }; })
        .filter(chatRoom => chatRoom.distance <= CHAT_ROOM_AREA_IN_MTS)
        .reduce((acum, chatRoom) =>
          chatRoom.distance <= CHAT_ROOM_AREA_IN_MTS && chatRoom.distance < acum.distance
            ? chatRoom
            : acum);
      indent();
      console.log('result is ', typeof result, result);
      indent();
      return result.dataValues.chatRoomId;
    }
  } catch (err) {
    console.log(err);
  }
}

function calculateDistance(user: Runner, db: chatRoom) {
  console.log('CALCULATING');
  const dbLatitude = Number(db.chatRoomId.split('_')[0]);
  const dbLongitude = Number(db.chatRoomId.split('_')[1]);

  const R = 6371;
  const dLat = deg2rad(dbLatitude - user.latitude);
  const dLon = deg2rad(dbLongitude - user.longitude);
  const haversFormula =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(user.latitude)) * Math.cos(deg2rad(dbLatitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const ang = 2 * Math.atan2(Math.sqrt(haversFormula), Math.sqrt(1 - haversFormula));
  const kms = R * ang;
  console.log('dbLatitude', dbLatitude);
  console.log('dbLongitude', dbLongitude);
  console.log('user.latitude', user.latitude);
  console.log('user.longitude', user.longitude);
  console.log(`distance from ${user.latitude}, ${user.longitude} && ${dbLatitude}, ${dbLongitude} is ${kms * 1000}`);
  return kms * 1000;

}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);

}