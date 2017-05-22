var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var UserName=req.session.user;
    res.render('index',
        {
          title: 'Express',
          msg: "こんにちは、" + UserName.name + "さん！"
        });
  }
});

module.exports = router;
