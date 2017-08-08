/*eslint-disable*/
import React, {PropTypes, Component } from 'react';

import {markerStyle} from './marker_style';


export default class Marker extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};


  render() {
    return (
       <div style={markerStyle}>
            {this.props.text}
       </div>
    );
  }
}
