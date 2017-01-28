var app = require('express')();
var http = require('http').Server(app);

http.listen(4001, function(){
	  console.log('listening on *:4001');
});
