const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(__dirname+"/public"));//静态文件
app.get('/getInfo',function(req,res){
  res.json({
    ok: 1,
    msg:'登录'
  })
})


app.listen(8089, function(){
  console.log('success');
})