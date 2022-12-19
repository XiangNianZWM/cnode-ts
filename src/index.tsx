import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./pages/App/App";
import "./Style/Index.scss";
import './Components/Message/_style.scss'
import AutoScorllTop from "./Utils/utils/AutoScrollTop";



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <AutoScorllTop>
      <App />
    </AutoScorllTop>
  </BrowserRouter>
);
