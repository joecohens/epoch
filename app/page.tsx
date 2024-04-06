"use client";
import React from 'react';
// import { ConfigProvider, Divider, Select, Button } from 'antd';
// import enUS from 'antd/lib/locale-provider/en_US';
import moment from 'moment-timezone';
import Live from '@/components/Live';
import EpochToDate from '@/components/epoch-to-date';
import DateToEpoch from '@/components/date-to-epoch';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.changeTz = this.changeTz.bind(this);
    this.changeTimestapAndFormat = this.changeTimestapAndFormat.bind(this);
    this.clearTimestamp = this.clearTimestamp.bind(this);
    this.changeDatetime = this.changeDatetime.bind(this);
    this.clearDatetime = this.clearDatetime.bind(this);
    this.setSODDatetime = this.setSODDatetime.bind(this);
    this.setEODDatetime = this.setEODDatetime.bind(this);
    this.renderApp = this.renderApp.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    const currentDate = new Date();
    const zones = moment.tz.names();

    // TODO: User router to get shareable values from querystring
    // const currentTz = query.tz && zones.indexOf(query.tz) > 0 ? query.tz : moment.tz.guess();
    // const currentTimestamp = query.timestamp ? moment.unix(query.timestamp).tz(currentTz) : moment(currentDate).tz(currentTz);
    // const currentDatetime = query.datetime ? moment.unix(query.datetime).tz(currentTz) : moment(currentDate).tz(currentTz);

    const currentTz = moment.tz.guess();

    const currentTimestamp = moment(currentDate).tz(currentTz);
    const currentDatetime = moment(currentDate).tz(currentTz);

    const initialState = {
      zones,
      currentTz,
      currentTimestamp,
      currentFormat: 'x',
      currentDatetime,
    };

    this.setState({ ...initialState });
  }

  reset() {
    const currentTz = this.state.currentTz;
    const currentDate = new Date();
    const currentTimestamp = moment(currentDate).tz(currentTz);
    const currentDatetime = moment(currentDate).tz(currentTz);

    this.setState({
      currentTimestamp: currentTimestamp,
      currentDatetime: currentDatetime
    });
  }

  changeTz(tz) {
    this.setState({
      currentTz: tz,
      currentTimestamp: this.state.currentTimestamp.clone().tz(tz),
      currentDatetime: this.state.currentDatetime.clone().tz(tz)
    });
  }

  changeTimestapAndFormat(timestamp, format = 'x') {
    this.setState({
      currentTimestamp: moment(timestamp).tz(this.state.currentTz),
      currentFormat: format
    });
  }

  clearTimestamp() {
    this.setState({ currentTimestamp: '' });
  }

  changeDatetime(datetime) {
    this.setState({
      currentDatetime: moment(datetime).tz(this.state.currentTz)
    });
  }

  setSODDatetime() {
    this.setState({
      currentDatetime: this.state.currentDatetime.startOf('day')
    });
  }

  setEODDatetime() {
    this.setState({
      currentDatetime: this.state.currentDatetime.endOf('day')
    });
  }

  clearDatetime() {
    this.setState({ currentDatetime: '' });
  }

  renderApp() {
    const {
      zones,
      currentTz,
      currentTimestamp,
      currentFormat,
      currentDatetime
    } = this.state;

    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1>Epoch converter</h1>
          </div>
          {/*
          <div className="controls">
            <Select
              showSearch
              style={{ width: '70%' }}
              optionFilterProp="children"
              defaultValue={currentTz}
              name="select"
              onChange={this.changeTz}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {zones.map((zone, index) => (
                <Select.Option key={index} value={zone}>
                  {zone}
                </Select.Option>
              ))}
            </Select>
            <Button onClick={this.reset}>Reset to Current Date</Button>
          </div>
          */}
          <div className="card-content">
            <Live tz={currentTz} />
            <EpochToDate
              tz={currentTz}
              timestamp={currentTimestamp}
              format={currentFormat}
              handleChangeTimestamp={this.changeTimestapAndFormat}
              handleClearTimestamp={this.clearTimestamp}
            />
            <DateToEpoch
              tz={currentTz}
              datetime={currentDatetime}
              handleStartOfDay={this.setSODDatetime}
              handleEndOfDay={this.setEODDatetime}
              handleChangeDatetime={this.changeDatetime}
              handleClearDatetime={this.clearDatetime}
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
      </div >
    );
  }

  render() {
    return (
      <div>
        <div>
          {!this.state ? <div /> : this.renderApp()}
        </div>
        <style jsx global>{`
          html,
          body {
            height: 100%;
          }
          body > div:first-of-type {
            height: 100%;
          }
          body {
            font-weight: 400;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            box-sizing: border-box;
          }

          h1 {
            margin: 0;
          }

          .box-header {
            text-transform: uppercase;
            font-weight: bold;
            font-kerning: 1.5;
            font-size: 12px;
          }

          .container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1 1 auto;
            margin: 15px 0px;
          }

          .controls {
            padding: 0px 12px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
          }

          .card {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
          }

          .card-header {
            flex-shrink: 0;
            height: 48px;
            padding: 0px 10px;
            margin-bottom: 15px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
          }

          .card-content {
            padding: 15px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
          }

          .text-center {
            text-align: center;
          }

          .well {
            border-radius: 4px;
            border: 1px solid rgb(218, 225, 233);
          }

          .padding-sm {
            padding: 5px;
          }

          .padding-md {
            padding: 10px;
          }

          .padding-lg {
            padding: 15px;
          }

          .margin-sm {
            margin: 5px;
          }

          .margin-md {
            margin: 10px;
          }

          .margin-lg {
            margin: 15px;
          }

          .margin-top-sm {
            margin-top: 5px;
          }

          .margin-top-md {
            margin-top: 10px;
          }

          .margin-top-lg {
            margin-top: 15px;
          }

          .margin-bottom-sm {
            margin-bottom: 5px;
          }

          .margin-bottom-md {
            margin-bottom: 10px;
          }

          .margin-bottom-lg {
            margin-bottom: 15px;
          }

          .table {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
            display: table;
          }

          .table td, .table th {
            padding: 8px 2px;
            display: table-cell;
            vertical-align: top;
          }

          .uppercase {
            text-transform: uppercase;
          }

          .mobile {
            display: block !important;
          }

          .desktop {
            display: none !important;
          }

          @media only screen and (min-width: 640px) {
            .card {
              min-width: 640px;
            }

            .mobile {
              display: none !important;
            }

            .desktop {
              display: block !important;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Index;

