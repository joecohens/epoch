import React from 'react';
import { DatePicker, Button, Row, Col } from 'antd';
import moment from 'moment';

import Table from './shared/Table';

const ButtonGroup = Button.Group;

export default class DateToEpoch extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeDateTime = this.onChangeDateTime.bind(this);
    this.onStartOfDay = this.onStartOfDay.bind(this);
    this.onEndOfDay = this.onEndOfDay.bind(this);
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

  onStartOfDay() {
    this.props.handleStartOfDay();
  }

  onEndOfDay() {
    this.props.handleEndOfDay();
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
        <Row gutter={24} type="flex" justify="space-between">
          <Col xs={14} md={18}>
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
          </Col>
          <Col xs={8} md={6}>
            <ButtonGroup>
              <Button size="large" onClick={this.onStartOfDay}>SOD</Button>
              <Button size="large" onClick={this.onEndOfDay}>EOD</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div className="margin-top-md">
          <Table dateTime={currentDatetime} tz={tz} />
        </div>
      </div>
    );
  }
}
