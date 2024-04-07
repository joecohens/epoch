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

const FORMAT = moment.ISO_8601

export default function FromISO({
  currentTz,
  timestamp,
  handleChangeTimestamp,
}: Props) {
  const initTimestamp =
    typeof timestamp === 'string' || timestamp instanceof String
      ? moment(timestamp).tz(currentTz)
      : timestamp

  const [inputValue, setInputValue] = React.useState(initTimestamp.toISOString())
  const [errValue, setErrValue] = React.useState('')

  const onChangeTimestamp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)

    const selectedTimestamp = moment(value, FORMAT).tz(currentTz);

    if (!selectedTimestamp.isValid()) {
      setErrValue('Invalid ISO Date')
      return;
    }

    // if (selectedTimestamp.isSame(timestamp)) {
    //   return;
    // }

    handleChangeTimestamp(selectedTimestamp);
    setErrValue('')
  };


  return (
    <div className="mb-3" >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Convert from ISO Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            className="my-2"
            value={inputValue}
            onChange={onChangeTimestamp}
          />
          {errValue === '' ? '' : <span className="text-xs text-red-400">{errValue}</span>}
          <Table dateTime={timestamp} currentTz={currentTz} />
        </CardContent>
      </Card >
    </div>
  );
}
