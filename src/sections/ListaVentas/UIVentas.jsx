import React, { Fragment, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";

export const UIVentas = () => {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    // Función para actualizar la hora
    const actualizarHora = () => {
      setHora(new Date());
    };

    // Actualiza la hora cada segundo
    const intervalo = setInterval(actualizarHora, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalo);
  }, []); // El segundo argumento del useEffect está vacío para que solo se ejecute una vez al montar el componente

  // Función para formatear la hora en formato legible
  const formatearHora = (date) => {
    const horas = date.getHours();
    const minutos = date.getMinutes();
    const segundos = date.getSeconds();
    return `${horas < 10 ? `0${horas}` : horas}:${minutos < 10 ? `0${minutos}` : minutos
      }:${segundos < 10 ? `0${segundos}` : segundos}`;
  };
  const formatearFecha = (date) => {
    const dia = date.getDate();
    const mes = date.getMonth();
    const anio = date.getFullYear();

    return `${dia}/${mes + 1}/${anio}`;
  };
  const initialForm = {
    searchText: "",
    code: "",
    description: "",
  };
  const { formState, onInputChange, onResetForm, setFormState } =
    useForm(initialForm);

    const [lista, setLista] = useState(null)
  return (
    <Fragment>
      <Row className="my-3 mx-5">
        <Col>
          <b>
            <h3>
              <Row>{formatearFecha(hora)}</Row>
              <Row>{formatearHora(hora)}</Row>
            </h3>
          </b>
        </Col>
        <Col xs={9}>
          <h2>Ventas</h2>
        </Col>
      </Row>
      <hr />
      <Row className="container-fluid">
        <div className="row px-5 container-fluid">
          <div className="col-4">
            <Form.Group className="mb-3" controlId="formCodBarra">
              <Form.Label><h5>Cantidad</h5></Form.Label>
              <Form.Control
                type="number"
                name="code"
                value={formState.code}
                onChange={onInputChange}
                /* ref={campoDeEntradaRef} */
              />
            </Form.Group>
          </div>
          <div className="col-4">
            <Form.Group className="mb-3" controlId="formCodBarra">
              <Form.Label><h5>Peso</h5></Form.Label>
              <Form.Control
                type="number"
                name="code"
                value={formState.code}
                onChange={onInputChange}
                /* ref={campoDeEntradaRef} */
              />
            </Form.Group>
          </div>
          <div className="col-4">
            <Form.Group className="mb-3" controlId="formCodBarra">
              <Form.Label><h5>Código de Barras</h5></Form.Label>
              <Form.Control
                type="number"
                name="code"
                value={formState.code}
                onChange={onInputChange}
                /* ref={campoDeEntradaRef} */
              />
            </Form.Group>
          </div>
        </div>
      </Row>
      <Row className="my-3 mx-5">
        <h1>"Nombre producto"</h1>
      </Row>
    </Fragment>
  );
};
