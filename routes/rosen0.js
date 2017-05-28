var express = require('express');
var app = express();
var router = express.Router();
var model = require('../lib/mongomodel.js');
var Ensen = model.Ensen;



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


  // var mongoose = require('mongoose');
  // var Schema = mongoose.Schema;
  //
  // // スキーマ定義
  // var ENSENEKI_TBL = Schema({
  //   _id: Number,
  //   ENSENEKI_CD : String,
  //   KEN_CD : String,
  //   SYZ_CD1 : String,
  //   KEN_ENSENEKI_CD : String,
  //   ENSEN_CD : String,
  //   ENSEN_NM : String,
  //   EKI_CD : String,
  //   EKI_NM : String
  // });
  //
  // // モデルとして登録
  // var Ensen = mongoose.model('ENSENEKI_TBL', ENSENEKI_TBL);
  //
  // // mongodbに接続
  // mongoose.connect('mongodb://localhost:27017/test', // memoの部分はデータベース名
  //   // コールバックでエラー時の処理が書けるみたい。
  //   function(err) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('connection success!');
  //     }
  //   }
  // );
  //
  // // findしてコンソールに出力
  // Ensen.find({}, function(err, docs) {
  //   if(!err) {
  //     console.log("num of item => " + docs.length)
  //     for (var i = 0; i < docs.length; i++ ) {
  //       console.log(docs[i]);
  //     }
  //     mongoose.disconnect()  // mongodbへの接続を切断
  //     process.exit()         // node.js終了
  //   } else {
  //     console.log("find error")
  //   }
  // });



  Ensen.find({}, function(err, rows) {
    if (err) throw err;
    console.log(rows[0].ENSENEKI_CD);
    res.render('rosen0', {
      title: '日本の駅一覧',
      msg: "こんにちは、" + UserName.name + "さん！",
      boardList: rows
    });
  });

});

module.exports = router;
