const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server);

const users = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('new-user', (username) => {
        users[socket.id] = username;
        io.emit('user-connected', username);
    });

    socket.on('send-message', (message) => {
        const username = users[socket.id];
        io.emit('chat-message', { username, message });
    });

    socket.on('disconnect', () => {
        const username = users[socket.id];
        io.emit('user-disconnected', username);
        delete users[socket.id];
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});