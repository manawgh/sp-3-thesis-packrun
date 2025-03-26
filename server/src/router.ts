import express, { Router } from 'express';

import { logUser } from './controllers/loginController';
import { assignChatRoom } from './controllers/chatController';

import messagesRouter from './routers/messagesRouter';
import tracksRouter from './routers/tracksRouter';

const router: Router = express.Router();

//logs the user in and returns a userId
router.post('/location', logUser, assignChatRoom);

router.use('/tracks', tracksRouter);
router.use('/message', messagesRouter);


export default router;