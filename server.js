if(process.argv.length < 3) {
	console.log("Usage: server.js [port]");
	return;
}

var port = parseInt(process.argv[2], 10);

var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/static", express.static(__dirname + '/client'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat_message', function(msg){
    console.log('message: ' + msg);
	io.emit('chat_message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on port ' + port);
});