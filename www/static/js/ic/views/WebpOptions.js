(function() {
  var el = document.querySelector('.webp-options-view');
  el.parentNode.removeChild(el);

  function WebpOptions() {
    var webpOptions = this;

    this.el = el.cloneNode(true);
    this.qualityRange = this.$('.quality');
    this.opts = null;

    var formChange = ic.utils.debounce(function() {
      webpOptions.buildOpts_();
      webpOptions.trigger('optionsChange');
    }, 100);

    this.qualityRange.addEventListener('change', formChange);
    this.buildOpts_();
  }

  var WebpOptionsProto = WebpOptions.prototype = Object.create(ic.views.View.prototype);

  WebpOptionsProto.buildOpts_ = function() {
    this.opts = {
      q: Number(this.qualityRange.value)
    };
  };

  ic.views.WebpOptions = WebpOptions;
})();