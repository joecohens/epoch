"use client"

import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Copy as CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { getUnixTime, getTime } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

interface Props {
  dateTime: Date,
  currentTz: string,
}

const COPY_TEXT = 'Copied to clipboard'

export default function Table({ dateTime, currentTz }: Props) {
  const { toast } = useToast()

  const unixSeconds = dateTime ? getUnixTime(dateTime).toString() : ""
  const unixMs = dateTime ? getTime(dateTime).toString() : ""
  const humanReadable = dateTime
    ? formatInTimeZone(dateTime, currentTz, "MMMM do yyyy, h:mm:ss a zzz xxx")
    : ""
  const utcIso = dateTime ? dateTime.toISOString() : ""
  const utcRfc = dateTime ? dateTime.toUTCString() : ""

  return (
    <table className="table">
      <tbody>
        <tr>
          <td className="desktop">
            <span className="box-header">Unix Seconds</span>
          </td>
          <td>
            <span className="box-header mobile">Unix Seconds</span>
            {unixSeconds}
          </td>
          <td align="right">
            <CopyToClipboard
              text={unixSeconds}
              onCopy={() => toast({ title: COPY_TEXT })}
            >
              <Button variant="outline" size="sm">
                <CopyIcon size={14} />
              </Button>
            </CopyToClipboard>
          </td>
        </tr>
        <tr>
          <td className="desktop">
            <span className="box-header">Unix Milliseconds</span>
          </td>
          <td>
            <span className="box-header mobile">Unix Milliseconds</span>
            {unixMs}
          </td>
          <td align="right">
            <CopyToClipboard
              text={unixMs}
              onCopy={() => toast({ title: COPY_TEXT })}
            >
              <Button variant="outline" size="sm">
                <CopyIcon size={14} />
              </Button>
            </CopyToClipboard>
          </td>
        </tr>
        <tr>
          <td className="desktop">
            <span className="box-header">{currentTz}</span>
          </td>
          <td>
            <span className="box-header mobile">{currentTz}</span>
            {humanReadable}
          </td>
          <td align="right">
            <CopyToClipboard
              text={humanReadable}
              onCopy={() => toast({ title: COPY_TEXT })}
            >
              <Button variant="outline" size="sm">
                <CopyIcon size={14} />
              </Button>
            </CopyToClipboard>
          </td>
        </tr>
        <tr>
          <td className="desktop">
            <span className="box-header">UTC ISO 8601</span>
          </td>
          <td>
            <span className="box-header mobile">UTC ISO 8601</span>
            {utcIso}
          </td>
          <td align="right">
            <CopyToClipboard
              text={utcIso}
              onCopy={() => toast({ title: COPY_TEXT })}
            >
              <Button variant="outline" size="sm">
                <CopyIcon size={14} />
              </Button>
            </CopyToClipboard>
          </td>
        </tr>
        <tr>
          <td className="desktop">
            <span className="box-header">UTC RFC 2822</span>
          </td>
          <td>
            <span className="box-header mobile">UTC RFC 2822</span>
            {utcRfc}
          </td>
          <td align="right">
            <CopyToClipboard
              text={utcRfc}
              onCopy={() => toast({ title: COPY_TEXT })}
            >
              <Button variant="outline" size="sm">
                <CopyIcon size={14} />
              </Button>
            </CopyToClipboard>
          </td>
        </tr>
      </tbody>
    </table>
  )
};
