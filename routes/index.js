
/*
 * GET home page.
 */

var walk = require('walkdir');
var imagesPath = '/misc/nas_photos';

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
    } else if (stat.isFile()) {
      items[dir].push({ 'url': '/images/nas/' + relativePath, 'name': name });
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

