import { app } from 'express';
import { UserManager } from "./src/user-manager";
var http = require('http').Server(app);
var io = require('socket.io')(http);

let manager = new UserManager();
let messageCount: number = 0;

//Sets up the server to listen for connections on 4001
http.listen(4001, function(){
	  console.log('listening on *:4001');
});

io.on('connection', function(socket){
  // Initiate connection and send the initial site state to the user
  console.log('a user connected: ' + JSON.stringify(socket.client.id));
  let user = manager.addUser(socket.client.id);
  socket.emit('connId', socket.client.id);
  socket.emit('initialUsers', manager.getUserNames());
  socket.emit('initialMessages', manager.messages);

  // When a user sends their name, send it to everyone so they know who's logged on
  socket.on('user-name', function(name){
    console.log('user-name: ' + name);
    manager.setUserName(user.connectionId, name);
    io.emit('userName', {"name": name, "id": socket.client.id});
  });

  // Whenever a user enters a new line, emit it to everyone to build out the page
  // The server also maintains the state of the site, so it resets after 75 lines
  socket.on('new-line', function(line){
    console.log('message: ' + line);
    io.emit('newMessage', line);
    manager.addMessage(line);
    messageCount++;

    if(messageCount >= 75){
      io.emit('clearScreen', true);
      manager.clearMessages();
      messageCount = 0;
    }
  });

  // Clear out a user from everyone's list when they disconnect
  socket.on('disconnect', function(){
    console.log('user disconnected');
    manager.removeUser(socket.client.id);
    io.emit('removeUser', socket.client.id);
  });
});