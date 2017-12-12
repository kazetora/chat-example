var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var fs = require('fs');
log_file = fs.createWriteStream(__dirname + '/logs/lora.log', {flags: 'w'});

app.use('/log', express.static('logs'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var today = new Date();
var todaystr = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

today = today.getFullYew
var log_rotate = function(){
    //log_file.once("drain", function(){
    //    console.log("write to file");
    //});
    var date = new Date();
    var datestr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    if(datestr !== todaystr){
        log_file.end();
        var exec = require('child_process').exec;
              
        var cmd = '/bin/mv ./logs/lora.log ./logs/lora-' + todaystr + '.log';
        todaystr = datestr;
        var logrotate = exec(cmd, function(err, stdout, stderr){
            log_file = fs.createWriteStream(__dirname + '/logs/lora.log', {flags: 'w'});
            setTimeout(log_rotate, 1000); 
        });
    }
    else{
       setTimeout(log_rotate, 1000);
    }
    
}

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
    log_file.write(msg + "\n"); 
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
  log_rotate();
});
