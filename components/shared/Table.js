import React from 'react';
import { message, Button } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const info = () => {
  message.info('Copied to clipboard');
};

const Table = ({ dateTime, tz }) => (
  <table className="table">
    <tbody>
      <tr>
        <td>
          <span className="box-header">Unix Seconds</span>
        </td>
        <td>
            {dateTime ? dateTime.format('X') : null}
        </td>
        <td align="right">
          <CopyToClipboard text={dateTime ? dateTime.format('X') : null} onCopy={info}>
            <Button type="dashed" size="small">Copy</Button>
          </CopyToClipboard>
        </td>
      </tr>
      <tr>
        <td>
          <span className="box-header">Unix Milliseconds</span>
        </td>
        <td>
          {dateTime ? dateTime.format('x') : null}
        </td>
        <td align="right">
          <CopyToClipboard
            text={dateTime ? dateTime.format('x') : null}
            onCopy={info}
          >
            <Button type="dashed" size="small">Copy</Button>
          </CopyToClipboard>
        </td>
      </tr>
      <tr>
        <td>
        <span className="box-header">{tz}</span>
        </td>
        <td>
          {dateTime
            ? dateTime.format('MMMM Do YYYY, h:mm:ss a zZ')
            : null}
        </td>
        <td align="right">
          <CopyToClipboard
            text={dateTime
              ? dateTime.format('MMMM Do YYYY, h:mm:ss a zZ')
              : null}
            onCopy={info}
          >
            <Button type="dashed" size="small">Copy</Button>
          </CopyToClipboard>
        </td>
      </tr>
      <tr>
        <td>
          <span className="box-header">UTC ISO 8601</span>
        </td>
        <td>
          {dateTime
            ? dateTime.clone().tz('utc').toISOString()
            : null}
        </td>
        <td align="right">
          <CopyToClipboard
            text={dateTime
              ? dateTime.clone().tz('utc').toISOString()
              : null}
            onCopy={info}
          >
            <Button type="dashed" size="small">Copy</Button>
          </CopyToClipboard>
        </td>
      </tr>
      <tr>
        <td>
          <span className="box-header">UTC RFC 2822</span>
        </td>
        <td>
          {dateTime
            ? dateTime.clone().tz('utc').toDate().toUTCString()
            : null}
        </td>
        <td align="right">
          <CopyToClipboard
            text={dateTime
              ? dateTime.clone().tz('utc').toDate().toUTCString()
              : null}
            onCopy={info}
          >
            <Button type="dashed" size="small">Copy</Button>
          </CopyToClipboard>
        </td>
      </tr>
    </tbody>
  </table>
);

export default Table;
