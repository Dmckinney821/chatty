var socket = io();

socket.on('connect', () => {
    console.log('Connected to server')
    socket.emit('createMessage', {
        from: 'Daniel',
        text: 'Still looking'
    })
});

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('newMessage', (message) => {
    console.log('newMessage', message)
})