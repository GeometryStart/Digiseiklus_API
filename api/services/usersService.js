const hashService = require('./hashService');
const db = require('../../db');

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

//Return user by username
usersService.readByUsername = async (username) => {
    const snapshot = await db.collection('users').where('username', '==', username).get();
    if (snapshot.empty) {
      console.log('No matching user.');
      return;
    }
    const user = {
      username: snapshot.docs[0].username,
      ...snapshot.docs[0].data()
    };
    return user;
  }
  
  // Return user by id
  usersService.readById = async (userId) => {
    const doc = await db.collection('users').doc(userId).get();
    if (!doc.exists) {
      console.log('No user found!');
      return false;
    }
    const user = doc.data();
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

module.exports = usersService;

