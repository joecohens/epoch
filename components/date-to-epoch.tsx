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

export default function DateToEpoch({
  currentTz,
  datetime,
  handleChangeDatetime,
}: Props) {
  const [date, setDate] = React.useState<Date>(datetime.toDate());

  const onChangeDateTime = (value: any) => {
    const selectedDatetime = moment(value).tz(currentTz);

    if (selectedDatetime && !selectedDatetime.isValid()) {
      return;
    }

    const currentDatetime =
      typeof datetime === 'string' || datetime instanceof String
        ? moment(datetime).tz(currentTz)
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Convert to timestamp
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
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
                  onSelect={onChangeDateTime}
                  initialFocus
                />
                <div className="p-3 border-t border-border">
                  <TimePicker setDate={onChangeDateTime} date={date} />
                </div>
              </PopoverContent>
            </Popover>
            <Button onClick={() => setSODDatetime()}>Start of Day</Button>
            <Button onClick={() => setEODDatetime()}>End of Day</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table dateTime={currentDatetime} tz={currentTz} />
        </CardContent>
      </Card>
    </div>
  );
}
