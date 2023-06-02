import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import chatRedux from "./Features/Chat"
import userProfileReducer from "./Features/Profile"
import Socketio from './Features/Socketio';
import Message from './Features/Message';
import HomePost from './Features/HomePost';
import CurrentPost from './Features/CurrentPost';
// 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({

  reducer: {
   socket:  Socketio, 
    chat: chatRedux,
    userprofile: userProfileReducer,
    privatemessagechat: Message,
    home_post: HomePost,
    current_post:CurrentPost,
  }

})

root.render(
  <React.StrictMode>
    <Provider store={store}>
   <BrowserRouter>
   <App />
  
    </BrowserRouter>
    </Provider>
 
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
