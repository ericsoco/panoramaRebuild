'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var D3Component = function () {
  function D3Component(props) {
    _classCallCheck(this, D3Component);

    this._props = props;
    this.root = null;
    this.mounted = false;
    this.axes = [];
    this.tooltip = null;
    this.dispatch = _d2.default.dispatch('mounted', 'updated', 'mouseOver', 'mouseOut', 'mouseMove', 'click');
  }

  _createClass(D3Component, [{
    key: 'willMount',


    /*----------  Lifecycle methods  ----------*/

    value: function willMount() {
      // Not doing anything here, but someone else in the
      // inheritance chain could find it useful
    }
  }, {
    key: 'onMount',
    value: function onMount() {
      var _this = this;

      if (this.mounted) return;

      this.addEvents();

      this.root = _d2.default.select(this.selector);
      this.svg = this.root.append('svg').classed('interactive', this.props.interactive);

      if (this.props.interactive && this.props.tooltip) {
        this.svg.on('mousemove', this.dispatch.mouseMove);
      }

      // add chart to `this.base`
      this.base = this.svg.append('g');

      this.updateDimensions();

      this.axes.forEach(function (axis) {
        return axis.onMount(_this.base);
      });

      if (this.tooltipRef) {
        this.tooltip = new _Tooltip2.default(this.tooltipRef, this.props.tooltipOptions || {});
        this.tooltip.relativeContainer = this.svg;
      }

      this.mounted = true;
      this.dispatch.mounted();
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate() {
      if (!this.mounted) return;

      this.updateDimensions();
      this._render();
      this.dispatch.updated();
    }
  }, {
    key: 'onUnMount',
    value: function onUnMount() {
      this.axes.forEach(function (axis) {
        return axis.onUnMount();
      });
      this.axes.length = 0;
      this.removeEvents();
      this.svg.on('move', null);
      this.svg.remove();
      this.root = this.svg = null;
      this.mounted = false;
      this.props = null;
    }

    // TODO: Work on a better
    // solution, not so rigid

  }, {
    key: 'addEvents',
    value: function addEvents() {
      this.dispatch.on('mounted', this.onMountedHandler.bind(this));
      this.dispatch.on('updated', this.onUpdatedHandler.bind(this));
      this.dispatch.on('mouseOver', this.onMouseOverHandler.bind(this));
      this.dispatch.on('mouseOut', this.onMouseOutHandler.bind(this));
      this.dispatch.on('click', this.onClickHandler.bind(this));
      this.dispatch.on('mouseMove', this.onMouseMoveHandler.bind(this));
    }
  }, {
    key: 'removeEvents',
    value: function removeEvents() {
      this.dispatch.on('mounted', null);
      this.dispatch.on('updated', null);
      this.dispatch.on('mouseOver', null);
      this.dispatch.on('mouseOut', null);
      this.dispatch.on('mouseMove', null);
      this.dispatch.on('click', null);
    }
  }, {
    key: 'onMountedHandler',
    value: function onMountedHandler() {
      if (typeof this.props.onMountHandler === 'function') {
        this.props.onMountHandler();
      }
    }
  }, {
    key: 'onUpdatedHandler',
    value: function onUpdatedHandler() {
      if (typeof this.props.onUpdatedHandler === 'function') {
        this.props.onUpdatedHandler();
      }
    }
  }, {
    key: 'onMouseOverHandler',
    value: function onMouseOverHandler(d) {
      if (this.tooltip) {
        this.tooltip.show(_d2.default.event, d);
      }
      if (typeof this.props.onMouseOverHandler === 'function') {
        this.props.onMouseOverHandler(d);
      }
    }
  }, {
    key: 'onMouseOutHandler',
    value: function onMouseOutHandler(d) {
      if (this.tooltip) {
        this.tooltip.hide();
      }
      if (typeof this.props.onMouseOutHandler === 'function') {
        this.props.onMouseOutHandler(d);
      }
    }
  }, {
    key: 'onMouseMoveHandler',
    value: function onMouseMoveHandler() {
      if (this.tooltip) {
        this.tooltip.setPosition(_d2.default.event);
      }
    }
  }, {
    key: 'onClickHandler',
    value: function onClickHandler(d) {
      if (typeof this.props.onClickHandler === 'function') {
        this.props.onClickHandler(d);
      }
    }
  }, {
    key: 'setAxis',
    value: function setAxis(axis) {
      if (axis.toString() !== 'Axis') return;
      this.axes.push(axis);
    }
  }, {
    key: 'updateAxis',
    value: function updateAxis(pos, scale, opts) {
      this.axes[pos].update(scale, opts);
    }
  }, {
    key: '_render',
    value: function _render() {
      if (!this.props.data) return;

      this.preRender();
      this.axes.forEach(function (axis) {
        return axis.render();
      });
      this.render();
      this.postRender();
    }
  }, {
    key: 'preRender',
    value: function preRender() {}
  }, {
    key: 'render',
    value: function render() {
      throw new Error('render function should be implemented');
    }
  }, {
    key: 'postRender',
    value: function postRender() {}
  }, {
    key: 'updateDimensions',
    value: function updateDimensions() {
      var _this2 = this;

      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var margin = _props.margin;


      if (this.width === width && this.height === height) return;

      this.width = width - margin.left - margin.right;
      this.height = height - margin.top - margin.bottom;

      this.svg.attr('width', width).attr('height', height);

      this.base.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      this.axes.forEach(function (axis) {
        axis.width = _this2.width;
        axis.height = _this2.height;
      });
    }
  }, {
    key: 'selector',
    get: function get() {
      return this._selector;
    },
    set: function set(elm) {
      this._selector = elm;
    }
  }, {
    key: 'props',
    get: function get() {
      return this._props;
    },
    set: function set(val) {
      this._props = val;
    }
  }, {
    key: 'tooltipRef',
    set: function set(val) {
      this._tooltipRef = val;
    },
    get: function get() {
      return this._tooltipRef;
    }
  }]);

  return D3Component;
}();

exports.default = D3Component;
//# sourceMappingURL=D3Component.js.map