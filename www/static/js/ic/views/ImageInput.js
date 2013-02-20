(function() {
  var el = document.querySelector('.image-input-view');
  el.parentNode.removeChild(el);

  function ImageInput() {
    var imageInput = this;

    this.el = el.cloneNode(true);
    this.imgInput = this.$('.upload-input');

    this.imgInput.addEventListener('change', function() {
      var file = this.files[0];
      imageInput.trigger('imageChange', file);
    });
  }

  var ImageInputProto = ImageInput.prototype = Object.create(ic.views.View.prototype);

  ic.views.ImageInput = ImageInput;
})();