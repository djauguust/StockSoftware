import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";

export const LoginPage = () => {
  const [validated, setValidated] = useState(false);

  const initialForm = {
    username: "",
    password: "",
  };

  const { formState, onInputChange, onResetForm } = useForm(initialForm);

  const onLogin = () => {
    console.log("onlogin funciona");
  };

  const enterPulsed = () => {
    console.log("enterpulsed funciona");
  };

  const [showAlert, setShowAlert] = useState(true);

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
                type="username"
                value={formState.username}
                name="username"
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
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <b>¡Usuario o Contraseña incorrectas!</b>
          </Alert>
          <Button variant="outline-success " onClick={onLogin} disabled={waitAxios}>
            Ingresar
          </Button>
        </div>
      </div>
    </>
  );
};
