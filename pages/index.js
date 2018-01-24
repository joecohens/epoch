import Head from 'next/head';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import stylesheet from '../styles/ant-theme-vars.less';
import Current from '../components/Current';
import Epoch from '../components/Epoch';
import DateToEpoch from '../components/DateToEpoch';

/*
  for development you can use this instead of link to extracted css
  <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
 */

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
        </div>
      </div>
    </div>
  </LocaleProvider>
);
