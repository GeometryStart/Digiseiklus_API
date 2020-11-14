const usersService = require("./usersService");
const hashService = require("./hashService");

const authService = {};


authService.login = async (username, password) => {

    const user = usersService.readByUsername(username);
    

    if (user) {
        const match = await hashService.compare(password, user.password);
        
        if (match) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
   

}



module.exports = authService;