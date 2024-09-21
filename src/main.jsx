import React from 'react';
import { createRoot } from 'react-dom/client'; // اضافه کردن createRoot
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';

const container = document.getElementById('root');
const root = createRoot(container); // استفاده از createRoot به جای render

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
