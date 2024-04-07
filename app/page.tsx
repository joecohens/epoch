"use client"
import * as React from "react"
import moment from "moment-timezone"
import { Toaster } from "@/components/ui/toaster"

import TimezoneSelector from '@/components/timezone-selector'
import Live from '@/components/live'
import EpochToDate from '@/components/epoch-to-date'
import DateToEpoch from '@/components/date-to-epoch'

export default function Page() {
  const currentDate = new Date();
  const timezones = moment.tz.names();
  const initCurrentTz = moment.tz.guess();
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

  const reset = e => {
    // const newDate = new Date();
    const newTimestamp = moment(currentDate).tz(currentTz);
    const newDatetime = moment(currentDate).tz(currentTz);

    setCurrentTimestamp(newTimestamp)
    setCurrentDatetime(newDatetime)
  }

  const changeTz = (tz) => {
    setCurrentTz(tz)
    setCurrentTimestamp(currentTimestamp.clone().tz(tz))
    setCurrentDatetime(currentDatetime.clone().tz(tz))
  }

  const changeTimestapAndFormat = (timestamp, format = 'x') => {
    setState({
      currentTimestamp: moment(timestamp).tz(state.currentTz),
      currentFormat: format
    });
  }

  const clearTimestamp = () => {
    setCurrentTimestamp('')
  }

  const changeDatetime = (datetime) => {
    setCurrentDatetime(moment(datetime).tz(currentTz))
  }

  const setSODDatetime = () => {
    setCurrentDatetime(currentDatetime.startOf('day'))
  }

  const setEODDatetime = () => {
    setCurrentDatetime(currentDatetime.endOf('day'))
  }

  const clearDatetime = () => {
    setCurrentDatetime('')
  }

  const app = () => {
    return (
      <div>
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h1>Epoch converter</h1>
            </div>
            <div className="controls">
              <TimezoneSelector timezones={timezones} currentTz={currentTz} setCurrentTz={setCurrentTz} />
            </div>
            <div className="card-content">
              <Live tz={currentTz} />
              <EpochToDate
                tz={currentTz}
                timestamp={currentTimestamp}
                format={currentFormat}
                handleChangeTimestamp={changeTimestapAndFormat}
                handleClearTimestamp={clearTimestamp}
              />
              <DateToEpoch
                tz={currentTz}
                datetime={currentDatetime}
                handleStartOfDay={setSODDatetime}
                handleEndOfDay={setEODDatetime}
                handleChangeDatetime={changeDatetime}
                handleClearDatetime={clearDatetime}
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


