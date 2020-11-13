

const usersService = require('../controllers/services/usersService')
const usersController = {};
const users = usersService.read();
    
usersController.read = (req, res) => {
    
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
usersController.enterGame = (req, res) => {
    const username = typeof(req.body.uname) === 'string' && req.body.uname.trim().length > 0 ? req.body.uname : false;
    //const score = typeof(req.body.score) === 'number' ? req.body.score : false;
    const code = typeof(req.body.code) === 'string' ? req.body.code : false;
    
    
    if (username && code) {
        
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

