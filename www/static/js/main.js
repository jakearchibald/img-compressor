function MainCtrl($scope) {
  var webpCompressor = new ic.models.WebpCompressor();

  $scope.compressors = [
    new ic.models.NullCompressor(),
    webpCompressor
  ];

  console.log($scope.compressors);
}