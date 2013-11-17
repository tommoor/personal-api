var _ = require('underscore');
var plugins = require('./plugins.js');

module.exports = {
    fetchAll: function() {
        
        plugins.getInstalled(function(err, plugins){
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
            console.log('Could not load plugin ' + plugin, e);
        }
        
        try {
            service.fetch(module.exports.save);
        } catch(e) {
            console.log('Error fetching data from plugin', e);
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