var express = require('express');
var exphbs  = require('express3-handlebars');
var fs = require('fs');
var _ = require('underscore');
var plugins = require('./plugins.js');
var app = express();
var cronJob = require('cron').CronJob;
var background = require('./background');
var port = 4000;

// background data fetching
//var job = new cronJob('* * * * * *', background.fetchAll, null, true);

// UI
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', function(req, res){
    
    fs.exists('config.js', function(err, exists){
        
        if (exists) {
            res.redirect('/install');
        } else {
            res.redirect('/setup');
        }
    });
});

app.get('/install', function(req, res){
    res.render('install');
});

app.post('/install', function(req, res){
    
    // test database config
    var pg = require('pg');
    var client = new pg.Client(req.body);
    
    client.connect(function(err) {
      if (err) {
         return console.error('could not connect to postgres', err);
      }
      
      // write our db config file
      fs.writeFile('config.js', 'module.exports='+JSON.stringify(req.body), function(err, written){
          console.log('config written');
      });
    });
    
    res.render('install');
});

app.get('/setup', function(req, res){
    
    plugins.getInstalled(function(err, response){
        response = _.map(response, function(name){
            return {id: name, plugin: require(name)}
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