'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _charts = require('../../charts');

var _AreaChart = require('../../AreaChart');

var _AreaChart2 = _interopRequireDefault(_AreaChart);

var _OffsetAreaChartD = require('./OffsetAreaChartD3');

var _OffsetAreaChartD2 = _interopRequireDefault(_OffsetAreaChartD);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OffsetAreaChart = function (_D3ReactBase) {
  _inherits(OffsetAreaChart, _D3ReactBase);

  // extend superclass `props` validators

  function OffsetAreaChart(props) {
    _classCallCheck(this, OffsetAreaChart);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OffsetAreaChart).call(this, props));

    _this.chartConstructor = _OffsetAreaChartD2.default;

    // This accessor is implemented by the React component as well as the d3 chart.
    _this.chartIdAccessor = props.chartIdAccessor;
    return _this;
  }

  // extend superclass `props` defaults


  return OffsetAreaChart;
}(_charts.D3ReactBase);

OffsetAreaChart.propTypes = _extends({}, _charts.D3ReactBase.propTypes, {
  areaChartData: _react.PropTypes.array,
  chartSpacing: _react.PropTypes.number,
  colorPalette: _react.PropTypes.array,
  selectedChartId: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  chartIdAccessor: _react.PropTypes.func,
  metadataAccessor: _react.PropTypes.func,
  interpolate: _react.PropTypes.string,
  circleRadius: _react.PropTypes.number
});
OffsetAreaChart.defaultProps = _extends({}, _charts.D3ReactBase.defaultProps, {
  className: 'offset-area-chart',
  areaChartData: [],
  chartSpacing: 4,
  colorPalette: null,
  selectedChartId: null,
  chartIdAccessor: null,
  metadataAccessor: null,
  interpolate: 'basis',
  circleRadius: 2
});
exports.default = OffsetAreaChart;
//# sourceMappingURL=index.js.map