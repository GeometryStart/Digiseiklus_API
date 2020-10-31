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

app.get('/api/ping', (req, res) => {
    res.status(200).json({
        success: true
    });
});

app.get('/', (req,res) => {
    res.sendFile('index.html');
});

app.get('/api/users', usersController.read);
app.get('/api/users/:id', usersController.readById);
app.post('/api/users', usersController.createUser);
app.delete('/api/users', usersController.deleteUserById);

app.get('/success', (req, res) => {
    res.sendFile('/Users/admin/Desktop/ProgrammeerimineII/Digiseikluse/Digiseiklus_API/public/mangima.html');
});
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

app.post('/mangima', (req, res) => {
    const username = typeof(req.body.uname) === 'string' && req.body.uname.trim().length > 0 ? req.body.uname : false;
    //const score = typeof(req.body.score) === 'number' ? req.body.score : false;
    const code = typeof(req.body.code) === 'string' ? req.body.code : false;

    if (username && code){

        const newUser = {
            id: users.length,
            username,
            code
        };

        users.push(newUser);
        res.redirect('/success');
    }
    else{
        res.status(400).json({
            success: false,
            message: 'Required fields missing'
        });
    }
});


app.listen(port, () => {
    console.log('Server running on port: ', port)
});