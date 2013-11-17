var express = require('express');
var exphbs  = require('express3-handlebars');
var _ = require('underscore');
var plugins = require('./plugins.js');
var app = express();
var cronJob = require('cron').CronJob;
var background = require('./background');
var port = 5000;

// background data fetching
var job = new cronJob('* * * * * *', background.fetchAll, null, true);

// UI
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/setup', function(req, res){
    plugins.getInstalled(function(err, response){
        
        response = _.map(response, function(name){
            return {
                id: name,
                plugin: require(name)
            }
        });
        
        res.render('setup', {
            plugins: response
        });
    });
});

app.post('/setup', function(req, res){
    
});

// errors
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.listen(port);
console.log('Listening on port ' + port);