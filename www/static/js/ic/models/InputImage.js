(function() {
  function InputImage() {
    this.image = null;
    this.id = null;
    this.uploadDeferred = null;
  }

  var InputImageProto = InputImage.prototype;

  InputImageProto.upload = function(image) {
    var inputImage = this;
    this.image = image;
    debugger;
    this.uploadDeferred = ic.utils.post('/compress/upload', {
      image: image
    }).then(function(request) {
      inputImage.id = JSON.parse(request.responseText).id;
      return this;
    });

    return this.uploadDeferred;
  };

  ic.models.InputImage = InputImage;
})();