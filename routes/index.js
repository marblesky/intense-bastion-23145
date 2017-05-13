var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var cookie =req.cookies;
  if(cookie==undefined){
    var str = '？？'
  }else{
    var str=cookie.str
  }
  res.render('index',
      {
        title: 'Express',
        msg: "こんにちは、" + str + "さん！" ,
        input: str
      }
  );
});


router.post('/', function(req, res, next) {
var cookie =req.cookieParser;
  if(cookie==undefined){
    var str = '？？'
  }else{
    var str=cookie.str
  }
var str = req.body['text1'];
res.cookie("str",str,{maxAge:600000});
    res.render('index',
        {
            title: 'Express',
            msg: "こんにちは、" + str + "さん！",
            input: str
        }
    );
});

module.exports = router;
