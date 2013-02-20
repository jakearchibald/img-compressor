(function() {
  var el = document.querySelector('.image-output-view');
  el.parentNode.removeChild(el);

  function ImageOutput() {
    this.el = el.cloneNode(true);
    this.canvas = this.$('.preview');
    this.context = this.canvas.getContext('2d');
  }

  var ImageOutputProto = ImageOutput.prototype = Object.create(ic.views.View.prototype);

  ImageOutputProto.showImage = function(img) {
    this.canvas.width = img.width;
    this.canvas.height = img.height;
    this.context.drawImage(img, 0, 0);
  };

  ic.views.ImageOutput = ImageOutput;
})();