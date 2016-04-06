'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ItemSelector = function (_React$Component) {
  _inherits(ItemSelector, _React$Component);

  function ItemSelector(props) {
    _classCallCheck(this, ItemSelector);

    // manually bind event handlers,
    // since React ES6 doesn't do this automatically

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ItemSelector).call(this, props));

    _this.onItemClick = _this.onItemClick.bind(_this);
    _this.onArrowMouseDown = _this.onArrowMouseDown.bind(_this);
    _this.onArrowMouseUp = _this.onArrowMouseUp.bind(_this);
    _this.animateScrollPosition = _this.animateScrollPosition.bind(_this);

    return _this;
  }

  _createClass(ItemSelector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {

      //

    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      this.scrollToSelectedItem();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      //

    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {

      this.scrollToSelectedItem();
    }
  }, {
    key: 'onItemClick',
    value: function onItemClick(event) {

      // Defense.
      if (!event.currentTarget || !event.currentTarget.dataset) {
        return;
      }

      if (this.props.onItemSelected) {
        this.props.onItemSelected(this.props.items[event.currentTarget.dataset.index], event.currentTarget.dataset.index);
      }
    }
  }, {
    key: 'onArrowMouseDown',
    value: function onArrowMouseDown(event) {

      var dir = void 0;
      if (event.target.classList.contains('up-arrow')) {
        dir = -1;
      } else if (event.target.classList.contains('down-arrow')) {
        dir = 1;
      }
      if (!dir) {
        return;
      }

      var itemList = this.refs['item-list'],
          nextAccelCounter = 16,
          accelCounter = 0,
          itemEl = itemList.querySelector('li'),
          itemMetrics = window.getComputedStyle(itemEl),
          speed = itemEl.offsetHeight + (itemMetrics ? parseFloat(itemMetrics['margin-bottom'].replace('px', '')) : 0);

      this.arrowMouseUp = false;

      var onArrowMouseHold = function () {
        if (accelCounter-- <= 1) {
          this.scrollToPosition(itemList.scrollTop + dir * speed);
          accelCounter = nextAccelCounter = Math.max(1, Math.floor(nextAccelCounter * 0.75));
        }

        if (!this.arrowMouseUp) {
          window.requestAnimationFrame(onArrowMouseHold);
        }
      }.bind(this);

      window.requestAnimationFrame(onArrowMouseHold);
    }
  }, {
    key: 'onArrowMouseUp',
    value: function onArrowMouseUp(event) {

      this.arrowMouseUp = true;
    }
  }, {
    key: 'scrollToPosition',
    value: function scrollToPosition(position) {

      if (typeof this.targetScrollPosition === 'undefined') {
        // Not currently animating, so start
        this.targetScrollPosition = position;
        this.animateScrollPosition();
      } else {
        // Already animating; just update target
        this.targetScrollPosition = position;
      }
    }
  }, {
    key: 'scrollToSelectedItem',
    value: function scrollToSelectedItem() {

      var itemList = this.refs['item-list'],
          selectedItem = itemList.querySelector('.selected');

      if (selectedItem) {
        this.scrollToPosition(selectedItem.offsetTop - itemList.offsetHeight);
      }
    }
  }, {
    key: 'animateScrollPosition',
    value: function animateScrollPosition() {

      var itemList = this.refs['item-list'],
          delta = void 0;

      if (typeof this.scrollPosition === 'undefined') {
        this.scrollPosition = itemList.scrollTop;
      }

      delta = this.targetScrollPosition - this.scrollPosition;

      if (Math.abs(delta) > 1) {
        this.scrollPosition += 0.25 * delta;
        itemList.scrollTop = this.scrollPosition; // scrollTop rounds to the nearest int
        window.requestAnimationFrame(this.animateScrollPosition);
      } else {
        itemList.scrollTop = this.targetScrollPosition;
        this.targetScrollPosition = undefined;
        this.scrollPosition = undefined;
      }
    }
  }, {
    key: 'getDefaultState',
    value: function getDefaultState() {

      return {};
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isSelected = void 0;

      return _react2.default.createElement(
        'div',
        { className: 'panorama item-selector' },
        this.props.title ? _react2.default.createElement(
          'h3',
          null,
          this.props.title
        ) : null,
        this.props.displayArrow ? _react2.default.createElement('div', { className: 'scroll-arrow up-arrow', onMouseDown: this.onArrowMouseDown, onMouseUp: this.onArrowMouseUp }) : null,
        _react2.default.createElement(
          'ul',
          { ref: 'item-list' },
          this.props.items.map(function (item, i) {

            isSelected = _this2.props.selectedItem && _this2.props.selectedItem.id == item.id || // selectedItem with items as Objects
            _this2.props.selectedItem === item || // selectedItem with items as Strings
            _this2.props.selectedIndex === i; // selectedIndex

            return _react2.default.createElement(
              'li',
              {
                className: 'item ' + _this2.props.liClassNames + (isSelected ? ' selected' : ''),
                'data-index': i,
                key: i,
                onClick: _this2.onItemClick
              },
              _react2.default.createElement(
                'span',
                null,
                item.name.toUpperCase()
              )
            );
          })
        ),
        this.props.displayArrow ? _react2.default.createElement('div', { className: 'scroll-arrow down-arrow', onMouseDown: this.onArrowMouseDown, onMouseUp: this.onArrowMouseUp }) : null
      );
    }
  }]);

  return ItemSelector;
}(_react2.default.Component);

ItemSelector.propTypes = {
  title: _react.PropTypes.string,
  items: _react.PropTypes.array.isRequired,
  displayArrow: _react.PropTypes.bool,
  liClassNames: _react.PropTypes.string,
  selectedIndex: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  selectedItem: _react.PropTypes.object,
  onItemSelected: _react.PropTypes.func
};
ItemSelector.defaultProps = {
  title: '',
  items: [],
  displayArrow: true,
  liClassNames: '',
  selectedIndex: '',
  selectedItem: null,
  onItemSelected: null
};
exports.default = ItemSelector;