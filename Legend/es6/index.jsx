import React, { PropTypes } from 'react';

export default class Legend extends React.Component {

  static propTypes = {
    /**
     * @type {Array[String]}
     * List of items (Strings) to display.
     */
    items: PropTypes.array.isRequired,

    /**
     * @type {String}
     * Currently selected item.
     * Either the string value of the item (as displayed on-screen) or the index of the item within the `items` array.
     */
    selectedItem: PropTypes.string,

    /**
     * @type {Function}
     * Callback invoked on selection of an item, e.g. a mouse click.
     */
    onItemSelected: PropTypes.func
  }

  static defaultProps = {
    items: [],
    selectedItem: '',
    onItemSelected: null
  }

  constructor (props) {

    super(props);

    // manually bind event handlers,
    // since React ES6 doesn't do this automatically
    this.onItemClick = this.onItemClick.bind(this);
    this.onItemEnter = this.onItemEnter.bind(this);
    this.onItemLeave = this.onItemLeave.bind(this);

  }

  componentDidMount () {}

  componentWillUnmount () {}

  componentDidUpdate () {}

  onItemClick (event) {

    // Defense.
    if (!event.currentTarget || !event.currentTarget.dataset) { return; }

    if (this.props.onItemSelected) {
      this.props.onItemSelected(event.currentTarget.dataset.item, this.props.items.indexOf(event.currentTarget.dataset.item));
    }

  }

  onItemEnter (event) {

    // Any desired mouse enter functionality goes here.
    // console.log("entering:", event.currentTarget.dataset.item);

  }

  onItemLeave (event) {

    // Any desired mouse leave functionality goes here.
    // console.log("leaving:", event.currentTarget.dataset.item);

  }

  render () {

    return (
      <div className='panorama legend'>
        <ul>
        { this.props.items.map((item, i) => {
          let selected = this.props.selectedItem === item || this.props.selectedItem == i;
          return (
            <li
              className = { 'item' + (selected ? ' selected' : '') }
              data-item = { item }
              key = { item }
              onClick = { this.onItemClick }
              onMouseEnter = { this.onItemEnter }
              onMouseLeave = { this.onItemLeave }
            >
              <span>{ this.capitalize(item) }</span>
            </li>
          );
        }) }
        </ul>
      </div>
    );

  }

  capitalize (str) {
    
    return str.charAt(0).toUpperCase() + str.slice(1);

  }

}
