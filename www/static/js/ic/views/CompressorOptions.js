(function() {
  function CompressorOptions() {
    this.opts = null;
    this.buildOpts_();
  }

  var CompressorOptionsProto = CompressorOptions.prototype = Object.create(ic.views.View.prototype);

  CompressorOptionsProto.buildOpts_ = function() {
    var opts = {};

    this.optsSpec_.forEach(function(spec) {
      var field = spec.field;
      var transform = spec.valueTransform;
      var val = spec.cast(field.value);

      if (transform) {
        val = transform(val);
      }

      if (val !== undefined) {
        opts[spec.opt] = val;
      }
    });

    this.opts = opts;
  };

  CompressorOptionsProto.addOpt_ = function(params) {
    var compressorOptions = this;

    params = ic.utils.extend({
      field: null,           // the form field
      cast: Number,          // cast the value from the field
      opt: '',               // target property in the opts object
      outputEl: null,        // element to show the current value in
      outputTransform: null, // transform the value before outputEl (function)
      valueTransform: null   // transform the value before opts object (function)
    }, params);

    if (!this.optsSpec_) {
      this.optsSpec_ = [];
    }

    this.optsSpec_.push(params);

    var field = params.field = this.$(params.field);
    var outputEl;

    if (params.outputEl) {
      outputEl = params.outputEl = this.$(params.outputEl);
    }

    function updateLabel() {
      if (outputEl) {
        if (params.outputTransform) {
          outputEl.textContent = params.outputTransform(field.value);
        }
        else {
          outputEl.textContent = field.value;
        }
      }
    }

    field.addEventListener('change', function() {
      updateLabel();
      compressorOptions.formChange_();
    });

    updateLabel();
  };

  CompressorOptionsProto.formChange_ = ic.utils.debounce(function() {
    this.buildOpts_();
    this.trigger('optionsChange');
  }, 100);

  ic.views.CompressorOptions = CompressorOptions;
})();