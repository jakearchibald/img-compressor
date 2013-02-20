(function() {
  var el = document.querySelector('.webp-options-view');
  el.parentNode.removeChild(el);

  function WebpOptions() {
    var webpOptions = this;

    this.el = el.cloneNode(true);
    this.qualityRange = this.$('.quality');
    this.qualitySetting = this.$('.quality-setting');
    this.opts = null;

    function qualitySettingUpdate() {
      webpOptions.qualitySetting.textContent = webpOptions.qualityRange.value;
    }

    this.qualityRange.addEventListener('change', function() {
      webpOptions.updateQualityLabel_();
      webpOptions.formChange_();
    });

    this.buildOpts_();
    this.updateQualityLabel_();
  }

  var WebpOptionsProto = WebpOptions.prototype = Object.create(ic.views.View.prototype);

  WebpOptionsProto.buildOpts_ = function() {
    this.opts = {
      q: Number(this.qualityRange.value)
    };
  };

  WebpOptionsProto.formChange_ = ic.utils.debounce(function() {
    this.buildOpts_();
    this.trigger('optionsChange');
  }, 100);

  WebpOptionsProto.updateQualityLabel_ = function() {
    this.qualitySetting.textContent = this.qualityRange.value;
  };

  ic.views.WebpOptions = WebpOptions;
})();