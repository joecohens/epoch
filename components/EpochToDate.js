import React from 'react';
// import { Input, Icon } from 'antd';
import moment from 'moment-timezone';

import Table from './shared/Table';

export default class EpochToDate extends React.Component {
  emitEmpty = () => {
    this.timestampInput.focus();

    this.props.handleClearTimestamp();
  };

  onChangeTimestamp = e => {
    const { timestamp, tz } = this.props;

    const value = e.target.value;
    const format = value && value.length > 10 ? 'x' : 'X';
    const selectedTimestamp = moment(e.target.value, format).tz(tz);

    if (selectedTimestamp && !selectedTimestamp.isValid()) {
      return;
    }

    const currentTimestamp =
      typeof timestamp === 'string' || timestamp instanceof String
        ? moment(timestamp).tz(tz)
        : timestamp;

    if (selectedTimestamp && selectedTimestamp.isSame(currentTimestamp)) {
      return;
    }

    this.props.handleChangeTimestamp(selectedTimestamp, format);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.timestamp !== nextProps.timestamp ||
      this.props.format !== nextProps.format
    ) {
      return true;
    }

    return false;
  }

  render() {
    const { timestamp, format, tz } = this.props;

    const currentTimestamp =
      timestamp !== '' &&
        (typeof timestamp === 'string' || timestamp instanceof String)
        ? moment(timestamp).tz(tz)
        : timestamp;

    const suffix = timestamp ? (
      <a type="close-circle" onClick={this.emitEmpty} />
    ) : null;

    return (
      <div className="well padding-lg margin-top-md">
        <h3>Convert to datetime</h3>
        {/*
        <Input
          size="large"
          suffix={suffix}
          value={currentTimestamp ? currentTimestamp.format(format) : ''}
          onChange={this.onChangeTimestamp}
          ref={node => (this.timestampInput = node)}
        />
        */}
        <div className="margin-top-md">
          <Table dateTime={currentTimestamp} tz={tz} />
        </div>
      </div>
    );
  }
}
