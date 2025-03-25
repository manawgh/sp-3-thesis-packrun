import express, { Router } from 'express';

import { logUser } from './controllers/loginController';
import { getAllMessages, assignChatRoom, postMessage } from './controllers/chatController';
import { createNewTrack, getTracksInfo, getTrack, postTrack, deleteTrack } from './controllers/tracksController';

const router: Router = express.Router();

//logs the user in and returns a userId
router.post('/location', logUser, assignChatRoom);

//creates a new track and returns a trackId
router.put('/tracks/:userId', createNewTrack);

//stores your locations in the newTrack using it's id
router.post('/tracks/:userId/:trackId', postTrack);



router.get('/tracks/:userId/', getTracksInfo);
router.get('/tracks/:userId/:trackId', getTrack);
router.delete('/tracks/:userId/:trackId', deleteTrack);



router.get('/messages/:userId', getAllMessages);
router.post('/message/:userId', postMessage); // expected body: {author: string, message: string, time: stringDate}


export default router;