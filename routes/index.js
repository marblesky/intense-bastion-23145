var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    msg: 'こんにちは！'
 });
});

router.post('/', function(req, res, next) {
var str = req.body['text1'];
    res.render('index',
        {
            title: 'Express',
            msg: "こんにちは、" + str + "さん！",
            input: str
        }
    );
});

module.exports = router;
