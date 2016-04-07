'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tooltipDefaultOptions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tooltipDefaultOptions = exports.tooltipDefaultOptions = {
  closeDelay: 100,
  align: 'top center',
  offset: [0, -10]
};

var Tooltip = function () {
  function Tooltip(element, options) {
    _classCallCheck(this, Tooltip);

    this._options = _extends({}, tooltipDefaultOptions, options);
    this._element = _d2.default.select(element);
    this.closeTimer = null;
  }

  _createClass(Tooltip, [{
    key: 'unMount',
    value: function unMount() {
      this._options = {};
      this._element = null;
      this._relativeContainer = null;
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    }
  }, {
    key: 'setPosition',
    value: function setPosition(evt) {
      if (!this.isShowing) return;
      var position = this.calcPosition(evt);
      this.element.style('left', position[0] + 'px').style('top', position[1] + 'px');
    }

    // event normalization from: http://www.jacklmoore.com/notes/mouse-position/

  }, {
    key: 'calcPosition',
    value: function calcPosition(evt) {
      var _options = this.options;
      var offset = _options.offset;
      var align = _options.align;


      var alignment = align.split(' ');
      var offsetWidth = this.element.node().offsetWidth;
      var offsetHeight = this.element.node().offsetHeight;
      var target = this.relativeContainer || evt.target || evt.srcElement;
      var rect = target.getBoundingClientRect();
      var offsetX = evt.clientX - rect.left;
      var offsetY = evt.clientY - rect.top;

      // vertical
      switch (alignment[0]) {
        case 'top':
          offsetY -= offsetHeight - offset[1];
          break;

        case 'bottom':
        default:
          offsetY -= offset[1];
          break;
      }

      // horizontal
      switch (alignment[1]) {
        case 'center':
          offsetX -= offsetWidth / 2 + offset[0];
          break;

        case 'right':
          offsetX -= offsetWidth + offset[0];
          break;

        case 'left':
        default:
          offsetX += offset[0];
          break;
      }

      return [offsetX, offsetY];
    }
  }, {
    key: 'setContent',
    value: function setContent(item) {
      if (typeof this.options.onSetTooltipContent === 'function') {
        this.options.onSetTooltipContent(this.element, item);
      } else {
        this.element.text('');
      }

      return this;
    }
  }, {
    key: 'show',
    value: function show(evt, item) {
      if (this.isShowing) return;
      this.isShowing = true;
      this.element.classed('active', true);
      if (evt) this.setPosition(evt);
      if (item) this.setContent(item);

      return this;
    }
  }, {
    key: 'hide',
    value: function hide(immediate) {
      var _this = this;

      if (!this.isShowing) return;

      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }

      this.isShowing = false;

      if (immediate || this.options.closeDelay < 1) {
        this.setActiveToFalse();
      } else {
        this.closeTimer = setTimeout(function () {
          if (!_this.isShowing) _this.setActiveToFalse();
        }, this.options.closeDelay);
      }

      return this;
    }
  }, {
    key: 'setActiveToFalse',
    value: function setActiveToFalse() {
      this.closeTimer = null;
      this.element.classed('active', false);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'Tooltip';
    }
  }, {
    key: 'element',
    get: function get() {
      return this._element;
    },
    set: function set(val) {
      this._element = _d2.default.select(val);
    }
  }, {
    key: 'options',
    get: function get() {
      return this._options;
    },
    set: function set(obj) {
      this._options = _extends({}, this.options, { obj: obj });
    }
  }, {
    key: 'relativeContainer',
    get: function get() {
      return this._relativeContainer;
    },
    set: function set(val) {
      this._relativeContainer = val.node ? val.node() : val;
    }
  }]);

  return Tooltip;
}();

exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map