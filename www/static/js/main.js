(function() {
  var imageInputView = new ic.views.ImageInput();
  var imageOutputView = new ic.views.ImageOutput();
  var webpOptionsView = new ic.views.WebpOptions();
  var inputImageModel = new ic.models.InputImage();
  var webpCompressor = new ic.models.WebpCompressor();

  webpCompressor.input = inputImageModel;

  imageInputView.appendTo(document.body);
  webpOptionsView.appendTo(document.body);
  imageOutputView.appendTo(document.body);

  imageInputView.on('imageChange', function(file) {
    inputImageModel.upload(file).then(function() {
      webpCompressor.compress();
      return webpCompressor.outputImage();
    }).then(function(img) {
      imageOutputView.showImage(img);
    });
  });

  webpOptionsView.on('optionsChange', function(opts) {
    webpCompressor.opts = opts;
    webpCompressor.compress();
    webpCompressor.outputImage().then(function(img) {
      imageOutputView.showImage(img);
    });
  });
}());