var express = require('express');
var app = express();

app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});

app.listen(4000);
console.log('Listening on port 4000');