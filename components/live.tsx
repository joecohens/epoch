"use client"
import * as React from "react"
import { getUnixTime, getTime } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Props {
  currentTz: string
}

export default function Live({ currentTz }: Props) {
  const [timestamp, setTimestamp] = React.useState(new Date())

  const tick = React.useCallback(() => {
    setTimestamp(new Date())
  }, [setTimestamp]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      tick()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [tick])

  return (
    <div className="mb-3">
      <Card className="mb-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Current Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {timestamp ? formatInTimeZone(timestamp, currentTz, 'yyyy-MM-dd HH:mm:ss') : null}
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unix Seconds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timestamp ? getUnixTime(timestamp) : null}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unix Milliseconds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timestamp ? getTime(timestamp) : null}
            </div>
          </CardContent>
        </Card>
      </div >

    </div>
  );
}
