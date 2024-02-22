import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../ui/LoginPage";
import { App } from "../../App";
import { ListaVentas } from "../ListaVentas/ListaVentas";
import { ListaCompras } from "../ListaCompras/ListaCompras";
import { ListaStock } from "../ListaStock/ListaStock";
import { ListaCodigos } from "../ListaCodigos/ListaCodigos";
import { UIVentas } from "../ListaVentas/UIVentas";

export const RouterApp = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<InicioPage />} /> */}
      <Route path="login" element={<LoginPage />} />
      <Route path="/*" element={<App />} />
      <Route path="/ventas" element={<UIVentas />} />
      <Route path="/listaVentas" element={<ListaVentas />} />
      <Route path="/compras" element={<ListaCompras />} />
      <Route path="/stock" element={<ListaStock />} />
      <Route path="/codigos" element={<ListaCodigos />} />
    </Routes>
  );
};
