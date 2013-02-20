(function() {
  var el = document.querySelector('.webp-options-view');
  el.parentNode.removeChild(el);

  function WebpOptions() {
    var webpOptions = this;

    this.el = el.cloneNode(true);
    this.qualityRange = this.$('.quality');

    this.qualityRange.addEventListener('change', function() {
      webpOptions.trigger('optionsChange', {
        q: Number(webpOptions.qualityRange.value)
      });
    });
  }

  var WebpOptionsProto = WebpOptions.prototype = Object.create(ic.views.View.prototype);

  ic.views.WebpOptions = WebpOptions;
})();