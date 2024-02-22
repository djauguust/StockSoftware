import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../ui/LoginPage";
import { App } from "../../App";
import { ListaVentas } from "../ListaVentas/ListaVentas";
import { ListaCompras } from "../ListaCompras/ListaCompras";
import { ListaStock } from "../ListaStock/ListaStock";
import { ListaCodigos } from "../ListaCodigos/ListaCodigos";
import { UIVentas } from "../ListaVentas/UIVentas";
import { Navbar } from "../ui/Navbar";
import { LoginContext } from "../../context/LoginContext";

export const RouterApp = () => {
  // LoginContext
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const state = { isLoggedIn, setIsLoggedIn, user, setUser, token, setToken };
  console.log(user);
  return (
    <LoginContext.Provider value={state}>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<InicioPage />} /> */}
        {user ? (
          <>
            <Route path="/ventas" element={<UIVentas />} />
            <Route path="/listaVentas" element={<ListaVentas />} />
            <Route path="/compras" element={<ListaCompras />} />
            <Route path="/stock" element={<ListaStock />} />
            <Route path="/codigos" element={<ListaCodigos />} />
          </>
        ) : (
          <Route path="login" element={<LoginPage />} />
        )}
        <Route path="/*" element={<App />} />
      </Routes>
    </LoginContext.Provider>
  );
};
