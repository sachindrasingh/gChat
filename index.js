/*var express = require('express');
var app = express();*/
/*var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/views'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

/*app.get('/', function(req, res){
  res.sendfile('index.html');
});*/

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var client = {};
io.on('connection', function(socket) {
    socket.on('join', function(data, e) {
        //socket.join(data.email); // We are using room of socket io
        client[data.usrId] = this.id;
        // console.log(this.id, data)
    });
    socket.on('chat message', function(msg) {
        // io.emit('chat message', msg);
        // io.sockets.connected[client[msg.usr]].emit('chat message', msg);
        var id = client[msg.usr];
    	socket.broadcast.to(id).emit('chat message', msg);
    	// console.log(msg, id);
    });
	socket.on("disconnected", function(e){
		console.log("&&&&&&&&&", e)
	});
});

http.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
