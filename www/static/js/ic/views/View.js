(function() {
  function View() {
    
  }

  var ViewProto = View.prototype = Object.create(ic.EventEmitter.prototype);

  ViewProto.appendTo = function(destination) {
    if (typeof destination == 'string') {
      document.querySelector(destination).appendChild(this.el);
    }
    else {
      destination.appendChild(this.el);
    }
    return this;
  };

  ViewProto.$ = function(selector) {
    return this.el.querySelector(selector);
  };

  ic.views.View = View;
})();
