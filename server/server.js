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

    

    socket.on('createMessage', (message) =>{
        console.log('createMessage', message)
        
        socket.emit('newMessage', {
            from: 'Admin',
            text: 'Welcome to the chat',
            createAt: new Date().getTime()

        });

        socket.broadcast.emit('newMessage', {
            from: 'Admin',
            text: 'new user joined',
            createAt: new Date().getTime()
        })
        
        
        
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        })
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // })
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    });
});


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
