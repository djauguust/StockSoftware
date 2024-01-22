import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";

/* Anexo LocalStorage: esto me permite controlar que siempre estén los 3 usuarios presentes */
let usuario = JSON.parse(localStorage.getItem("usuario"));
if (!usuario) {
  let usuarios = [
    { user: "gaston", password: "gaston" },
    { user: "diurno", password: "diurno" },
    { user: "nocturno", password: "nocturno" },
  ];
  localStorage.setItem("usuario", JSON.stringify(usuarios));
}
/* Fin anexo LocalStorage */

export const LoginPage = () => {
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const initialForm = {
    user: "",
    password: "",
  };

  const { formState, onInputChange, onResetForm } = useForm(initialForm);

  const onLogin = () => {
    loguearse(formState);
  };

  const enterPulsed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      loguearse(formState);
    }
  };

  const loguearse = (datos) => {
    /* Abajo iría la consulta al backend */
    let logueo = usuario.find(
      (p) => p.user == datos.user && p.password == datos.password
    );
    if (!logueo) {
      setShowAlert(true);
      console.log("error");
    } else {
      console.log("logueo");
      navigate("/", {
        replace: true,
      });
    }
    /* Arriba iría la consulta al backend */
  };

  const [showAlert, setShowAlert] = useState(false);

  const [waitAxios, setWaitAxios] = useState(false);

  return (
    <>
      <div className="p-5 mb-2 bg-dark text-white">
        <div className="container mt-5 col-6">
          <h1>Iniciar Sesión</h1>
          <Form noValidate validated={validated} onSubmit={onLogin}>
            <Form.Group className="mb-3" controlId="formUser">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="user"
                value={formState.user}
                name="user"
                onChange={onInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPass">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={formState.password}
                name="password"
                onChange={onInputChange}
                onKeyDown={enterPulsed}
                required
              />
            </Form.Group>
          </Form>
          {showAlert && (
            <>
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <b>¡Usuario o Contraseña incorrectas!</b>
              </Alert>
            </>
          )}
          <Button
            variant="outline-success "
            onClick={onLogin}
            disabled={waitAxios}
          >
            Ingresar
          </Button>
        </div>
      </div>
    </>
  );
};
