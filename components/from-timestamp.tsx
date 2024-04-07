import * as React from "react"
import moment from "moment-timezone"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Table from '@/components/shared/table';

interface Props {
  currentTz: string,
  timestamp: moment.Moment,
  handleChangeTimestamp: Function,
}

export default function FromTimestamp({
  currentTz,
  timestamp,
  handleChangeTimestamp,
}: Props) {
  const [format, setFormat] = React.useState('x')

  const onChangeTimestamp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const format = value && value.length > 10 ? 'x' : 'X';
    const selectedTimestamp = moment(e.target.value, format).tz(currentTz);

    if (selectedTimestamp && !selectedTimestamp.isValid()) {
      return;
    }

    const currentTimestamp =
      typeof timestamp === 'string' || timestamp instanceof String
        ? moment(timestamp).tz(currentTz)
        : timestamp;

    if (selectedTimestamp && selectedTimestamp.isSame(currentTimestamp)) {
      return;
    }

    setFormat(format)
    handleChangeTimestamp(selectedTimestamp);
  };

  const currentTimestamp =
    (typeof timestamp === 'string' || timestamp instanceof String)
      ? moment(timestamp).tz(currentTz)
      : timestamp;

  return (
    <div className="mb-3" >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Convert from Timestamp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            className="my-2"
            value={currentTimestamp ? currentTimestamp.format(format) : ''}
            onChange={onChangeTimestamp}
          />
          <Table dateTime={currentTimestamp} currentTz={currentTz} />
        </CardContent>
      </Card >
    </div>
  );
}
