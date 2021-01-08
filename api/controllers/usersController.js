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
        if (user){
            res.status(200).json({
                success: true,
                user: user
            });
        }
        res.status(400).json({
            message: "No such user registered"
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
    // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 2 ? req.body.password : false;
    const isTeacher = typeof(req.body.isTeacher) === 'boolean' ? req.body.isTeacher : false;
    // Check if required data exists
    if (firstName && lastName && email && password) {
        // Create new json with user data
        const user = {
            firstName,
            lastName,
            email,
            password,
            isTeacher
        };

        const returnedUser = await usersService.createUser(user);
        // Return data
        res.status(201).json({
            success: true,
            user: returnedUser
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}

usersController.update = async (req, res) => {

    const id = typeof(req.body.id) === 'string' ? req.body.id : false;
    if (id) {
        
        const score = typeof(req.body.score) === 'number' ? req.body.score : false;
        
        const user = {
            id,
            score
        };
    
        const result = await usersService.update(user);
        if(result) {
            // Return true
            res.status(200).json({
                success: true
            });
        } else {
            // Return error
            res.status(400).json({
                success: false,
                message: 'No user found.'
            });
        }
    }  else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}


usersController.enterGame = async (req, res) => {
    const username = typeof(req.body.username) === 'string' && req.body.username.trim().length > 0 ? req.body.username : false;
    const score = typeof(req.body.score) === 'number' ? req.body.score : false;
    const code = typeof(req.body.code) === 'number' ? req.body.code : false;
    
    
    if (username && code) {
        const users = await usersService.read();
        users.forEach(user => {
            if (username != user.username){
                const newUser = {
                    username,
                    code,
                    score
                }
                console.log(newUser);
                const createdUser = usersService.enterGame(newUser);
                console.log('Got body:', req.body);
                res.redirect('/success/' + req.body.username);
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
    
    res.sendFile('../../public/mangima.html', { root: __dirname });
    
}; 
usersController.delete = async (req, res) => {
    // Check if required data exists
    const id = typeof(req.body.id) === 'string' ? req.body.id : false;
    if(id) {
        const result = await usersService.delete(id);
        if (result) {
            // Return success message
            res.status(200).json({
                success: result
            });
        } else {
            // Return error message
            res.status(400).json({
                success: false,
                message: 'No user found'
            });
        }

    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}
module.exports = usersController ;

