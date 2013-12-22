var conf = require('nconf');
var path = require('path');

conf.argv().env().file({ file: path.join(process.env.HOME, '.config/photos.json') });
conf.defaults({
  photosPath: path.join(process.env.HOME, 'Pictures')
});

module.exports = conf;
