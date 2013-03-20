(function() {
  var imageInputView = new ic.views.ImageInput();
  var imageOutputView = new ic.views.ImageOutput();
  var webpOptionsView = new ic.views.WebpOptions();
  var jpegOptionsView = new ic.views.JpegOptions();
  var imageStatsView = new ic.views.ImageStats();
  var inputImageModel = new ic.models.InputImage();
  var webpCompressor = new ic.models.WebpCompressor();
  var jpegCompressor = new ic.models.JpegCompressor();


  webpCompressor.input = inputImageModel;
  jpegCompressor.input = inputImageModel;

  imageInputView.appendTo(document.body);
  imageOutputView.appendTo(document.body);
  imageStatsView.appendTo(document.body);
  webpOptionsView.appendTo(document.body);
  //jpegOptionsView.appendTo(document.body);

  function updateImagePreview() {
    webpCompressor.opts = webpOptionsView.opts;
    webpCompressor.compress();
    return webpCompressor.outputImage().then(function(img) {
      imageOutputView.showImage(img);
      imageStatsView.update(webpCompressor.output);
    });
  }

  /*function updateImagePreview() {
    jpegCompressor.opts = jpegOptionsView.opts;
    jpegCompressor.compress();
    return jpegCompressor.outputImage().then(function(img) {
      imageOutputView.showImage(img);
      imageStatsView.update(jpegCompressor.output);
    });
  }*/

  imageInputView.on('imageChange', function(file) {
    inputImageModel.upload(file).then(updateImagePreview);
  });

  webpOptionsView.on('optionsChange', updateImagePreview);
  jpegOptionsView.on('optionsChange', updateImagePreview);
}());