import express, { Router } from 'express';
import { setLocation, getAllMessages, postMessage } from './controllers/controller'
const router: Router = express.Router();

// Location setting for runner:
router.post('/location', setLocation);

// Getting all the runners from the database
// router.get('/runner', getAllRunners);

// (GET): get all messages from the database for a specific chat
router.get('/messages/:chatroom', getAllMessages);

// (POST): add a message to the chat of a specific chatroom
router.post('/message/:chatroom', postMessage);

// (PUT): edit a message

// Getting runners nearby
// router.get('/nearby/:id/:distance', getNearbyRunners);

// RUNNING ROUTES
// (POST): add a new run to the database 
// (DELETE): remove run from the database 
// (PUT): edit an already existing run   

// PROFILE:
// (GET): show all data stored under user id
// (PUT): edit profile 
// (GET): show all stored routes (runs) from the user

export default router;