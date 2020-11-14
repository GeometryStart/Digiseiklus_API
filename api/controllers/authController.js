const authService = require("./services/authService");

const authController = {};
authController.login = async (req, res) => {
    const username = typeof(req.body.username) === 'string' && req.body.username.trim().length > 0 ? req.body.username : false;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 2 ? req.body.password : false;

    if (username && password){

        const loggedIn = await authService.login(username, password);
        
        if (loggedIn) {

            res.status(200).json({
                success: true,
                message: "Login successful"
            });
        }
        else{
            res.status(401).json({
                success: false,
                message: 'Check your credentials'
            });
        }
    }
    else{
        res.status(400).json({
            success: false,
            message: 'Required fields missing'
        });
    }
}

module.exports = authController;