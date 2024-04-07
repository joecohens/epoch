"use client"
import * as React from "react"
import moment from "moment-timezone"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import TimezoneSelector from '@/components/timezone-selector'
import Live from '@/components/live'
import FromTimestamp from '@/components/from-timestamp'
import FromDatetime from '@/components/from-datetime'
import FromISO from '@/components/from-iso'

export default function Page() {
  const currentDate: Date = new Date();
  const timezones: Array<string> = moment.tz.names();
  const initCurrentTz: string = moment.tz.guess();
  const initCurrentTimestamp = moment(currentDate).tz(initCurrentTz);
  const initCurrentDatetime = moment(currentDate).tz(initCurrentTz);
  const initCurrentISODatetime = moment(currentDate).tz(initCurrentTz);

  // TODO: User router to get shareable values from querystring
  // const currentTz = query.tz && zones.indexOf(query.tz) > 0 ? query.tz : moment.tz.guess();
  // const currentTimestamp = query.timestamp ? moment.unix(query.timestamp).tz(currentTz) : moment(currentDate).tz(currentTz);
  // const currentDatetime = query.datetime ? moment.unix(query.datetime).tz(currentTz) : moment(currentDate).tz(currentTz);

  const [currentTz, setCurrentTz] = React.useState(initCurrentTz)
  const [currentTimestamp, setCurrentTimestamp] = React.useState(initCurrentTimestamp)
  const [currentDatetime, setCurrentDatetime] = React.useState(initCurrentDatetime)
  const [currentISODatetime, setCurrentISODatetime] = React.useState(initCurrentISODatetime)
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

  const changeTimestap = (timestamp: string) => {
    setCurrentTimestamp(moment(timestamp).tz(currentTz))
  }

  const changeDatetime = (datetime: string) => {
    setCurrentDatetime(moment(datetime).tz(currentTz))
  }

  const changeISODatetime = (datetime: string) => {
    setCurrentISODatetime(moment(datetime).tz(currentTz))
  }

  const app = () => {
    return (
      <div className="flex justify-center">
        <div className="container max-w-3xl">
          <div>
            <div className="my-4">
              <h1 className="text-3xl font-bold">Epoch converter</h1>
            </div>
            <div className="flex gap-x-1 mb-3">
              <TimezoneSelector timezones={timezones} currentTz={currentTz} setCurrentTz={setCurrentTz} />
              <Button variant="outline" onClick={() => reset()}>Reset</Button>
            </div>
            <div>
              <Live currentTz={currentTz} />
              <Tabs defaultValue="timestamp" className="w-auto">
                <TabsList>
                  <TabsTrigger value="timestamp">Timestamp</TabsTrigger>
                  <TabsTrigger value="datetime">Datetime</TabsTrigger>
                  <TabsTrigger value="iso">ISO Date</TabsTrigger>
                </TabsList>
                <TabsContent value="timestamp">
                  <FromTimestamp
                    currentTz={currentTz}
                    timestamp={currentTimestamp}
                    handleChangeTimestamp={changeTimestap}
                  />
                </TabsContent>
                <TabsContent value="datetime">
                  <FromDatetime
                    currentTz={currentTz}
                    datetime={currentDatetime}
                    handleChangeDatetime={changeDatetime}
                  />
                </TabsContent>
                <TabsContent value="iso">
                  <FromISO
                    currentTz={currentTz}
                    timestamp={currentISODatetime}
                    handleChangeTimestamp={changeISODatetime}
                  />
                </TabsContent>
              </Tabs>
            </div>
            <div className="text-center flex justify-center gap-x-2 text-sm mb-3">
              <a
                href="https://github.com/joecohens/epoch/issues/new"
                target="_blank"
              >
                feedback
              </a>
              <a href="https://github.com/joecohens/epoch"
                target="_blank"
              >
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


