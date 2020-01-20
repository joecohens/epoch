import React from 'react';

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
      </tr>
      <tr>
        <td>
          <span className="box-header">Unix Minutes</span>
        </td>
        <td>
          {dateTime ? dateTime.format('x') : null}
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
      </tr>
    </tbody>
  </table>
);

export default Table;
