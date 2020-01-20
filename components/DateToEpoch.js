import React from 'react';
import { DatePicker, Row, Col } from 'antd';
import moment from 'moment';

import Table from './shared/Table';

export default class DateToEpoch extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeDateTime = this.onChangeDateTime.bind(this);
  }

  emitEmpty = () => {
    this.dateTimeInput.focus();

    this.props.handleClearDatetime();
  };

  onChangeDateTime(value) {
    const { datetime, tz } = this.props;

    const selectedDatetime = moment(value).tz(tz);

    if (selectedDatetime && !selectedDatetime.isValid()) {
      return;
    }

    const currentDatetime =
      typeof datetime === 'string' || datetime instanceof String
        ? moment(datetime).tz(tz)
        : datetime;

    if (selectedDatetime && selectedDatetime.isSame(currentDatetime)) {
      return;
    }

    this.props.handleChangeDatetime(selectedDatetime);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.datetime !== nextProps.datetime || this.props.tz !== nextProps.tz) {
      return true;
    }

    return false;
  }

  render() {
    const { datetime, tz } = this.props;

    const currentDatetime =
      datetime !== '' &&
      (typeof datetime === 'string' || datetime instanceof String)
        ? moment(datetime).tz(tz)
        : datetime;

    return (
      <div className="well padding-lg margin-top-lg">
        <h3>Convert to timestamp</h3>
        <DatePicker
          style={{ width: '100%' }}
          showTime
          defaultValue={currentDatetime}
          format="YYYY-MM-DD HH:mm:ss"
          size="large"
          name="date"
          onChange={this.onChangeDateTime}
          ref={node => (this.dateTimeInput = node)}
        />
        <div className="margin-top-md">
          <Table dateTime={currentDatetime} tz={tz} />
        </div>
      </div>
    );
  }
}
