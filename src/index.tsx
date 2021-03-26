import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { FirebaseProvider } from "./context/firebase";
import { UserProvider } from "./context/user";
import { ModalProvider } from "./context/modal";

import Modal from "./components/modal";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <UserProvider>
        <ModalProvider>
          <Modal />
          <App />
        </ModalProvider>
      </UserProvider>
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
