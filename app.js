var express = require('express');
var app = express();
var cronJob = require('cron').CronJob;
var background = require('./background');
var port = 5000;

// background data fetching
var job = new cronJob('* * * * * *', background.fetchAll, null, true);

// UI
app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});


app.listen(port);
console.log('Listening on port ' + port);