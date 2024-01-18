import React from "react";
import { ListaCodigos } from "./sections/ListaCodigos/ListaCodigos";
import { ListaCompras } from "./sections/ListaCompras/ListaCompras";

export const App = () => {
  return (
    <>
      <div className="container-fluid mx-5">
        <ListaCompras />
      </div>
    </>
  );
};
