(function() {
  var el = document.querySelector('.image-stats-view');
  el.parentNode.removeChild(el);

  function ImageStats() {
    var webpOptions = this;

    this.el = el.cloneNode(true);
    this.size = this.$('.size');
  }

  var ImageStatsProto = ImageStats.prototype = Object.create(ic.views.View.prototype);

  ImageStatsProto.update = function(imageBlob) {
    this.size.textContent = imageBlob.size;
  };

  ic.views.ImageStats = ImageStats;
})();