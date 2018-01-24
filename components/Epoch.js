import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import moment from 'moment';

export default class Epoch extends Component {
  constructor(props) {
    super(props);

    this.state = { format: 'x', timestamp: moment() };
  }

  emitEmpty = () => {
    this.timestampInput.focus();

    this.setState({ timestamp: '' });
  };

  onChangeTimestamp = e => {
    const value = e.target.value;
    const format = value && value.length > 10 ? 'x' : 'X';
    const timestamp = moment(e.target.value, format);

    if (timestamp && !timestamp.isValid()) {
      return;
    }

    const currentTimestamp = this.state.timestamp;

    if (timestamp && timestamp.isSame(currentTimestamp)) {
      return;
    }

    this.setState({ format, timestamp });
  };

  render() {
    const { format, timestamp } = this.state;
    const suffix = timestamp ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;

    return (
      <div className="well padding-lg margin-top-md">
        <h3>Convert to datetime</h3>
        <Input
          size="large"
          suffix={suffix}
          value={timestamp ? timestamp.format(format) : ''}
          onChange={this.onChangeTimestamp}
          ref={node => (this.timestampInput = node)}
        />
        <div className="margin-top-md text-center">
          {timestamp ? timestamp.format('MMMM Do YYYY, h:mm:ss a') : null}
        </div>
      </div>
    );
  }
}
