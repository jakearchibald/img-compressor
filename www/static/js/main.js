(function() {
  var imageInputView = new ic.views.ImageInput();
  var imageOutputView = new ic.views.ImageOutput();
  var webpOptionsView = new ic.views.WebpOptions();
  var imageStatsView = new ic.views.ImageStats();
  var inputImageModel = new ic.models.InputImage();
  var webpCompressor = new ic.models.WebpCompressor();


  webpCompressor.input = inputImageModel;

  imageInputView.appendTo(document.body);
  webpOptionsView.appendTo(document.body);
  imageOutputView.appendTo(document.body);
  imageStatsView.appendTo(document.body);

  function updateImagePreview() {
    webpCompressor.opts = webpOptionsView.opts;
    webpCompressor.compress();
    return webpCompressor.outputImage().then(function(img) {
      imageOutputView.showImage(img);
      imageStatsView.update(webpCompressor.output);
    });
  }

  imageInputView.on('imageChange', function(file) {
    inputImageModel.upload(file).then(updateImagePreview);
  });

  webpOptionsView.on('optionsChange', updateImagePreview);
}());