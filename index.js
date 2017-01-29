var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(4001, function(){
	  console.log('listening on *:4001');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('user-name', function(name){
    console.log('user-name: ' + name);
  });

  socket.on('new-line', function(line){
    console.log('message: ' + line);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});