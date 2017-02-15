import { app } from 'express';
import { UserManager } from "./src/user-manager";
var http = require('http').Server(app);
var io = require('socket.io')(http);

let manager = new UserManager();
let messageCount: number = 0;

http.listen(4001, function(){
	  console.log('listening on *:4001');
});

io.on('connection', function(socket){
  // Initiate connection
  console.log('a user connected: ' + JSON.stringify(socket.client.id));
  let user = manager.addUser(socket.client.id);
  socket.emit('connId', socket.client.id);
  socket.emit('initialUsers', manager.getUserNames());

  socket.on('user-name', function(name){
    console.log('user-name: ' + name);
    manager.setUserName(user.connectionId, name);
    io.emit('userName', {"name": name, "id": socket.client.id});
  });

  socket.on('new-line', function(line){
    console.log('message: ' + line);
    io.emit('newMessage', line);
    messageCount++;

    if(messageCount >= 75){
      io.emit('clearScreen', true);
      messageCount = 0;
    }
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    manager.removeUser(socket.client.id);
    io.emit('removeUser', socket.client.id);
  });
});