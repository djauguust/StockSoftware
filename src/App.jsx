import React from "react";
import { ListaCodigos } from "./sections/ListaCodigos/ListaCodigos";
import { ListaCompras } from "./sections/ListaCompras/ListaCompras";
import { ListaVentas } from "./sections/ListaVentas/ListaVentas";
import { ListaStock } from "./sections/ListaStock/ListaStock";
import { LoginPage } from "./sections/ui/LoginPage";

export const App = () => {
  return (
    <>
      <div className="container-fluid px-5">
        <ListaStock />
        <ListaVentas />
        <ListaCompras />
        <ListaCodigos />
      </div>
    </>
  );
};
