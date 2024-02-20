import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
  let usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const onLogin = () => {
    navigate("/login", {
      replace: true,
    });
  };

  useEffect(() => {
    if (usuario) {
      setIsActive(true);
    }
    if (usuario.admin) {
      setIsAdmin(true);
    }
  }, []);

  const onLogout = () => {
    localStorage.setItem("usuarioLogueado", null);
    navigate("/login", {
      replace: true,
    });
  };

  const toAdmin = () => {
    navigate("/login", {
      replace: true,
    });
  };
  const toVentas = () => {
    navigate("/ventas", {
      replace: true,
    });
  };
  const toCompras = () => {
    navigate("/compras", {
      replace: true,
    });
  };
  const toStock = () => {
    navigate("/stock", {
      replace: true,
    });
  };
  const toCodigos = () => {
    navigate("/codigos", {
      replace: true,
    });
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-body sticky-top text-white"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <Link className="navbar-brand" to="/home">
                    
                    Gastón
                </Link> */}

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="navbar-collapse">
              <div className="navbar-nav">
                <NavLink
                  className={({ isActive }) =>
                    `nav-item nav-link ${isActive ? "active" : ""} `
                  }
                  to="/home"
                >
                  Sistema de Stock
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    `nav-item nav-link ${isActive ? "active" : ""} `
                  }
                  to="/ventas"
                >
                  Ventas
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `nav-item nav-link ${isActive ? "active" : ""} `
                  }
                  to="/compras"
                >
                  Ingresos
                </NavLink>
              </div>
            </div>

            <div className="row">
              {/* Sin loguear */}
              <div className="col-lg-4 col-12">
                {!usuario ? (
                  <Button variant="success" onClick={onLogin}>
                    Ingresar
                  </Button>
                ) : (
                  <div className="navbar-nav text-white">
                    <NavDropdown
                      title={`${usuario.nombre}`}
                      id="basic-nav-dropdown"
                      className="text-white"
                    >
                      {isAdmin ? (
                        <>
                          <NavDropdown.Item onClick={toAdmin}>
                            Administración
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={toStock}>
                            Control de Stock
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={toCodigos}>
                            Lista de Códigos
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={toVentas}>
                            Lista de Ventas
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={toCompras}>
                            Lista de Compras
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                        </>
                      ) : (
                        ``
                      )}
                      <Button
                        variant="danger"
                        onClick={onLogout}
                        className="mx-3"
                      >
                        Cerrar Sesión
                      </Button>
                    </NavDropdown>
                  </div>
                )}
              </div>
              {/* <div className="ms-lg-1 my-lg-0 mt-2 mb-1 col-lg-6 col-12">
                <Form>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        placeholder="Buscar"
                                        aria-label="Buscar"
                                        aria-describedby="button-addon2"
                                        value={formState.q}
                                        name="q"
                                        onChange={onInputChange}
                                        onKeyDown={enterPulsed}
                                    />
                                    <Button
                                        variant="btn btn-outline-secondary"
                                        type="button"
                                        id="button-addon2"
                                        onClick={toBusqueda}
                                    >
                                        <i className="bi bi-search"></i>
                                    </Button>
                                </InputGroup>
                            </Form>
              </div> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
