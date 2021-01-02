// Import express and put it into express constant
const express = require('express');
// Create express object and put it into app constant
const app = express();

// Import controllers
//const pingController = require('./api/controllers/pingController');
const usersController = require('../api/controllers/usersController');

const authController = require('../api/controllers/authController');

// Import logger middleware
//const logger = require('./api/middlewares/logger');
////const isLoggedIn = require('./api/middlewares/isLoggedIn');

// Middleware required for receiving body from request object as JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(logger);

// Routes
app.get('/api/users', usersController.read);
app.get('/api/users/:id', usersController.readById);
app.post('/api/users', usersController.createUser);
app.delete('/api/users', usersController.deleteUserById);
app.post('/mangima', usersController.enterGame);
app.get('/success/:id', usersController.startGame);
app.post('/api/login', authController.login);

//app.use(isLoggedIn);


module.exports = app;