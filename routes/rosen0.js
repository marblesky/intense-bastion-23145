var express = require('express');
var app = express();
var router = express.Router();
var model = require('../lib/mongomodel.js');
//var Ensen = model.Ensen;
var Ensen2 = model.Ensen2;


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
  if (req.session.user) {
      var UserName=req.session.user;
  } else {
    res.redirect('/login');
  }




  Ensen2.find({}, function(err, rows) {
    if (err) throw err;
//    console.log(rows[0].ENSENEKI_CD);
    res.render('rosen0', {
      title: '日本の駅一覧',
      msg: "こんにちは、" + UserName.name + "さん！",
      boardList: rows
    });
  });

});

module.exports = router;
