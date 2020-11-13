const express = require('express');
const app = express();
const port = 3000
const usersController = require('./api/controllers/usersController');

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


app.get('/', (req,res) => {
    res.sendFile('index.html');
});

app.get('/api/users', usersController.read);
app.get('/api/users/:id', usersController.readById);
app.post('/api/users', usersController.createUser);
app.delete('/api/users', usersController.deleteUserById);
app.post('/mangima', usersController.enterGame);
app.get('/success/:id', usersController.startGame);


/* app.get('/api/users/:id', (req,res)=>{
    const id = Number(req.params.id);
    const currentUsers = [];
    //If given id matches b_id in quotes array, push it to bquotes and then display the quotes in response
    users.forEach(user => user.id === id ? currentUsers.push(user.user): false);
    res.status(200).json({
        success:true,
        user: users[id].username,
        
    });
}); */
app.listen(port, () => {
    console.log('Server running on port: ', port)
});