var io = require('socket.io');
var listSockets = [];
var socket = io.listen(1001);
socket.sockets.on('connection', function(socket){
	listSockets.push(socket);
	socket.on('message', function(data){
		console.log(data);
		socket.send("Server sent package");
	});
	socket.on('disconnect', function(){
		listSockets.splice(listSockets.indexOf(socket), 1);
	});
});