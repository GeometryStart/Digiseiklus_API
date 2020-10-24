const express = require('express');
const app = express();
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/ping', (req, res) => {
    res.status(200).json({
        success: true
    });
});
app.listen(port, () => {
    console.log('Server running on port: ', port)
});

//Database mockup

const users = [
    {
        id: 0,
        username: 'TestUser1',
        score: '45',
        code: '432111'

    },
    {
        id: 1,
        username: 'TestUser2',
        score: '60',
        code: '550100'

    }
];

// Get all users

app.get('/api/users', (req, res) => {
    res.status(200).json({
        success: true,
        users: users
    });
});

// Get one user
app.get('/api/users/:id', (req, res) => {
    // Return user with specified id
    res.status(200).json({
        success: true,
        user: users[req.params.id]
    });
});

app.post('/api/users', (req, res) => {
    const username = typeof(req.body.username) === 'string' && req.body.username.trim().length > 0 ? req.body.username : false;
    const score = typeof(req.body.score) === 'number' ? req.body.score : false;
    const code = typeof(req.body.code) === 'number' ? req.body.code : false;

    if (username && score && code){

        const newUser = {
            id: users.length,
            username,
            score,
            code
        };

        users.push(newUser);

        res.status(201).json({
            success: true,
            user: newUser
        });

    }
    else{
        res.status(400).json({
            success: false,
            message: 'Required fields missing'
        });
    }
});


