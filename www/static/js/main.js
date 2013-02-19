function MainCtrl($scope) {
  $scope.compressors = [
    new ic.models.Compressor('none'),
    new ic.models.Compressor('WebP')
  ];
}