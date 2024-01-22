import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../ui/LoginPage";
import { App } from "../../App";

export const RouterApp = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<InicioPage />} /> */}
      <Route path="login" element={<LoginPage />} />
      <Route path="/*" element={<App />} />
      <Route path="/" element={<App />} />
    </Routes>
  );
};
