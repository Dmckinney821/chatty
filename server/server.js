const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newEmail', {
        from: '3dhdaniel@gmail.com',
        text: 'Get a job',
        createAt: 123
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail)
    })
    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
})


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
