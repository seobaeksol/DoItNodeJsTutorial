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
    var infile = fs.createReadStream(filename, {flags: 'r'});
    var fileLength = 0;
    var curLength = 0;

    fs.stat(filename, function(err, stats) {
        fileLength = stats.size;
    });

    res.writeHead(200, {"Content-Type:": "image/jpg"});

    // 파일 내용을 스트림에서 읽어 본문 쓰기
    infile.on('readable', function() {
        var chunk;

        while (null !== (chunk = infile.read())) {
            console.log('읽어 들인 데이터 크기 : %d 바이트', chunk.length);
            curLength += chunk.length;
            res.write(chunk, 'utf8', function(err) {
                console.log('파일 부분 쓰기 완료 : %d, 파일 크기 : %d', curLength, fileLength);
            });

            if (curLength >= fileLength) {
                res.end();
            }
        }
    });

    infile.pipe(res);
});