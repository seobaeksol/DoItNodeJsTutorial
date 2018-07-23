var http = require('http');
var fs = require('fs');

var server = http.createServer();

var port = 3000;
server.listen(port, function() {
    console.log('Web Server is started : %d', port);
});

server.on('connection', function(socket) {
    var addr = socket.address();
    console.log('Client is connected : %s, %d', addr.address, addr.port);
});

server.on('request', function(req, res) {
    console.log('Client send request');
    console.dir(req);
});

server.on('close', function() {
    console.log('Server is closed');
});

// 클라이언트 요청 이벤트 처리
server.on('request', function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');

    var filename = 'boyoung.jpg';
    fs.readFile(filename, function(err, data) {
        res.writeHead(200, { "Content-Type": "image/jpg"});
        res.write(data);
        res.end();
    });
});