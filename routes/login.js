var express = require('express');
var router = express.Router();
var connection=require("../lib/mysqlConnection.js");
var app = express();

switch (app.get('env')) {
case 'dev':
case 'stg':
case 'prd':
      var viewmode='1'; //社内用モード
      var vtxttitle='担当者コード'; //社内用モード
break;
case 'hrk':
      var viewmode='2'; //heroku用モード
      var vtxttitle='名前'; //社内用モード

break;
default:
      var viewmode='1'; //社内用モード
      var vtxttitle='担当者コード'; //社内用モード
break;
}

router.get('/', function(req, res, next) {
  res.render('login',{
                        title: 'Express',
                        txttitle: "担当者コード",
                        msg: "担当者コードを入力してください"
                      });
});

// --
router.post('/', function(req, res, next) {
  if(req.body.userName) {
        if(viewmode=='1'){
          var query = 'select * from jinji.社員マスタ where 社員コード=\''+req.body.userName+'\'';
        }else{
          var query = 'SELECT * FROM mailtbl where name=\''+ req.body.userName +'\'';
        }

        connection.query(query, function(err, rows) {
            console.log(query);
              if(viewmode==='1' && rows[0].社員コード === req.body.userName){
                req.session.user = {name: rows[0].社員名称};
                console.log(rows[0].社員名称);
                res.redirect('../');
              }else if(viewmode==='2'){
                req.session.user = {name: req.body.userName};
                console.log(viewmode);
                //console.log(viewmode);
                res.redirect('../');
              } else {
                var err = '入力が正しくありません。確認して再入力してください。';
                //console.log(viewmode);
                res.render('login', {error: err});

              }
        });
//--
          // req.session.user = {name: req.body.userName};
          // res.redirect('../');
  } else {
    var err = '入力が正しくありません。確認して再入力してください。';
    res.render('login', {error: err});
  }
});

module.exports = router;
