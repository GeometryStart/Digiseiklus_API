const users =[
    {
        id: 0,
        username: "Masha",
        code: 112233
    }
];

usersService = {};

//Get all Users
usersService.read = () => {
    return users;
}
//Return user by Id
usersService.readById = (userId) => {
    return users[userId];
}

usersService.createUser = (newUser) => {
    newUser.id = users.length;
    users.push(newUser);
    // Create new json from newUser for response
    const userToReturn = { ... newUser};
    //delete userToReturn.password;
    return userToReturn;
}

module.exports = usersService;

