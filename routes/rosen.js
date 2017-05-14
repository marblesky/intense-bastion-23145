var express = require('express');
var router = express.Router();
var connection=require("../lib/mysqlConnection.js");

router.get('/', function(req, res, next) {
  var query = 'SELECT * from bkn_master.沿線駅マスタ order by 沿線駅コード';
  connection.query(query, function(err, rows) {
    res.render('rosen', {
      title: '日本の駅一覧',
      boardList: rows
    });
  });
});

module.exports = router;
