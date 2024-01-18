import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
    const [user, setuser] = useState(null)
    return (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
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
                GASTÓN
                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo01"
                >
                    <div className="navbar-collapse">
                        <div className="navbar-nav">
                            {/* <NavLink
                                className={({ isActive }) =>
                                    `nav-item nav-link ${isActive ? "active" : ""
                                    } `
                                }
                                to="/home"
                            >
                                Inicio
                            </NavLink>

                            <NavLink
                                className={({ isActive }) =>
                                    `nav-item nav-link ${isActive ? "active" : ""
                                    } `
                                }
                                to="/carrera"
                            >
                                Ingeniería en Computación
                            </NavLink> */}

                            
                        </div>
                    </div>

                    <div className="row">

                        {/* Sin loguear */}
                        <div className="col-lg-4 col-12">
                            {!user ? (
                                <Button variant="success" /* onClick={onLogin} */>
                                    Ingresar
                                </Button>
                            ) : (
                                <div className="navbar-nav">
                                    <NavDropdown
                                        title={`${user.nombres}`}
                                        id="basic-nav-dropdown"
                                    >
                                        <NavDropdown.Item
                                            onClick={toPerfil}
                                        >
                                            Perfil
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={toConfiguracion}
                                        >
                                            Configuración
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="">
                                            <Button
                                                variant="danger"
                                                onClick={onLogout}
                                            >
                                                Cerrar Sesión
                                            </Button>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            )}
                        </div>
                        <div className="ms-lg-1 my-lg-0 mt-2 mb-1 col-lg-6 col-12">
                            {/* <Form>
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
                            </Form> */}
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    </>
    )
}
