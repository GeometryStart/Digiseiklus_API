const hashService = require('./hashService');
const db = require('../../../db');
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
usersService.read = async () => {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(users);
    return users;
}

//Return user by Id
usersService.readById = async (userId) => {
   
    const doc = await db.collection('users').doc(userId).get();
    
    if (!doc.exists){
        console.log('No such document');
        return false;
    }
    
    const user = doc.data();
    console.log('DOcument data: ', user);
    
    return user;
} 
   


usersService.createUser = async (newUser) => {
    newUser.password = await hashService.hash(newUser.password);
  // Add user to 'database'
  await db.collection('users').doc().set(newUser);
  // Create new json from newUser for response
  const userToReturn = { ... newUser };
  // Remove password from user data
  delete userToReturn.password;
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

/* usersService.readByUsername = (username) => {
    const user = users.find(user => user.username === username);
    return user;
} */


usersService.readByUsername = async (username) => {
    // const user = users.find(user => user.email === email);
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('username', '==', username).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    } 
    return user;
  }
module.exports = usersService;

