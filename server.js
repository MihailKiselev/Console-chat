const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server);

const users = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Обработка нового пользователя
    socket.on('new-user', (username) => {
        users[socket.id] = username;
        io.emit('user-connected', username);
    });

    // Обработка нового сообщения
    socket.on('send-message', (message) => {
        const username = users[socket.id];
        io.emit('chat-message', { username, message });
    });

    // Обработка отключения пользователя
    socket.on('disconnect', () => {
        const username = users[socket.id];
        io.emit('user-disconnected', username);
        delete users[socket.id];
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});