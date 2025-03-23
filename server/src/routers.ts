import express, { Router } from 'express';
import { setLocation, getAllMessages, postMessage, logUserInChatRoom } from './controllers/controller'
const router: Router = express.Router();


router.post('/location', setLocation, logUserInChatRoom);

router.get('/messages/:chatroom', getAllMessages);

// expected body: {author: string, message: string, time: stringDate}
router.post('/message/:chatroom', postMessage);


export default router;