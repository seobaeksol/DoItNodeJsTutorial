// Express 기본 모듈 불러오기
var express = require('express'),
    http = require('http'),
    path = require('path');

// Express 미들웨어 불러오기
var bodyParser = require('body-parser'),
    static = require('serve-static');

var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser');

// 익스프레스 객체 생성
var app = express();

var router = express.Router();

var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 applicaiton/json 파싱
app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname, 'public')));

app.use(cookieParser());

router.route('/process/login').post(function(req, res) {
    console.log('/process/login 처리함');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id : ' + paramId + '</p></div>');
    res.write('<div><p>ParamPassword : ' + paramPassword + '</p></div>');
    res.write("<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
    res.end();
})

router.route('/process/users/:id').get(function(req, res) {
    console.log('/progress/users/:id 처리함');

    var paramId = req.params.id;

    console.log('/process/users와 토큰 %s를 이용해 처리함', paramId);

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param Id : ' + paramId + '</p></div>');
    res.end();
});

router.route('/process/setUserCookie').get(function(req, res) {
    console.log('/process/setUserCookie 호출됨');

    res.cookie('user', {
        id: 'mike',
        name: '소녀시대',
        authorized: true
    });

    res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function(req, res) {
    console.log('/process/showCookie is called');

    res.send(req.cookies);
})

app.use('/', router);

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function() {
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});