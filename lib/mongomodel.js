var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

switch (app.get('env')) {
case 'dev':
    // MongoDBへの接続
    mongoose.connect('mongodb://localhost:27017/test');
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
    // MongoDBへの接続
    mongoose.connect('mongodb://localhost:27017/test');
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

// スキーマ
var en2 = new Schema({
  _id: Number,
  沿線駅コード : String,
  都道府県コード : String,
  市区郡コード : String,
  検沿線駅コード : String,
  沿線コード : String,
  沿線名 : String,
  駅コード : String,
  駅名 : String
});



mongoose.connection.on( 'connected', function(){
    console.log('connected.');
});

mongoose.connection.on( 'error', function(err){
    console.log( 'failed to connect a mongo db : ' + err );
});


// スキーマからモデルをコンパイルし、モデルをエクスポートする
exports.Ensen = mongoose.model('ENSENEKI_TBL', ENSENEKI_TBL);
exports.Ensen2 = mongoose.model('沿線駅マスタ', en2);
