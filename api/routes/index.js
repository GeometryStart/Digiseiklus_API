const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.sendFile('index.html');
});
// Import controllers
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const isLoggedIn = require('../middlewares/isLoggedIn');

//Routes
router.post('/api/users', usersController.createUser);
router.post('/api/login', authController.login);

router.use(isLoggedIn);
router.get('/api/users', usersController.read);
router.get('/api/users/:id', usersController.readById);
//router.get('/api/users/:username', usersController.readByUsername);
router.delete('/api/users', usersController.deleteUserById);
router.post('/mangima', usersController.enterGame);
router.get('/success/:id', usersController.startGame);




module.exports = router;


/* app.get('/api/users/:id', (req,res)=>{
    const id = Number(req.params.id);
    const currentUsers = [];
    //If given id matches b_id in quotes array, push it to bquotes and then display the quotes in response
    users.forEach(user => user.id === id ? currentUsers.push(user.user): false);
    res.status(200).json({
        success:true,
        user: users[id].username,
        
    });
}); */

//middleware, mis käivitub iga päringuga.
/* const logging = (req, res, next) => {
    console.log(req.headers);
    console.log(new Date(), req.url, req.body.username);
    next();
}

// .....annab igale päringule headeri

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
}); */
//app.use(logging);
