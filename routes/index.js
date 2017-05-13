var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.user) {
    var UserName=req.session.user;
    res.render('index',
        {
          title: 'Express',
          msg: "こんにちは、" + UserName.name + "さん！"
        });
  } else {
    res.redirect('/login');
  }
});


module.exports = router;
