var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(4001, function(){
	  console.log('listening on *:4001');
});

io.on('connection', function(socket){
  console.log('a user connected');
});