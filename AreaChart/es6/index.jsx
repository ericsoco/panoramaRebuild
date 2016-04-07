import d3 from 'd3';
import { PropTypes } from 'react';
import { D3ReactBase } from '../../charts';
import AreaChartD3 from './AreaChartD3';

export default class AreaChart extends D3ReactBase {

  static propTypes = {...D3ReactBase.propTypes,
    fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fillOpacity: PropTypes.number,
    interpolate: PropTypes.string
  };

  static defaultProps = {...D3ReactBase.defaultProps,
    xScale: d3.scale.ordinal(),
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
      orient: 'left',
    }
  };

  constructor (props) {
    super(props);
    this.chartConstructor = AreaChartD3;
  }

}
