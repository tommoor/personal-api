var pluginPattern = /^personal\-api/;

module.exports = {
    getInstalled: function(cb) {
        require('child_process').exec('npm ls -g --json', function(err, stdout, stderr) {
            if (err) return cb(err);
            var packages = JSON.parse(stdout);
            var filtered = [];
        
            // filter out npm modules to those that begin with personal-api
            for(key in packages['dependencies']) {
                if (key.match(pluginPattern)) {
                    filtered.push(key);
                }
            }
        
            cb(null, filtered);
        });
    }
};