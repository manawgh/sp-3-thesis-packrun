import express, { Router } from 'express';
import { setLocation, getNearbyRunners, getAllRunners } from './controllers/controller'
const router: Router = express.Router();

// Defining routes for the User: 

router.post('/location', setLocation);

router.get('/nearby/:id/:distance', getNearbyRunners);

router.get('/runner', getAllRunners);


// (GET): get all messages from the database
// (POST): add a message to the chat
// (PUT): edit a message

// RUNNING ROUTES
// (POST): add a new run to the database 
// (DELETE): remove run from the database 
// (PUT): edit an already existing run   

// PROFILE:
// (GET): show all data stored under user id
// (PUT): edit profile 
// (GET): show all stored routes (runs) from the user

export default router;