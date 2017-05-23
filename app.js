var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session =require('express-session');
var FileStreamRotator = require('file-stream-rotator');
require('date-utils'); //日付系

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var rosen = require('./routes/rosen');

var app = express();

//if ('dev' == app.get('env')) {
//   app.use(logger('dev'));
//}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//ミドルウエア app.use
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));


//ログ出力
var logDirectory = __dirname + '/logs'
    // ディレクトリがなければ作成する
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
    // write streamをローテーションする設定
    var accessLogStream = FileStreamRotator.getStream({
      filename: logDirectory + '/access-%DATE%.log',
      frequency: 'daily',
      verbose: false,
      date_format: "YYYY-MM-DD"
    });
    // 今回はcombinedで出力
    //:remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
    //app.use(morgan(':id :method :url :response-time'))
    //app.use(logger(':remote-addr :remote-user :date[iso] :method :url :http-version :statu :res[content-length] :referrer :user-agent', {stream: accessLogStream}));

    var dt = new Date();
    var mydate = dt.toFormat("YYYY/MM/DD HH24:MI:SS");

    logger.token('mydate', function(req, res) {
      return mydate;
    });

    //app.use(logger(':remote-addr :remote-user :mydate :method :url :http-version :status :res[content-length] :referrer :user-agent', {stream: accessLogStream}));

   // 出力する(dev環境・stg環境・prd環境は出力する。hrk環境は出力しない)
    if ('dev' === app.get('env')) {
        app.use(logger(':remote-addr :remote-user :mydate :method :url :http-version :status :res[content-length] :referrer :user-agent', {stream: accessLogStream}));
    } else if ('stg' === app.get('env')) {
        app.use(logger(':remote-addr :remote-user :mydate :method :url :http-version :status :res[content-length] :referrer :user-agent', {stream: accessLogStream}));
    } else if ('prd' === app.get('env')) {
        app.use(logger(':remote-addr :remote-user :mydate :method :url :http-version :status :res[content-length] :referrer :user-agent', {stream: accessLogStream}));
    } else {

    }

// セッションの利用
    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 1000 //30min
      }
    }));

    // セッションチェック処理
    var sessionCheck = function(req, res, next) {
      if (req.session.user) {
        next();
      } else {
        res.redirect('/login');
      }
    };



// app.use(cookieParser('secret','mycom_sercred_key'));
// app.use(session({key:'session_id'}));

app.use('/login', login);
app.use('/', sessionCheck,index);  // sessionCheckを前処理に追加
app.use('/users', users);
app.use('/rosen', rosen);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
