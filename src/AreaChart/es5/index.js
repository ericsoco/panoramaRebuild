'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

var _react = require('react');

var _charts = require('../../charts');

var _AreaChartD = require('./AreaChartD3');

var _AreaChartD2 = _interopRequireDefault(_AreaChartD);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AreaChart = function (_D3ReactBase) {
  _inherits(AreaChart, _D3ReactBase);

  function AreaChart(props) {
    _classCallCheck(this, AreaChart);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AreaChart).call(this, props));

    console.log(">>>>> AreaChart constructor");
    _this.chartConstructor = _AreaChartD2.default;
    return _this;
  }

  return AreaChart;
}(_charts.D3ReactBase);

AreaChart.propTypes = _extends({}, _charts.D3ReactBase.propTypes, {
  fillColor: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  fillOpacity: _react.PropTypes.number,
  interpolate: _react.PropTypes.string
});
AreaChart.defaultProps = _extends({}, _charts.D3ReactBase.defaultProps, {
  xScale: _d2.default.scale.ordinal(),
  className: 'area-chart',
  interpolate: 'basis',
  xaxis: {
    className: 'x axis',
    orient: 'bottom',
    position: 'bottom',
    attr: {
      dx: '0',
      dy: '0.5em'
    },
    style: {
      'text-anchor': 'middle'
    }
  },
  yaxis: {
    className: 'y axis',
    orient: 'left'
  }
});
exports.default = AreaChart;
//# sourceMappingURL=index.js.map