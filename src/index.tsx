import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import chatRedux from "./Redux/Chat";
import userProfileReducer from "./Redux/Profile";
import Socketio from "./Redux/Socketio";
import Message from "./Redux/Message";
import HomePost from "./Redux/HomePost";
import CurrentPost from "./Redux/CurrentPost";
import Postdecision from "./Redux/Postdecision";
import SuggestedUser from "./Redux/SuggestedUser";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import ru from "javascript-time-ago/locale/ru.json"
import  ErrorSlice from "./Redux/Error";
import { SocketProvider } from "./Socket"


TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = configureStore({
  reducer: {
    socket: Socketio,
    chat: chatRedux,
    userprofile: userProfileReducer,
    privatemessagechat: Message,
    home_post: HomePost,
    current_post: CurrentPost,
    postdecision: Postdecision,
    suggested_user: SuggestedUser,
    texty_error:ErrorSlice
  },
});

root.render(
  <React.StrictMode>
    <SocketProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </SocketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
