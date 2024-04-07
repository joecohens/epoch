"use client"
import * as React from "react"
import moment from "moment-timezone"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"

import TimezoneSelector from '@/components/timezone-selector'
import Live from '@/components/live'
import EpochToDate from '@/components/epoch-to-date'
import DateToEpoch from '@/components/date-to-epoch'

export default function Page() {
  const currentDate: Date = new Date();
  const timezones: Array<string> = moment.tz.names();
  const initCurrentTz: string = moment.tz.guess();
  const initCurrentTimestamp = moment(currentDate).tz(initCurrentTz);
  const initCurrentDatetime = moment(currentDate).tz(initCurrentTz);

  // TODO: User router to get shareable values from querystring
  // const currentTz = query.tz && zones.indexOf(query.tz) > 0 ? query.tz : moment.tz.guess();
  // const currentTimestamp = query.timestamp ? moment.unix(query.timestamp).tz(currentTz) : moment(currentDate).tz(currentTz);
  // const currentDatetime = query.datetime ? moment.unix(query.datetime).tz(currentTz) : moment(currentDate).tz(currentTz);

  const [currentTz, setCurrentTz] = React.useState(initCurrentTz)
  const [currentTimestamp, setCurrentTimestamp] = React.useState(initCurrentTimestamp)
  const [currentDatetime, setCurrentDatetime] = React.useState(initCurrentDatetime)
  const [currentFormat, setCurrentFormat] = React.useState('x')
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const reset = () => {
    const newTimestamp = moment(currentDate).tz(currentTz);
    const newDatetime = moment(currentDate).tz(currentTz);

    setCurrentTimestamp(newTimestamp)
    setCurrentDatetime(newDatetime)
  }

  // const changeTz = (tz) => {
  //   setCurrentTz(tz)
  //   setCurrentTimestamp(currentTimestamp.clone().tz(tz))
  //   setCurrentDatetime(currentDatetime.clone().tz(tz))
  // }

  const changeTimestapAndFormat = (timestamp: string, format: string = 'x') => {
    setCurrentTimestamp(moment(timestamp).tz(currentTz))
    setCurrentFormat(format)
  }

  const changeDatetime = (datetime: string) => {
    setCurrentDatetime(moment(datetime).tz(currentTz))
  }

  const app = () => {
    return (
      <div className="flex justify-center">
        <div className="container max-w-3xl">
          <div className="card">
            <div className="card-header">
              <h1>Epoch converter</h1>
            </div>
            <div className="flex gap-x-1 mb-3">
              <TimezoneSelector timezones={timezones} currentTz={currentTz} setCurrentTz={setCurrentTz} />
              <Button variant="outline" onClick={() => reset()}>Reset</Button>
            </div>
            <div className="">
              <Live currentTz={currentTz} />
              <EpochToDate
                currentTz={currentTz}
                timestamp={currentTimestamp}
                format={currentFormat}
                handleChangeTimestamp={changeTimestapAndFormat}
              />
              <DateToEpoch
                currentTz={currentTz}
                datetime={currentDatetime}
                handleChangeDatetime={changeDatetime}
              />
            </div>
            <div className="text-center">
              <a
                href="https://github.com/dinkbit/epoch/issues/new"
                target="_blank"
              >
                feedback
              </a>
              <a href="https://github.com/dinkbit/epoch" target="_blank">
                source
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {!isClient ? "" : app()}
      <Toaster />
    </div>
  );
}


