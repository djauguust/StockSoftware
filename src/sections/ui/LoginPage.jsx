import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../context/LoginContext";

export const LoginPage = () => {
  const [validated, setValidated] = useState(false);
  const { user, setUser, setToken, setIsLoggedIn } = useContext(LoginContext);
  const [usuarioLogueadoError, setUsuarioLogueadoError] = useState(false);

  const url = import.meta.env.VITE_URL_BACKEND;
  const navigate = useNavigate();

  const initialForm = {
    email: "",
    contrasenia: "",
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
    axios
      .post(`${url}/login`, datos)
      .then(({ data }) => {
        setIsLoggedIn(true);
        setUser(data.data);
        // Guardo el token en el estado o en el LocalStorage si es necesario
        const jwtToken = data.data.token;
        setUsuarioLogueadoError(false); // No olvides manejar el estado de error

        // Aquí puedes decidir si deseas guardar el token en el estado o en LocalStorage
        setToken(jwtToken);

        navigate("/", {
          replace: true,
        });
      })
      .catch(({ response }) => {
        setShowAlert(true)
        console.log(response);
        setIsLoggedIn(false);
        setUser(null);
        setToken(null);
      });
  };

  useEffect(() => {
    let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (usuarioLogueado) {
      navigate("/", {
        replace: true,
      });
    }
  }, []);

  const [showAlert, setShowAlert] = useState(false);

  const [waitAxios, setWaitAxios] = useState(false);

  return (
    <>
      <div className="p-5 mb-2 bg-dark text-white">
        <div className="container mt-5 col-6">
          <h1>Iniciar Sesión</h1>
          <Form noValidate validated={validated} onSubmit={onLogin}>
            <Form.Group className="mb-3" controlId="formemail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="email"
                value={formState.email}
                name="email"
                onChange={onInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPass">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={formState.contrasenia}
                name="contrasenia"
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
