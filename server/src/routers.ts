import express, { Router } from 'express';

import { logUser } from './controllers/loginController';
import { getAllMessages, assignChatRoom, postMessage } from './controllers/chatController';
import { createNewTrack, getTracks, postTrack } from './controllers/tracksController';




const router: Router = express.Router();


router.post('/location', logUser, assignChatRoom);



//start tracking
router.put('/tracks/:userId', createNewTrack);


router.post('/tracks/:userId/:trackId', postTrack);




router.get('/tracks/:userId:/', getTracks);





router.get('/messages/:userId', getAllMessages);
router.post('/message/:userId', postMessage); // expected body: {author: string, message: string, time: stringDate}


export default router;