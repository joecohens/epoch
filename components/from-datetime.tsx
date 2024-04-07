import React from 'react'
import moment from 'moment'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "@/components/custom/time-picker";


import Table from '@/components/shared/table'

interface Props {
  currentTz: string,
  datetime: moment.Moment,
  handleChangeDatetime: Function,
}

export default function FromDatetime({
  currentTz,
  datetime,
  handleChangeDatetime,
}: Props) {
  const [date, setDate] = React.useState<Date>(datetime.toDate());

  const onChangeDate = (value: any) => {
    const selectedDatetime = moment(value).tz(currentTz);

    if (selectedDatetime && !selectedDatetime.isValid()) {
      return;
    }

    const currentDatetime =
      typeof datetime === 'string' || datetime instanceof String
        ? moment(datetime).milliseconds(0).tz(currentTz)
        : datetime;

    if (selectedDatetime && selectedDatetime.isSame(currentDatetime)) {
      return;
    }

    handleChangeDatetime(selectedDatetime.set({
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    }));
    setDate(selectedDatetime.toDate())
  }

  const onChangeTime = (value: any) => {
    const selectedDatetime = moment(value).tz(currentTz);

    if (selectedDatetime && !selectedDatetime.isValid()) {
      return;
    }

    const currentDatetime =
      typeof datetime === 'string' || datetime instanceof String
        ? moment(datetime).milliseconds(0).tz(currentTz)
        : datetime;

    if (selectedDatetime && selectedDatetime.isSame(currentDatetime)) {
      return;
    }

    handleChangeDatetime(selectedDatetime);
    setDate(selectedDatetime.toDate())
  }

  const setSODDatetime = () => {
    handleChangeDatetime(datetime.startOf('day'))
    setDate(datetime.toDate())
  }

  const setEODDatetime = () => {
    handleChangeDatetime(datetime.endOf('day'))
    setDate(datetime.toDate())
  }

  const currentDatetime =
    (typeof datetime === 'string' || datetime instanceof String)
      ? moment(datetime).tz(currentTz)
      : datetime;

  return (
    <div className="mb-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Convert from Datetime
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-x-1 my-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={onChangeDate}
                  initialFocus
                />
                <div className="p-3 border-t border-border">
                  <TimePicker setDate={onChangeTime} date={date} />
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="outline" onClick={() => setSODDatetime()}>Start of Day</Button>
            <Button variant="outline" onClick={() => setEODDatetime()}>End of Day</Button>
          </div>
          <Table dateTime={currentDatetime} currentTz={currentTz} />
        </CardContent>
      </Card>
    </div>
  );
}
