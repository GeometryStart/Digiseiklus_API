const express = require('express');
const app = express();
const port = 3000
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/ping', (req, res) => {
    res.status(200).json({
        success: true
    });
});
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

//Database mockup

const users = [
    {
        id: 0,
        username: 'TestUser1',
        code: '432111'

    },
    {
        id: 1,
        username: 'TestUser2',
        code: '550100'

    }
];

// Get all users

app.get('/api/users', (req, res) => {
    // Return list of users
    res.status(200).json({
        success: true,
        users: users
    });
});


app.get('/api/users/:id', (req, res) => {
    // Return user with specified id
    res.status(200).json({
        success: true,
        user: users[req.params.id]
    });
});
app.get('/success', (req, res) => {
    res.header('username','HelloWorld')
    res.sendFile('/Users/admin/Desktop/ProgrammeerimineII/Digiseikluse/Digiseiklus_API/public/mangima.html');
    
})
app.post('/mangima', (req, res) => {
   /*  const username = typeof(req.body.username) === 'string' && req.body.username.trim().length > 0 ? req.body.username : false;
    //const score = typeof(req.body.score) === 'number' ? req.body.score : false;
    const code = typeof(req.body.code) === 'number' ? req.body.code : false;

    //if (username && code){

    const newUser = {
        id: users.length,
        username,
        code
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        user: newUser
    }); */
    console.log(req.body)

    res.redirect('/success');
    //}
    /* else{
        res.status(400).json({
            success: false,
            message: 'Required fields missing'
        });
    } */
});

// Kustuta kasutaja


app.delete('/api/users', (req, res) => {
    // Check if required data exists
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    if(id || id === 0) {
        users.splice(id, 1);
        // Return success message
        res.status(200).json({
            success: true
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});
app.listen(port, () => {
    console.log('Server running on port: ', port)
});