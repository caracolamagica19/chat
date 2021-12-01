var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var port = process.env.PORT || 4000;
var server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


app.use(express.static('public'));


// socket configuracion
var io = socket(server);
io.on('connection', (socket) => {
  console.log(`made socket connection with id ${socket.id}`);
  
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data.handle);
  });

});
