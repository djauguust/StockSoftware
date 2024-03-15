import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import axios from "axios";

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
    return `${horas < 10 ? `0${horas}` : horas}:${
      minutos < 10 ? `0${minutos}` : minutos
    }:${segundos < 10 ? `0${segundos}` : segundos}`;
  };
  const formatearFecha = (date) => {
    const dia = date.getDate();
    const mes = date.getMonth();
    const anio = date.getFullYear();

    return `${dia}/${mes + 1}/${anio}`;
  };
  const initialForm = {
    textoBusqueda: "",
    codigo: "",
    cantidad: "",
    peso: "",
    producto: "",
    precio: "",
  };
  const { formState, onInputChange, onResetForm, setFormState } =
    useForm(initialForm);

  const [lista, setLista] = useState([]);

  let array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  const refCantidad = useRef(null);
  const refPeso = useRef(null);
  const refCodigo = useRef(null);

  useEffect(() => {
    refCantidad.current.focus();
  }, []);

  const onCantidadPulsed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      refPeso.current.focus();
    }
    if (event.key === "Tab") {
      event.preventDefault();
      /* Codigo = Cantidad y Cantidad = 1 */
      setFormState({
        ...formState,
        codigo: formState.cantidad,
        cantidad: 1,
        peso: "",
      });
      /* Carga al carrito y onResetForm */
    }
  };

  const onPesoPulsed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      refCodigo.current.focus();
    }

    if (event.key === "Tab") {
      event.preventDefault();
      /* Codigo = Peso y Peso = 100 */
      setFormState({
        ...formState,
        codigo: formState.peso,
        peso: 100,
        cantidad: "",
      });
      /* Carga al carrito y onResetForm */
    }
  };

  const onCodigoPulsed = (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      if (
        formState.codigo == "" &&
        formState.peso == "" &&
        formState.cantidad == ""
      ) {
        /* Cierra la caja */
        console.log("cierro caja");
      } else {
        if (formState.cantidad !== "" && formState.codigo !== "") {
          /* Carga en carrito y onResetForm */
        } else {
          if (formState.codigo == "") {
            /* onResetForm */
            console.log("Sólo codigo vacío");
          } else {
            if (formState.cantidad !== "" && formState.peso !== "") {
              console.log("cantidad y peso con info");
            } else {
              /* Carga en carrito y onResetForm */
            }
          }
        }
      }
    }
  };

  const agregarACarrito = (producto) => {
    setLista([
      ...lista,
      {
        producto: producto.producto,
        cantidad: producto.cantidad,
        peso: producto.peso,
        precio: producto.precio,
      },
    ]);
  };

  /* Quedo aquí porque tengo que empezar con STOCK */

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
              <Form.Label>
                <h5>Cantidad</h5>
              </Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                value={formState.cantidad}
                onChange={onInputChange}
                ref={refCantidad}
                onKeyDown={onCantidadPulsed}
              />
            </Form.Group>
          </div>
          <div className="col-4">
            <Form.Group className="mb-3" controlId="formCodBarra">
              <Form.Label>
                <h5>Peso (en gramos)</h5>
              </Form.Label>
              <Form.Control
                type="number"
                name="peso"
                value={formState.peso}
                onChange={onInputChange}
                ref={refPeso}
                onKeyDown={onPesoPulsed}
              />
            </Form.Group>
          </div>
          <div className="col-4">
            <Form.Group className="mb-3" controlId="formCodBarra">
              <Form.Label>
                <h5>Código de Barras</h5>
              </Form.Label>
              <Form.Control
                type="number"
                name="codigo"
                value={formState.codigo}
                onChange={onInputChange}
                ref={refCodigo}
                onKeyDown={onCodigoPulsed}
              />
            </Form.Group>
          </div>
        </div>
      </Row>
      <Row className="my-3 mx-5">
        <h1>"Nombre producto"</h1>
      </Row>
      <hr />
      <table className="table table-striped mt-3 px-4">
        <thead className="px-2">
          <tr>
            <th scope="col">#</th>
            <th scope="col">PRODUCTO</th>
            <th scope="col">CANTIDAD</th>
            <th scope="col">PESO</th>
            <th scope="col">PRECIO</th>
            <th scope="col">ELIMINAR</th>
          </tr>
        </thead>
        <tbody>
          {array.map((e) => {
            if (e < 30)
              return (
                <tr key={e + 1}>
                  <th scope="row"> </th>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr>
              );
          })}
        </tbody>
      </table>

      <nav className="navbar navbar-dark bg-dark fixed-bottom text-white">
        <div className="container">
          <div className="col-3">
            <Button className="ms-4" variant="success" size="lg">
              <b>PAGAR</b>
            </Button>
          </div>
          <div className="col-3">
            <Button className="ms-4" variant="danger" size="lg">
              <b>LIMPIAR</b>
            </Button>
          </div>
          <div className="col-2"></div>
          <div className="col-4">
            <h1 className="me-0">TOTAL: $1.223</h1>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};
