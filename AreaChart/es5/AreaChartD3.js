'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

var _charts = require('../../charts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AreaChartD3 = function (_D3Component) {
  _inherits(AreaChartD3, _D3Component);

  function AreaChartD3() {
    _classCallCheck(this, AreaChartD3);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AreaChartD3).apply(this, arguments));
  }

  _createClass(AreaChartD3, [{
    key: 'willMount',
    value: function willMount() {
      var _props = this.props;
      var xAccessor = _props.xAccessor;
      var yAccessor = _props.yAccessor;
      var xScale = _props.xScale;
      var yScale = _props.yScale;
      var interpolate = _props.interpolate;

      if (this.props.xaxis) {
        this.setAxis(new _charts.Axis(this.props.xaxis, this.props.xScale));
      }

      if (this.props.yaxis) {
        this.setAxis(new _charts.Axis(this.props.yaxis, this.props.yScale));
      }

      this.points = [];

      this.areaGenerator = _d2.default.svg.area().interpolate(interpolate).x(function (d) {
        return xScale(xAccessor(d));
      }).y0(function (d) {
        return yScale(0);
      }).y1(function (d) {
        return yScale(yAccessor(d));
      });
    }
  }, {
    key: 'onMount',
    value: function onMount() {
      _get(Object.getPrototypeOf(AreaChartD3.prototype), 'onMount', this).call(this);

      this.baseLayer = this.base.append('g').classed('area-layer', true);

      this._render();
    }
  }, {
    key: 'getClosestDataIndex',
    value: function getClosestDataIndex(pt) {
      if (!this.points.length) return null;

      var _props2 = this.props;
      var data = _props2.data;
      var xAccessor = _props2.xAccessor;


      this.points.forEach(function (d) {
        d.d = Math.abs(d.x - pt);
      });

      this.points.sort(function (a, b) {
        return _d2.default.ascending(a.d, b.d);
      });

      return this.points[0].i;
    }
  }, {
    key: 'onMouseMoveHandler',
    value: function onMouseMoveHandler() {
      if (!this.hover || !this.tooltip) return;

      var mx = _d2.default.mouse(this.baseLayer.node());
      var inverted = this.props.xScale.invert(mx[0]);
      var itemIdx = this.getClosestDataIndex(mx[0]);
      this.tooltip.setPosition(_d2.default.event);

      if (itemIdx !== null) this.tooltip.setContent(this.props.data[0][itemIdx]);
    }
  }, {
    key: 'preRender',
    value: function preRender() {
      var _this2 = this;

      var _props3 = this.props;
      var data = _props3.data;
      var xScale = _props3.xScale;
      var yScale = _props3.yScale;
      var interpolate = _props3.interpolate;
      var xAccessor = _props3.xAccessor;
      var yAccessor = _props3.yAccessor;

      xScale.range([0, this.width]);
      yScale.range([this.height, 0]);

      this.updateAxis(0, xScale, this.props.xaxis);
      this.updateAxis(1, yScale, this.props.yaxis);

      this.areaGenerator.interpolate(interpolate).x(function (d) {
        return xScale(xAccessor(d));
      }).y0(function (d) {
        return yScale(0);
      }).y1(function (d) {
        return yScale(yAccessor(d));
      });

      this.points = [];
      if (data.length) {
        data[0].forEach(function (d, i) {
          var x = xScale(xAccessor(d));
          _this2.points.push({ x: x, i: i });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props4 = this.props;
      var data = _props4.data;
      var xAccessor = _props4.xAccessor;
      var yAccessor = _props4.yAccessor;
      var xScale = _props4.xScale;
      var yScale = _props4.yScale;
      var fillColor = _props4.fillColor;
      var fillOpacity = _props4.fillOpacity;


      var area = this.baseLayer.selectAll('path.area').data(data);

      area.exit().remove();

      area.enter().append('path').attr('class', 'area');

      area.attr('d', function (d) {
        return _this3.areaGenerator(d);
      }).style('fill', fillColor).style('opacity', fillOpacity);
    }
  }, {
    key: 'postRender',
    value: function postRender() {
      if (this.props.interactive) {
        this.baseLayer.selectAll('path.area').on('mouseover', this.onOver.bind(this)).on('mouseout', this.onOut.bind(this));
      }
    }
  }, {
    key: 'onOver',
    value: function onOver() {
      this.hover = true;
      if (this.tooltip) {
        this.tooltip.show();
      }
    }
  }, {
    key: 'onOut',
    value: function onOut() {
      this.hover = false;
      if (this.tooltip) {
        this.tooltip.hide();
      }
    }
  }]);

  return AreaChartD3;
}(_charts.D3Component);

exports.default = AreaChartD3;
//# sourceMappingURL=AreaChartD3.js.map
