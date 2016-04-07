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

var OffsetAreaChartD3 = function (_D3Component) {
  _inherits(OffsetAreaChartD3, _D3Component);

  function OffsetAreaChartD3() {
    _classCallCheck(this, OffsetAreaChartD3);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(OffsetAreaChartD3).apply(this, arguments));
  }

  _createClass(OffsetAreaChartD3, [{
    key: 'willMount',
    value: function willMount() {
      var _props = this.props;
      var xAccessor = _props.xAccessor;
      var yAccessor = _props.yAccessor;
      var xScale = _props.xScale;
      var yScale = _props.yScale;
      var interpolate = _props.interpolate;

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
      _get(Object.getPrototypeOf(OffsetAreaChartD3.prototype), 'onMount', this).call(this);

      this.lineLayer = this.base.append('g').classed('offset-area-lines', true);

      this._render();
    }
  }, {
    key: 'preRender',
    value: function preRender() {
      var _props2 = this.props;
      var xScale = _props2.xScale;
      var yScale = _props2.yScale;
      var xAccessor = _props2.xAccessor;
      var yAccessor = _props2.yAccessor;
      var areaChartConfig = _props2.areaChartConfig;
      var interpolate = _props2.interpolate;


      var maxHeight = this.height - this.props.areaChartData.length * this.props.chartSpacing;
      xScale.range([0, this.width]);
      yScale.range([maxHeight, 0]);

      this.areaGenerator = _d2.default.svg.area().interpolate(interpolate).x(function (d) {
        return xScale(areaChartConfig.xAccessor(d));
      }).y0(function (d) {
        return yScale(0);
      }).y1(function (d) {
        return yScale(areaChartConfig.yAccessor(d));
      });
    }
  }, {
    key: 'areaOffsetTranslation',
    value: function areaOffsetTranslation(idx) {
      var chartSpacing = this.props.chartSpacing;


      return 'translate(0,' + chartSpacing * idx + ')';
    }
  }, {
    key: 'lineOffsetTranslation',
    value: function lineOffsetTranslation(idx) {
      var _props3 = this.props;
      var data = _props3.data;
      var chartSpacing = _props3.chartSpacing;
      var yScale = _props3.yScale;

      var bottom = yScale(0);
      var pos = data.length - idx;
      var y = -chartSpacing * pos;
      return 'translate(0,' + y + ')';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props4 = this.props;
      var data = _props4.data;
      var xAccessor = _props4.xAccessor;
      var yAccessor = _props4.yAccessor;
      var xScale = _props4.xScale;
      var yScale = _props4.yScale;
      var fillColor = _props4.fillColor;
      var fillOpacity = _props4.fillOpacity;
      var areaChartData = _props4.areaChartData;
      var colorPalette = _props4.colorPalette;
      var metadataAccessor = _props4.metadataAccessor;
      var chartIdAccessor = _props4.chartIdAccessor;
      var selectedChartId = _props4.selectedChartId;
      var circleRadius = _props4.circleRadius;
      var interactive = _props4.interactive;

      //
      // AreaCharts
      //

      var area = this.base.selectAll('g.area-container').data(areaChartData);

      // exit
      area.exit().remove();

      // enter
      area.enter().append('g').attr('class', 'area-container').append('path').attr('class', 'area');

      // update
      area.attr('transform', function (d, i) {
        return _this2.areaOffsetTranslation(i);
      }).classed('selected', function (d) {
        return chartIdAccessor(d) === selectedChartId ? true : false;
      }).selectAll('path').attr('d', function (d) {
        return _this2.areaGenerator(d);
      }).attr('fill', function (d, i, j) {
        return colorPalette[j % colorPalette.length];
      });

      //
      // lines
      //
      var baseY = yScale(0) + this.props.areaChartData.length * this.props.chartSpacing;
      var domain = xScale.domain();

      this.lineLayer.attr('transform', 'translate(0, ' + baseY + ')');

      var lines = this.lineLayer.selectAll('g.line-group').data(data);

      // exit
      lines.exit().remove();

      // enter
      lines.enter().append('g').attr('class', 'line-group').append('line').attr('class', 'lifespan');

      // update
      lines.attr('transform', function (d, i) {
        return _this2.lineOffsetTranslation(i);
      }).classed('selected', function (d) {
        return chartIdAccessor(d) == selectedChartId ? true : false;
      }).selectAll('line').attr('x1', function (d) {
        return xScale(Math.max(xAccessor(d, 0), domain[0]));
      }).attr('x2', function (d) {
        return xScale(Math.min(xAccessor(d, 1), domain[1]));
      }).attr('y1', 0).attr('y2', 0).style('stroke', function (d, i) {
        return colorPalette[i % colorPalette.length];
      });

      //
      // circles
      //
      var circles = lines.selectAll('circle').data(function (d) {
        return metadataAccessor(d);
      });

      // exit
      circles.exit().remove();

      // enter
      circles.enter().append('circle');

      // update
      circles.attr('cx', function (d) {
        return xScale(Math.max(d, domain[0]));
      }).attr('cy', 0).attr('r', circleRadius).style('fill', function (d, i, j) {
        return colorPalette[j % colorPalette.length];
      });
    }
  }, {
    key: 'postRender',
    value: function postRender() {}
  }]);

  return OffsetAreaChartD3;
}(_charts.D3Component);

exports.default = OffsetAreaChartD3;
//# sourceMappingURL=OffsetAreaChartD3.js.map