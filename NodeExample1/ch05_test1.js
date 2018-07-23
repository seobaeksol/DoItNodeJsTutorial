var http = require('http');

var server = http.createServer();

var port = 3000;
server.listen(port, function() {
    console.log('Web Server is started : %d', port);
});