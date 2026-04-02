"use client"
import * as React from "react"
import { formatInTimeZone } from "date-fns-tz"
import { fromUnixTime } from "date-fns"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  const timezones: Array<{ name: string, utc: string }> = Intl.supportedValuesOf('timeZone').map(tz => {
    const utcOffset = formatInTimeZone(currentDate, tz, 'xxx');
    return { name: tz, utc: `UTC${utcOffset}` };
  });
  const initCurrentTz: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const initCurrentTimestamp = new Date(currentDate);
  const initCurrentDatetime = new Date(currentDate);
  const initCurrentISODatetime = new Date(currentDate);

  // TODO: User router to get shareable values from querystring
  // const currentTz = query.tz && zones.indexOf(query.tz) > 0 ? query.tz : Intl.DateTimeFormat().resolvedOptions().timeZone;
  // const currentTimestamp = query.timestamp ? fromUnixTime(query.timestamp) : new Date(currentDate);
  // const currentDatetime = query.datetime ? fromUnixTime(query.datetime) : new Date(currentDate);

  const { setTheme } = useTheme()
  const [currentTz, setCurrentTz] = React.useState(initCurrentTz)
  const [currentTimestamp, setCurrentTimestamp] = React.useState(initCurrentTimestamp)
  const [currentDatetime, setCurrentDatetime] = React.useState(initCurrentDatetime)
  const [currentISODatetime, setCurrentISODatetime] = React.useState(initCurrentISODatetime)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const reset = () => {
    const now = new Date();
    setCurrentTimestamp(new Date(now))
    setCurrentDatetime(new Date(now))
    setCurrentISODatetime(new Date(now))
  }

  const changeTimestap = (timestamp: Date) => {
    setCurrentTimestamp(timestamp)
  }

  const changeDatetime = (datetime: Date) => {
    setCurrentDatetime(datetime)
  }

  const changeISODatetime = (datetime: Date) => {
    setCurrentISODatetime(datetime)
  }

  const app = () => {
    return (
      <div className="flex justify-center">
        <div className="container max-w-3xl">
          <div>
            <div className="my-6 flex">
              <h1 className="text-3xl grow font-bold">Epoch Converter</h1>
              <div className="flex-none">
                <DropdownMenu >
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
