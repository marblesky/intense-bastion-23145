var express = require('express');
var app = express();
var mongo = require('mongodb');

switch (app.get('env')) {
case 'dev':
case 'stg':
case 'prd':
      var vhost= '10.2.102.34';
      var vuser= 'DATAmanager';
      var vpassword= 'datamgr';
      var vdatabase= '212';
break;
case 'hrk':
      var vhost= 'ds151951.mlab.com:51951';
      var vuser= 'heroku_1mn41j63';
      var vpassword= 'pl3f893n059nahmtr7vb15tlik';
      var vdatabase= 'heroku_1mn41j63';
break;
default:
      var vhost= '10.2.102.212';
      var vuser= 'DATAmanager';
      var vpassword= 'datamgr';
      var vdatabase= '212';
break;
}


var dbConfig = {
      host: vhost,
      user: vuser,
      password: vpassword,
      database: vdatabase
};

// Modelでもmongooseを読み込みます
var mongoose = require( 'mongoose' );

// MongoDBに接続

var mURI = 'mongodb://' + vuser ':' + vpassword +'@' + vhost +'/heroku_1mn41j63';
mongoose.connect(mURI);

// 接続イベントを利用してログ出力
mongoose.connection.on('connected', function () {
  console.log('mongoose URI locates ' + mURI);
});

// スキーマの定義とEngineerモデルの作成
var engineerSchema = new mongoose.Schema({
  name: String,
  created: { type: Date, default: Date.now },
});
mongoose.model( 'ENSENEKI_TBL', engineerSchema );

// var connection = mysql.createConnection(dbConfig);
//
// module.exports = connection;
