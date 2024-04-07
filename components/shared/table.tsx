"use client"

import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Copy as CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Props {
  dateTime: moment.Moment,
  currentTz: string,
}

const COPY_TEXT = 'Copied to clipboard'

export default function Table({ dateTime, currentTz }: Props) {
  const { toast } = useToast()

  return (
    <table className="table">
      <tbody>
        <tr>
          <td className="desktop">
            <span className="box-header">Unix Seconds</span>
          </td>
          <td>
            <span className="box-header mobile">Unix Seconds</span>
            {dateTime ? dateTime.format('X') : ""}
          </td>
          <td align="right">
            <CopyToClipboard
              text={dateTime ? dateTime.format('X') : ""}
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
            {dateTime ? dateTime.format('x') : null}
          </td>
          <td align="right">
            <CopyToClipboard
              text={dateTime ? dateTime.format('x') : ""}
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
            {dateTime
              ? dateTime.format('MMMM Do YYYY, h:mm:ss a zZ')
              : ""}
          </td>
          <td align="right">
            <CopyToClipboard
              text={dateTime
                ? dateTime.format('MMMM Do YYYY, h:mm:ss a zZ')
                : ""}
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
            {dateTime
              ? dateTime.clone().tz('utc').toISOString()
              : null}
          </td>
          <td align="right">
            <CopyToClipboard
              text={dateTime
                ? dateTime.clone().tz('utc').toISOString()
                : ""}
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
            {dateTime
              ? dateTime.clone().tz('utc').toDate().toUTCString()
              : ""}
          </td>
          <td align="right">
            <CopyToClipboard
              text={dateTime
                ? dateTime.clone().tz('utc').toDate().toUTCString()
                : ""}
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

