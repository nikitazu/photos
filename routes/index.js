
/*
 * GET home page.
 */

var walk = require('walkdir');
var conf = require('../config');
var imagesPath = conf.get('photosPath');
console.log('path to photos: ' + imagesPath);

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
}

String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};

exports.index = function(req, res){
  var items = {};
  walk.sync(imagesPath, function(path, stat) {
    var relativePath = path.substring(imagesPath.length + 1);
    var parts = relativePath.split('/');
    var name = parts[parts.length - 1];
    
    if (isHidden(parts)) { return; }
    
    var dir = parts.slice(0, parts.length - 1).join('/');

    if (stat.isDirectory()) {
      items[relativePath] = [];
    } else if (stat.isFile() && dir !== '') {
      if (isPicture(name)) {
        items[dir].push({ 'url': '/images/nas/' + relativePath, 'name': name });
      }
    }
  });
  res.render('index', {
    title: 'My Photos',
    photos_root:  'images',
    photos: items
  });
};

function isHidden(pathParts) {
  for (var i = 0; i < pathParts.length - 1; i++) {
    if (pathParts[i].substring(0, 1) === '.') {
      return true;
    }
  }
  return false;
}

function isPicture(path) {
  return path.endsWith('.png') || path.endsWith('.jpg');
}