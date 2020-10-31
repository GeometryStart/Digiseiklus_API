

const usersService = require('../controllers/services/usersService')
const usersController = {};
    
usersController.read = (req, res) => {
    const users = usersService.read();
    //Return list of users
    res.status(200).json({
        success: true,
        users: users
    });
}  
usersController.readById = (req, res) => {
    // Return user with specified id
    const userId = req.params.id;
    const user = usersService.readById(userId);
    res.status(200).json({
        success: true,
        user: user
    });
}

usersController.createUser = (req, res) => {
    const username = typeof(req.body.username) === 'string' && req.body.username.trim().length > 0 ? req.body.username : false;
    //const score = typeof(req.body.score) === 'number' ? req.body.score : false;
    const code = typeof(req.body.code) === 'number' ? req.body.code : false;

    if (username && code){

        const newUser = {
            username,
            code
        };

        const createdUser = usersService.createUser(newUser);
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

module.exports = usersController;

