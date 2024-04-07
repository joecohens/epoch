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
  format: string,
  timestamp: moment.Moment,
  handleChangeTimestamp: Function,
}

export default function EpochToDate({
  currentTz,
  timestamp,
  format,
  handleChangeTimestamp,
}: Props) {
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

    handleChangeTimestamp(selectedTimestamp, format);
  };

  const currentTimestamp =
    (typeof timestamp === 'string' || timestamp instanceof String)
      ? moment(timestamp).tz(currentTz)
      : timestamp;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Convert to datetime
            <Input
              value={currentTimestamp ? currentTimestamp.format(format) : ''}
              onChange={onChangeTimestamp}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table dateTime={currentTimestamp} tz={currentTz} />
        </CardContent>
      </Card >
    </div>
  );
}