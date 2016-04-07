'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultProps = exports.DefaultTypes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultTypes = exports.DefaultTypes = {
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  margin: _react.PropTypes.shape({
    top: _react.PropTypes.number,
    right: _react.PropTypes.number,
    bottom: _react.PropTypes.number,
    left: _react.PropTypes.number
  }),
  xAccessor: _react.PropTypes.func,
  yAccessor: _react.PropTypes.func,
  selectionAccessor: _react.PropTypes.func,
  xScale: _react.PropTypes.func,
  yScale: _react.PropTypes.func,
  xaxis: _react.PropTypes.object,
  yaxis: _react.PropTypes.object,
  interactive: _react.PropTypes.bool,
  tooltip: _react.PropTypes.bool
};

var DefaultProps = exports.DefaultProps = {
  width: 960,
  height: 500,
  margin: { top: 20, right: 30, bottom: 20, left: 30 },
  selectionAccessor: function selectionAccessor(d) {
    return d.key;
  },
  xAccessor: function xAccessor(d) {
    return d.key;
  },
  yAccessor: function yAccessor(d) {
    return d.value;
  },
  xScale: _d2.default.scale.linear(),
  yScale: _d2.default.scale.linear(),
  interactive: true,
  tooltip: false
};

var D3ReactBase = function (_Component) {
  _inherits(D3ReactBase, _Component);

  function D3ReactBase(props) {
    _classCallCheck(this, D3ReactBase);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(D3ReactBase).call(this, props));
  }

  _createClass(D3ReactBase, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.chartConstructor) {
        throw new Error('Need to set chartConstructor');
      }
      this.chart = new this.chartConstructor(this.props);
      this.chart.willMount();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.chart.selector = this.refs.chart;
      this.chart.tooltipRef = this.refs.tooltip;
      this.chart.props = this.props;
      this.chart.onMount();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.chart.props = this.props;
      this.chart.onUpdate();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.chart.onUnMount();
      this.chart = null;
    }
  }, {
    key: 'getClassName',
    value: function getClassName() {
      return this.props.className ? ' ' + this.props.className : '';
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'panorama' + this.getClassName() },
        _react2.default.createElement(
          'div',
          { ref: 'chart', className: 'panorama--chart-container' },
          this.props.tooltip && _react2.default.createElement('div', { ref: 'tooltip', className: 'panorama--tooltip' })
        )
      );
    }
  }]);

  return D3ReactBase;
}(_react.Component);

D3ReactBase.propTypes = DefaultTypes;
D3ReactBase.defaultProps = DefaultProps;
exports.default = D3ReactBase;
//# sourceMappingURL=D3ReactBase.js.map