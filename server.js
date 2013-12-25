var io = require('socket.io');
var listSockets = [];
var listSocketInfo;
var socket = io.listen(1001);
socket.sockets.on('connection', function(socket){
	listSockets.push(socket);
	//listSockets[socket.id] = socket;
	socket.on('message', function(data){
		console.log(data);
		data = JSON.parse(data);
		if(data.to == "person"){
			toPerson(socket, data.message);
		}
		else{
			broadcast(socket, data.message);
		}
	});
	socket.on('getClientName', function(data){
		socket.name = data;
		notifyWhoOnline(socket);
	});
	socket.on('disconnect', function(){
		listSockets.splice(listSockets.indexOf(socket), 1);
	});
});

function notifyWhoOnline(socket){
	for(var i = 0; i < listSockets.length; i++){
		listSockets[i].emit('notifyWhoOnline', {'socketList': getListPeople()});
//		if(listSockets[i].id == socket.id){
//			//listSockets[i].emit('notifyWhoOnline', serializeMessage({'socketList': getListPeople()}));
//			listSockets[i].emit('notifyWhoOnline', {'socketList': getListPeople()});
//		}
	}
}

function serializeMessage(message){
    return JSON.stringify(message);
} 

function toPerson(socket, message){
	for(var i = 0; i < listSockets.length; i++){
		if(listSockets[i].id == socket.id){
			listSockets[i].send(message);
			break;
		}
	}
}

function getListPeople(){
	var people = [];
	for(var i = 0; i < listSockets.length; i++){
		people.push({name: listSockets[i].name, socketId: listSockets[i].id});
	}
	return people;
}

function broadcast(socket, message){
	for(var i = 0; i < listSockets.length; i++){
//		if(listSockets[i].id != socket.id){
//			listSockets[i].send(message);
//		}
		listSockets[i].send(socket.name + ": " + message);
	}
}