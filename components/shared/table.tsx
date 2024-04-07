"use client"

import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Copy as CopyIcon } from "lucide-react"

const info = (toast: Function) => {
  //toast({ title: 'Copied to clipboard' });
};

const Table = ({ dateTime, tz }) => {
  const { toast } = useToast()

  return (<table className="table">
    <tbody>
      <tr>
        <td className="desktop">
          <span className="box-header">Unix Seconds</span>
        </td>
        <td>
          <span className="box-header mobile">Unix Seconds</span>
          {dateTime ? dateTime.format('X') : null}
        </td>
        <td align="right">
          <CopyToClipboard
            text={dateTime ? dateTime.format('X') : null} onCopy={info(toast)}>
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
            text={dateTime ? dateTime.format('x') : null}
            onCopy={info(toast)}
          >
            <Button variant="outline" size="sm">
              <CopyIcon size={14} />
            </Button>
          </CopyToClipboard>
        </td>
      </tr>
      <tr>
        <td className="desktop">
          <span className="box-header">{tz}</span>
        </td>
        <td>
          <span className="box-header mobile">{tz}</span>
          {dateTime
            ? dateTime.format('MMMM Do YYYY, h:mm:ss a zZ')
            : null}
        </td>
        <td align="right">
          <CopyToClipboard
            text={dateTime
              ? dateTime.format('MMMM Do YYYY, h:mm:ss a zZ')
              : null}
            onCopy={info(toast)}
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
              : null}
            onCopy={info(toast)}
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
            : null}
        </td>
        <td align="right">
          <CopyToClipboard
            text={dateTime
              ? dateTime.clone().tz('utc').toDate().toUTCString()
              : null}
            onCopy={info(toast)}
          >
            <Button variant="outline" size="sm">
              <CopyIcon size={14} />
            </Button>
          </CopyToClipboard>
        </td>
      </tr>
    </tbody>
  </table>)
};

export default Table;
