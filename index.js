const app = require('./app');
const { port } = require('./config');
// Start listening
app.listen(port, () => {
    console.log('Server running on port: ', port)
});
