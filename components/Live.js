import React, { Component } from 'react';
// import { Row, Col } from 'antd';
import moment from 'moment';

export default class Current extends Component {
  constructor(props) {
    super(props);

    this.state = { timestamp: moment().tz(props.tz) };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ timestamp: moment().tz(this.props.tz) });
  }

  renderHeader(name, time) {
    return (
      <div className="well text-center padding-sm">
        <h4 className="uppercase margin-top-lg">{name}</h4>
        <p>{time}</p>
      </div>
    );
  }

  render() {
    const { timestamp } = this.state;

    return (
      <div className="margin-top-lg">
        {this.renderHeader(
          'Unix seconds',
          timestamp ? timestamp.format('X') : null
        )}
        {this.renderHeader(
          'Unix milliseconds',
          timestamp ? timestamp.format('x') : null
        )}
        {this.renderHeader(
          'Current time',
          timestamp ? timestamp.format('YYYY-MM-DD HH:mm:ss') : null
        )}
      </div >
    );
  }
}
