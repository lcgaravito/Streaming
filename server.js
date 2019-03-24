const ss = require('socket.io-stream');
const path = require('path');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');

io.on('connection', socket => {
    console.log('connection');
    socket.emit('connected', 'Hello World');
    ss(socket).on('file', (stream, data) => {
        stream.pipe(fs.createWriteStream('video.mp4'));
    });
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname + '/client.html'));
});

server.listen(3000);