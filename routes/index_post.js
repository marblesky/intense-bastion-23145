exports.index=function(req,res){
  res.render('index',{
    title:'EXPRESS',
    msg:'こんにちは、'+req.body.text1+'さん！'
  });
};
