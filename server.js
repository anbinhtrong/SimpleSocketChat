var io = require('socket.io');
var listSockets = [];
var listSocketInfo;
var socket = io.listen(1001);
socket.sockets.on('connection', function(socket){
	listSockets.push(socket);
	//listSockets[socket.id] = socket;
	socket.on('message', function(data){
		console.log(data);
		broadcast(socket, data);
	});
	socket.on('getClientName', function(data){
		socket.name = data;
	});
	socket.on('disconnect', function(){
		listSockets.splice(listSockets.indexOf(socket), 1);
	});
});

function broadcast(socket, message){
	for(var i = 0; i < listSockets.length; i++){
//		if(listSockets[i].id != socket.id){
//			listSockets[i].send(message);
//		}
		listSockets[i].send(socket.name + ": " + message);
	}
}