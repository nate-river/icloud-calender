var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.static('public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/picture:time',function(req,res){
  var r = Math.floor( Math.random()*8 ) + 10;
  res.json( [ {src:'./images/IMG_23'+r+'.JPG'} ] );
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
