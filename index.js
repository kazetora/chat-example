var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var mongo = require('mongoskin');
var db = mongo.db("mongodb://ec2-18-182-22-117.ap-northeast-1.compute.amazonaws.com:27017/nakaolab-db", {native_parser: true});

//app.get('/', function(req, res){
//  res.sendFile(__dirname + '/index.html');
//});

io.on('connection', function(socket){
  socket.on('data', function(msg){
    console.log(msg);
    db.collection("test").insert(JSON.parse(msg), function(err, result) {
        if(err){
            console.error(err);
        }
    });
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});


