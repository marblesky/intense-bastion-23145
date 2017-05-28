var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

switch (app.get('env')) {
case 'dev':
    // MongoDBへの接続
    mongoose.connect('mongodb://loaclhost:27017/test');
break;
case 'stg':
case 'prd':
    // MongoDBへの接続
    mongoose.connect('mongodb://10.2.102.34:27017/test');
break;
case 'hrk':
    // MongoDBへの接続
    mongoose.connect('mongodb://heroku_1mn41j63:pl3f893n059nahmtr7vb15tlik@ds151951.mlab.com:51951/heroku_1mn41j63');
break;
default:
case 'dev':
    // MongoDBへの接続
    mongoose.connect('mongodb://loaclhost:27017/test');
break;
}


// スキーマ
var ENSENEKI_TBL = new Schema({
  _id: Number,
  ENSENEKI_CD : String,
  KEN_CD : String,
  SYZ_CD1 : String,
  KEN_ENSENEKI_CD : String,
  ENSEN_CD : String,
  ENSEN_NM : String,
  EKI_CD : String,
  EKI_NM : String
});


mongoose.connection.on( 'connected', function(){
    console.log('connected.');
});

mongoose.connection.on( 'error', function(err){
    console.log( 'failed to connect a mongo db : ' + err );
});


// スキーマからモデルをコンパイルし、モデルをエクスポートする
exports.Ensen = mongoose.model('ENSENEKI_TBL', ENSENEKI_TBL);
