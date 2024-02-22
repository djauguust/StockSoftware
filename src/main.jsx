import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { RouterApp } from "./sections/router/RouterApp";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "./sections/ui/Footer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RouterApp />
      <Footer />
    </BrowserRouter>
    <div className="my-4"></div>
  </React.StrictMode>
);
