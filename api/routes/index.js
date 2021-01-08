const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.sendFile('../../index.html');
});

// Import controllers
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');


const isLoggedIn = require('../middlewares/isLoggedIn');

//Routes
//õpilase sisenemine mängu
router.post('/mangima', usersController.enterGame);
router.get('/success/', usersController.startGame);
// adds game score to user data
router.put('/api/users', usersController.update);


//õpetaja loomine ja logimine
router.post('/api/users', usersController.createUser);
router.post('/api/login', authController.login);

router.use(isLoggedIn);

router.get('/api/users', usersController.read);
router.get('/api/users/:id', usersController.readById);

router.delete('/api/users', usersController.delete);

module.exports = router;

