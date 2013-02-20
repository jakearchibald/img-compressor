(function() {
  var el = document.querySelector('.webp-options-view');
  el.parentNode.removeChild(el);

  function WebpOptions() {
    var webpOptions = this;

    this.el = el.cloneNode(true);
    this.qualityRange_ = this.$('.quality');
    this.qualitySetting_ = this.$('.quality-setting');
    this.alphaQualityRange_ = this.$('.alpha-quality');
    this.alphaQualitySetting_ = this.$('.alpha-quality-setting');
    this.opts = null;

    this.qualityRange_.addEventListener('change', function() {
      webpOptions.updateQualityLabel_();
      webpOptions.formChange_();
    });

    this.alphaQualityRange_.addEventListener('change', function() {
      webpOptions.updateAlphaQualityLabel_();
      webpOptions.formChange_();
    });

    this.buildOpts_();
    this.updateQualityLabel_();
    this.updateAlphaQualityLabel_();
  }

  var WebpOptionsProto = WebpOptions.prototype = Object.create(ic.views.View.prototype);

  WebpOptionsProto.buildOpts_ = function() {
    var opts = {};
    var q = this.qualityRange_.value;
    var alpha_q = this.alphaQualityRange_.value;

    if (q == 101) {
      opts.lossless = 1;
    }
    else {
      opts.q = q;
    }

    if (alpha_q !== undefined) {
      opts.alpha_q = alpha_q;
    }

    this.opts = opts;
  };

  WebpOptionsProto.formChange_ = ic.utils.debounce(function() {
    this.buildOpts_();
    this.trigger('optionsChange');
  }, 100);

  WebpOptionsProto.updateQualityLabel_ = function() {
    var val = Number(this.qualityRange_.value);

    if (val == 101) {
      this.qualitySetting_.textContent = "Lossless";
    }
    else {
      this.qualitySetting_.textContent = val;
    }
  };

  WebpOptionsProto.updateAlphaQualityLabel_ = function() {
    var val = Number(this.alphaQualityRange_.value);

    if (val == 100) {
      this.alphaQualitySetting_.textContent = "Lossless";
    }
    else {
      this.alphaQualitySetting_.textContent = val;
    }
  };

  ic.views.WebpOptions = WebpOptions;
})();