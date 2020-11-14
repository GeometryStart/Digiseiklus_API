const hashService = require('./hashService');
const users =[
    {
        id: 0,
        username: "Masha",
        code: 112233,
        password: "$2b$10$VaU1IpA4x6cTPwGO6tbPleoLmIOV.TDIEJL1h/mz.WY/J.FGPeGwu" //jahuu
        //isPlayer: true
    }
];
const fs = require('fs');


usersService = {};

//Get all Users
usersService.read = () => {
    return users;
}
//Return user by Id
usersService.readById = (userId) => {
    return users[userId];
}

usersService.createUser = async (newUser) => {
    newUser.id = users.length;
    newUser.password = await hashService.hash(newUser.password);
    
    users.push(newUser);
    // Create new json from newUser for response
    const userToReturn = { ... newUser};
    //delete userToReturn.password;
    return userToReturn;
}
usersService.enterGame = (newUser) => {
    newUser.id = users.length;
    users.push(newUser);
    // Create new json from newUser for response
    const userToReturn = { ... newUser};
    //delete userToReturn.password;

    let writeStream = fs.createWriteStream('scores.txt');
    // write some data with a base64 encoding
    let data = JSON.stringify(newUser);
    fs.writeFileSync('scores.txt', data);

    // the finish event is emitted when all data has been flushed from the stream
    writeStream.on('finish', () => {
        console.log('wrote all data to file');
    });
    writeStream.end();
// close the stream
    return userToReturn;
}

usersService.readByUsername = (username) => {
    const user = users.find(user => user.username === username);
    return user;
}
module.exports = usersService;

