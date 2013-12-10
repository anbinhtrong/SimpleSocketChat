var io = require('socket.io');
var listSockets = [];
var socket = io.listen(1001);
socket.sockets.on('connection', function(socket){
	listSockets.push(socket);
	socket.on('message', function(data){
		console.log(data);
		//socket.send("data");
		broadcast(socket, data);
	});
	socket.on('disconnect', function(){
		listSockets.splice(listSockets.indexOf(socket), 1);
	});
});

function broadcast(socket, message){
	for(var i = 0; i < listSockets.length; i++){
		if(listSockets[i] != socket){
			listSockets[i].send(message);
		}
	}
}