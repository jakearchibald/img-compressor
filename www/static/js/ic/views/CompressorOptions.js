(function() {
  function CompressorOptions() {
    this.opts = null;
    this.buildOpts_();
  }

  var CompressorOptionsProto = CompressorOptions.prototype = Object.create(ic.views.View.prototype);

  CompressorOptionsProto.buildOpts_ = function() {
    var opts = {};

    this.optsSpec_.forEach(function(spec) {
      var transform = spec.valueTransform;
      var val = spec.getVal();

      if (val) {
        val = spec.cast(val);

        if (transform) {
          val = transform(val);
        }
        
        // we're cool with explicit zeros
        if (val || val === 0) {
          opts[spec.opt] = val;
        }
      }
    });

    // check for applicable fields
    this.optsSpec_.forEach(function(spec) {
      spec.field.disabled = false;

      if (spec.applicable && !spec.applicable(opts)) {
        spec.field.disabled = true;
        delete opts[spec.opt];
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
      valueTransform: null,  // transform the value before opts object (function)
      applicable: null       // function passed the option object, return false to disable field
    }, params);

    if (!this.optsSpec_) {
      this.optsSpec_ = [];
    }

    this.optsSpec_.push(params);

    var field = params.field = this.$(params.field);
    var outputEl;

    if (field.type == 'checkbox') {
      params.getVal = function() {
        if (field.checked) return field.value;
      };
    }
    else {
      params.getVal = function() {
        return field.value;
      };
    }

    if (params.outputEl) {
      outputEl = params.outputEl = this.$(params.outputEl);
    }

    function updateLabel() {
      if (outputEl) {
        if (params.outputTransform) {
          outputEl.textContent = params.outputTransform(params.cast(params.getVal()));
        }
        else {
          outputEl.textContent = params.getVal();
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