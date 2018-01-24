import Head from 'next/head';
import { LocaleProvider, Divider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import stylesheet from '../styles/ant-theme-vars.less';
import Current from '../components/Current';
import Epoch from '../components/Epoch';
import DateToEpoch from '../components/DateToEpoch';

export default () => (
  <LocaleProvider locale={enUS}>
    <div>
      <Head>
        <link rel="stylesheet" href="/static/styles.css" />
      </Head>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1>Epoch converter</h1>
          </div>
          <div className="card-content">
            <Current />
            <Epoch />
            <DateToEpoch />
          </div>
          <div className="text-center">
            <a href="https://github.com/dinkbit/epoch/issues/new" target="_blank">feedback</a>
            <Divider type="vertical" />
            <a href="https://github.com/dinkbit/epoch" target="_blank">source</a>
          </div>
        </div>
      </div>
    </div>
  </LocaleProvider>
);
