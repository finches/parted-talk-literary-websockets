import { app } from 'express';
import { UserManager } from "./src/user-manager";
var http = require('http').Server(app);
var io = require('socket.io')(http);

let manager = new UserManager();

http.listen(4001, function(){
	  console.log('listening on *:4001');
});

io.on('connection', function(socket){
  console.log('a user connected: ' + JSON.stringify(socket.client.id));
  manager.addUser(socket.client.id);

  socket.on('user-name', function(name){
    console.log('user-name: ' + name);
  });

  socket.on('new-line', function(line){
    console.log('message: ' + line);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    manager.removeUser(socket.client.id);
  });
});