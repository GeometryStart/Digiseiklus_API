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
usersService.readByEmail= async (email) => {
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (snapshot.empty) {
      console.log('No matching user.');
      return;
    }
    const user = {
      email: snapshot.docs[0].email,
      ...snapshot.docs[0].data()
    };
    return user;
  }
  usersService.readByUsername= async (username) => {
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
   


usersService.createUser = async (user) => {

    user.password = await hashService.hash(user.password);
    // Add user to 'database'
    await db.collection('users').doc().set(user);
    // Create new json from newUser for response
    const userToReturn = { ... user };
    // Remove password from user data
    delete userToReturn.password;
    return userToReturn;
 
}

usersService.update = async (user) => {
    const doc = await db.collection('users').doc(user.id).get();
    if (!doc.exists) {
    console.log('No matching user.');
    return false;
  }
  let update = {};
    // Check if optional data exists
    if (user.score) {
        // Change user data in 'database'
        update.score = user.score;
    }
    // Check if optional data exists

    const res = await db.collection('users').doc(user.id).update(update);
    return true;
}



usersService.enterGame = async (newUser) => {
    await db.collection('users').doc().set(newUser);
    const userToReturn = { ... newUser };
    return userToReturn;
}

usersService.delete = async (id) => {
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists) {
      console.log('No matching user.');
      return false;
    }
    await db.collection('users').doc(id).delete();
    return true;
  }

module.exports = usersService;

