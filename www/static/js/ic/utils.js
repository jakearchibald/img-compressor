(function() {
  var utils = {};

  function xhr(method, url, opts) {
    opts = utils.extend({
      responseType: ''
    }, opts);

    var req = new XMLHttpRequest();
    var deferred = Q.defer();
    req.open(method, url);
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
    req.responseType = opts.responseType;

    req.addEventListener('load', function() {
      deferred.resolve(req);
    });

    req.addEventListener('error', function() {
      deferred.reject(req);
    });

    req.promise = deferred.promise;

    return req;
  }

  utils.extend = function(obj, otherObj) {
    otherObj = otherObj || {};

    Object.getOwnPropertyNames(otherObj).forEach(function(val) {
      obj[val] = otherObj[val];
    });

    return obj;
  };

  utils.get = function(url, opts) {
    var req = xhr('get', url, opts);

    req.send();
    return req;
  };

  utils.post = function(url, data, opts) {
    var req = xhr('post', url, opts);
    var formData = new FormData();

    for (var key in data) {
      formData.append(key, data[key]);
    }

    req.send(formData);
    return req;
  };

  utils.getJson = function(url) {
    return utils.get(url).then(function(req) {
      return JSON.parse(req.responseText);
    });
  };

  utils.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  ic.utils = utils;
}());