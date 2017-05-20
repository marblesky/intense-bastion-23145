var express = require('express');
var router = express.Router();
var connection=require("../lib/mysqlConnection.js");
var app = express();

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
  // ここではユーザ名の有無判断のみ行っている
  // パスワード認証の場合はユーザ名、パスワードの有無判断に加えて
  // データストア(DBなど)内の存在チェックを合わせて行う
  if(req.body.userName) {
    // セッションへの格納処理
    // ここでは入力されたユーザ名だけだが、処理要件に応じて
    // DBから取得した値など（ユーザごとの設定値とか）を格納する

		switch (app.get('env')) {
		case 'dev':
		case 'stg':
		case 'prd':
		      var vsql= 'select * from jinji.社員マスタ where 社員コード=\'aaaa\'';
		break;
		case 'hrk':
		      var vsql= 'SELECT * FROM mailtbl where name=\''+{name: req.body.userName}+'\'';
		break;
		default:
		      var vsql= 'select * from jinji.社員マスタ where 社員コード=\'aaaa\'';
		break;
		}
		//   var query = vsql;
		//   connection.query(query, function(err, rows) {
		//         if (rows[0].name=={name: req.body.userName}) {
		            req.session.user = {name: req.body.userName};
		            res.redirect('../');
		  //       }else{
		  //           var err = '入力が正しくありません。確認して再入力してください。';
		  //           res.render('login', {error: err});
		  //       }
		  //  });
    //いままでのもの
    //req.session.user = {name: req.body.userName};
    //res.redirect('../');
  } else {
    var err = '入力が正しくありません。確認して再入力してください。';
    res.render('login', {error: err});
  }
});

module.exports = router;
