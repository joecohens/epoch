import * as React from "react"
import moment from 'moment-timezone'
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Table from '@/components/shared/table';

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Convert to datetime
              <Input
                value={currentTimestamp ? currentTimestamp.format(format) : ''}
                onChange={this.onChangeTimestamp}
                ref={node => (this.timestampInput = node)}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table dateTime={currentTimestamp} tz={tz} />
          </CardContent>
        </Card >
      </div>
    );
  }
}
