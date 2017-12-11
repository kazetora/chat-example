var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use('/log', express.static('/logs'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var today = new Date();
var todaystr = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

today = today.getFullYew
var log_rotate = function(){
    var date = new Date();
    var datestr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    if(datestr !== todaystr){
        todaystr = datestr;
        var exec = require('child-process').exec;
              
        var cmd = '/bin/cp /logs/app.log /logs/app.log-' + todaystr;
        var logrotate = exec(cmd, function(err, stdout, stderr){
            setTimeout(log_rotate, 1000); 
        }
    }
    else{
       setTimeout(log_rotate, 1000);
    }
    
}

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
  log_rotate();
});
