import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import './i18n/configs';
import { Provider } from 'react-redux';
import rootstore from './redux/store';
import axios from 'axios';
import { Spin } from 'antd';

import { PersistGate } from 'redux-persist/integration/react';

axios.defaults.headers['x-icode'] = 'E42FDCBA16541BB0';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootstore.store}>
      {/* <PersistGate loading={null}> 传入null显示白屏*/}
      <PersistGate loading={Spin} persistor={rootstore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
