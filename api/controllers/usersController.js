const usersService = require('../services/usersService');
const db = require('../../db');
const usersController = {};


usersController.read = async (req, res) => {
    const users = await usersService.read();
    //Return list of users
    res.status(200).json({
        success: true,
        users: users
    });
}  
usersController.readById = async (req, res) => {
    // Return user with specified id
    const userId = req.params.id;
    if(userId){
        const user = await usersService.readById(userId);
        res.status(200).json({
            success: true,
            user: user
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'No id provided'
        });
    }
}

usersController.readByUsername = async (req, res) => {
    // Return user with specified username
    const username = req.params.username;
    if (username) {
        const user = await usersService.readByUsername(username);
        res.status(200).json({
            success: true,
            user: user
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'No username provided'
        });
    }
}
usersController.createUser = async (req, res) => {
    const username = typeof(req.body.username) === 'string' && req.body.username.trim().length > 0 ? req.body.username : false;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 2 ? req.body.password : false;
    const code = typeof(req.body.code) === 'number' ? req.body.code : false;
    
    if (username && code && password){

        const newUser = {
            username,
            code,
            password
        };
        
        const createdUser = await usersService.createUser(newUser);
        res.status(201).json({success: true, user: createdUser});
        
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Required fields missing'
        });
    } 
}
usersController.deleteUserById = (req, res) => {
    // Check if required data exists
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    if (id || id === 0) {
        users.splice(id, 1);
        // Return success message
        res.status(200).json({
            success: true
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}
usersController.enterGame = async (req, res) => {
    const username = typeof(req.body.username) === 'string' && req.body.username.trim().length > 0 ? req.body.username : false;
    //const score = typeof(req.body.score) === 'number' ? req.body.score : false;
    const code = typeof(req.body.code) === 'number' ? req.body.code : false;
    
    
    if (username && code) {
        const users = await usersService.read();
        users.forEach(user => {
            if (username != user.username){
                const newUser = {
                    id: users.length,
                    username,
                    code
                }

                const createdUser = usersService.enterGame(newUser);
                console.log('Got body:', req.body);
    
                res.redirect('/success/' + req.body.uname);
            }
            else{
                console.log("See kasutaja on juba olemas");
            };
            
        });
    }
    else{
        res.status(400).json({
            success: false,
            message: 'Required fields missing'
        });
    }
}; 
usersController.startGame = (req, res) => {

    res.sendFile('/mangima.html', { root: __dirname });
    
}; 
module.exports = usersController;

