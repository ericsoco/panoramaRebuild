'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.axisMethods = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axisMethods = exports.axisMethods = ['orient', 'ticks', 'tickValues', 'tickSize', 'innerTickSize', 'outerTickSize', 'tickPadding', 'tickFormat'];

var Axis = function () {
  function Axis(options, scale) {
    _classCallCheck(this, Axis);

    this._options = options;
    this.axis = _d2.default.svg.axis().scale(scale);
    this.element = null;
  }

  _createClass(Axis, [{
    key: 'update',
    value: function update(scale, opts) {
      this.options = opts;
      this.axis.scale(scale);
      this.setAxisMethods();
    }
  }, {
    key: 'onMount',
    value: function onMount(base) {
      this.element = base.append('g').attr('class', this.options.className || '');

      this.setAxisMethods();
      this.axisLabel();
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate() {}
  }, {
    key: 'onUnMount',
    value: function onUnMount() {
      if (this.element) this.element.remove();
      this._options = null;
      this.element = null;
      this.axis = null;
    }
  }, {
    key: 'render',
    value: function render() {
      this.setPosition();
      this.element.call(this.axis);
      this.renderTickExtras();
      this.renderLabelExtras();
    }
  }, {
    key: 'renderTickExtras',
    value: function renderTickExtras() {
      var text = this.element.selectAll('text');

      if (this.options.attr) {
        text.attr(this.options.attr);
      }

      if (this.options.style) {
        text.style(this.options.style);
      }
    }
  }, {
    key: 'renderLabelExtras',
    value: function renderLabelExtras() {
      if (!this.label || !this.options.label) return;
      var label = this.options.label;


      if (label.attr) {
        this.label.attr(label.attr);
      }
      if (label.style) {
        this.label.style(label.style);
      }
    }
  }, {
    key: 'setPosition',
    value: function setPosition() {
      var position = this.options.position;


      if (position) {
        switch (position) {
          case 'bottom':
            this.element.attr('transform', 'translate(0,' + this.height + ')');
            break;
          case 'right':
            this.element.attr('transform', 'translate(' + this.width + ',0)');
          default:
            break;
        }
      }
    }
  }, {
    key: 'setAxisMethods',
    value: function setAxisMethods() {
      var _this = this;

      axisMethods.forEach(function (method) {
        if (_this.options.hasOwnProperty(method)) {
          _this.axis[method](_this.options[method]);
        }
      });
    }
  }, {
    key: 'axisLabel',
    value: function axisLabel() {
      if (this.options.label) {
        this.label = this.element.append('text').text(this.options.label.text);
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'Axis';
    }
  }, {
    key: 'options',
    get: function get() {
      return this._options;
    },
    set: function set(val) {
      this._options = val;
    }
  }, {
    key: 'width',
    get: function get() {
      return this._width;
    },
    set: function set(w) {
      this._width = w;
    }
  }, {
    key: 'height',
    get: function get() {
      return this._height;
    },
    set: function set(h) {
      this._height = h;
    }
  }]);

  return Axis;
}();

exports.default = Axis;
//# sourceMappingURL=Axis.js.map