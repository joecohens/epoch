import React from 'react'
import moment from 'moment'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import Table from '@/components/shared/table'

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Convert to timestamp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table dateTime={currentDatetime} tz={tz} />
          </CardContent>
          {/*
        <Row gutter={[8, 8]}>
          <Col>
            <DatePicker
              style={{ width: '100%' }}
              showTime
              defaultValue={currentDatetime}
              value={currentDatetime}
              format="YYYY-MM-DD HH:mm:ss"
              size="large"
              name="date"
              onChange={this.onChangeDateTime}
              ref={node => (this.dateTimeInput = node)}
            />
          </Col>
        </Row>
        */}
          <Button block={true} onClick={this.onStartOfDay}>Start of Day</Button>
          <Button block={true} onClick={this.onEndOfDay}>End of Day</Button>
        </Card>
      </div>
    );
  }
}
