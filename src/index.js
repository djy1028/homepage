import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import './pages/homepage/pad.less';
import './pages/homepage/mobile.less';
import './pages/homepage/common.less';
import './pages/index/index.less';
import { IRouter } from './router.js';
import './lang/i18n'
import { Provider } from 'react-redux';
import store from './store/index.js';
import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css';

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})
ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryclient}>
      <IRouter />
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

