var _ = require('underscore');

var getInstalledPlugins = function(cb) {
    require('child_process').exec('npm ls -g --json', function(err, stdout, stderr) {
        if (err) return cb(err);
        var packages = JSON.parse(stdout);
        var filtered = [];
        
        // filter out npm modules to those that begin with personal-api
        for(key in packages['dependencies']) {
            if (key.match(/^personal\-api/)) {
                filtered.push(key);
            }
        }
        
        cb(null, filtered);
    });
};
    
module.exports = {
    fetchAll: function() {
        
        getInstalledPlugins(function(err, plugins){
            _.each(plugins, function(plugin){
                module.exports.fetch(plugin);
            });
        });
    },
    
    fetch: function(plugin) {
        // check if plugin has credentials saved
        try {
            var service = require(plugin);
        } catch(e) {
            console.log(plugin + ' appears to be malformed', e);
        }
        
        try {
            service.fetch(module.exports.save);
        } catch(e) {
            console.log(plugin + ' error fetching data', e);
        }
    },
    
    save: function(response) {
        // response should be formatted in this format:
        /*
        {
            label: 'Steps',
            values: [
                [date, value]
            ]
        }
        */
        
        response.forEach(function(thing){
            // do we have a doc for this?
            // save values
        });
        
    }
};