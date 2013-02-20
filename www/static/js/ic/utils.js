(function() {
  var utils = {};

  function xhr(method, url, deferred) {
    var req = new XMLHttpRequest();
    req.open(method, url);
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
    req.addEventListener('load', function() {
      deferred.resolve(req);
    });

    req.addEventListener('error', function() {
      deferred.reject(req);
    });

    return req;
  }

  utils.get = function(url) {
    var deferred = Q.defer();
    var req = xhr('get', url, deferred);

    req.send();
    return deferred.promise;
  };

  utils.post = function(url, data) {
    var deferred = Q.defer();
    var req = xhr('post', url, deferred);
    var formData = new FormData();

    for (var key in data) {
      formData.append(key, data[key]);
    }

    req.send(formData);
    return deferred.promise;
  };

  utils.getJson = function(url) {
    return utils.get(url).then(function(req) {
      return JSON.parse(req.responseText);
    });
  };

  ic.utils = utils;
}());