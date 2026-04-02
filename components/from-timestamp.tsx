import * as React from "react"
import { getUnixTime, getTime, fromUnixTime, isValid, isEqual } from "date-fns"
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
  timestamp: Date,
  handleChangeTimestamp: Function,
}

export default function FromTimestamp({
  currentTz,
  timestamp,
  handleChangeTimestamp,
}: Props) {
  const [format, setFormat] = React.useState<'s' | 'ms'>('ms')

  const onChangeTimestamp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number(value);

    if (isNaN(numValue) || value.trim() === '') {
      return;
    }

    const isMilliseconds = value.length > 10;
    const selectedTimestamp = isMilliseconds
      ? new Date(numValue)
      : fromUnixTime(numValue);

    if (!isValid(selectedTimestamp) || isNaN(selectedTimestamp.getTime())) {
      return;
    }

    const currentTimestamp =
      typeof timestamp === 'string' || timestamp instanceof String
        ? new Date(timestamp as unknown as string)
        : timestamp;

    if (isEqual(selectedTimestamp, currentTimestamp)) {
      return;
    }

    setFormat(isMilliseconds ? 'ms' : 's')
    handleChangeTimestamp(selectedTimestamp);
  };

  const currentTimestamp =
    (typeof timestamp === 'string' || timestamp instanceof String)
      ? new Date(timestamp as unknown as string)
      : timestamp;

  const displayValue = currentTimestamp
    ? (format === 'ms' ? getTime(currentTimestamp).toString() : getUnixTime(currentTimestamp).toString())
    : '';

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
            value={displayValue}
            onChange={onChangeTimestamp}
          />
          <Table dateTime={currentTimestamp} currentTz={currentTz} />
        </CardContent>
      </Card >
    </div>
  );
}
