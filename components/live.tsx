"use client"
import * as React from "react"
import moment from "moment"
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
  const [timestamp, setTimestamp] = React.useState(moment().tz(currentTz))

  const tick = React.useCallback(() => {
    setTimestamp(moment().tz(currentTz))
  }, [setTimestamp, currentTz]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      tick()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [tick])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Unix Seconds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {timestamp ? timestamp.format('X') : null}
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
            {timestamp ? timestamp.format('x') : null}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Current Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {timestamp ? timestamp.format('YYYY-MM-DD HH:mm:ss') : null}
          </div>
        </CardContent>
      </Card>
    </div >
  );
}
