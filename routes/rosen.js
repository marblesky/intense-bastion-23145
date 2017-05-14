var express = require('express');
var app = express();
var router = express.Router();
var connection=require("../lib/mysqlConnection.js");

switch (app.get('env')) {
case 'dev':
case 'stg':
case 'prd':
      var scm= 'bkn_master';
break;
case 'hrk':
      var scm= 'heroku_9e23a2e7e50daa9';
break;
default:
      var scm= 'bkn_master';
break;
}

router.get('/', function(req, res, next) {
  var query = 'SELECT * from ' + scm + '.沿線駅マスタ order by 沿線駅コード';
  connection.query(query, function(err, rows) {
    res.render('rosen', {
      title: '日本の駅一覧',
      boardList: rows
    });
  });
});

module.exports = router;
