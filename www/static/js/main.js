(function() {
  var imageInputView = new ic.views.ImageInput();
  var inputImageModel = new ic.models.InputImage();

  imageInputView.appendTo(document.body);

  imageInputView.on('imageChange', function(file) {
    inputImageModel.upload(file).then(function() {
      console.log('Done!');
    });
  });
}());