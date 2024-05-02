import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { getStringOfProducts } from "./getStringOfProducts";
import { despuesDe } from "../../hooks/despuesDe";

export const ListaVentas = () => {
  const initialForm = {
    searchText: "",
    time: "",
    product: "",
    price: "",
    userId: "",
  };
  const { formState, onInputChange, onResetForm, setFormState } =
    useForm(initialForm);

  const [actualizar, setActualizar] = useState(false);
  const actualizador = () => {
    setActualizar(!actualizar);
  };

  const [listado, setListado] = useState(null);
  const [listaFiltrada, setListaFiltrada] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [addMode, setAddMode] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [waitAxios, setWaitAxios] = useState(false);

  const handleClose = () => {
    setWaitAxios(false);
    setShowModal(false);
    setShowDeleteModal(false);
    setShowViewModal(false);
    setToDelete(null);
    setShowAlert(false);
    onResetForm();
  };

  const handleDelete = (purchase) => {
    setShowViewModal(false);
    setToDelete(purchase);
    setShowDeleteModal(true);
  };

  const handleSubmitDelete = (toDelete) => {
    setWaitAxios(true);
    const index = listado.findIndex((p) => p.id === toDelete.id);
    console.log(index);
    if (index !== -1) {
      axios
        .delete(`${url}/ventas/${toDelete.id}`)
        .then(({ data }) => {
          console.log(data);
          actualizador();
        })
        .catch(({ response }) => {
          console.log(response.data);
        });

      setTimeout(function () {
        setWaitAxios(false);
        setShowModal(false);
        onResetForm();
        handleClose();
        actualizador();
      }, 500);
    } else {
      console.log("eliminado sin exito");
      setWaitAxios(false);
    }
  };

  const url = import.meta.env.VITE_URL_BACKEND;

  const [codigos, setCodigos] = useState(null);

  useEffect(() => {
    axios.get(`${url}/ventas/`).then(({ data }) => {
      setListado(data);
      setListaFiltrada(data);
    });
    axios.get(`${url}/codigos/`).then(({ data }) => {
      setCodigos(data);
    });
  }, [actualizar]);

  const [showViewModal, setShowViewModal] = useState(false);
  const [view, setView] = useState(null);

  const enterPulsed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  const handleSubmitFilter = (event) => {
    event.preventDefault();
    const listaFiltrada2 = listado.filter((d) => {
      let deberiaEstar = true;
      if (formState.desde !== "") {
        deberiaEstar = deberiaEstar && despuesDe(d.fechaHora, formState.desde);
      }

      if (formState.hasta !== "") {
        deberiaEstar = deberiaEstar && !despuesDe(d.fechaHora, formState.hasta);
      }
      return deberiaEstar;
    });
    setListaFiltrada(listaFiltrada2);
  };

  const handleClean = () => {
    setFormState({ ...formState, desde: "", hasta: "" });
    setListaFiltrada(listado);
  };
  return (
    <>
      <h1>Lista de Ventas</h1>
      <hr />
      <button type="button my-2" className="btn btn-primary disabled">
        <i className="bi bi-plus-circle"></i> Agregar Venta
      </button>
      <Form className="mt-3">
        <input
          type="text"
          placeholder="Busca un Producto"
          className="form-control mb-2"
          name="searchText"
          autoComplete="off"
          value={formState.searchText}
          onChange={onInputChange}
          onKeyDown={enterPulsed}
        />
      </Form>
      <Form.Group className="mb-3">
        <Row>
          <Col>
            <Form.Label>Desde</Form.Label>
            <Form.Control
              type="date"
              value={formState.desde}
              onChange={onInputChange}
              name="desde"
            />
          </Col>
          <Col>
            <Form.Label>Hasta</Form.Label>
            <Form.Control
              type="date"
              value={formState.hasta}
              onChange={onInputChange}
              name="hasta"
            />
          </Col>
        </Row>
      </Form.Group>
      <Button type="submit" onClick={handleSubmitFilter} className="mt-0">
        Filtrar Compras
      </Button>
      <Button
        type="button"
        className="mt-0 ms-3"
        variant="secondary"
        onClick={handleClean}
      >
        Limpiar Filtro
      </Button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha y Hora</th>
            <th scope="col">Productos</th>
            <th scope="col">Precio Total</th>
            <th scope="col">Venta</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaFiltrada?.map((c, index) => (
            <tr key={index}>
              <th scope="row">{index + 1} </th>
              <td>{c.fechaHora}</td>
              <td>{getStringOfProducts(c.productos)}</td>
              <td>${c.precioTotal} </td>
              <td>{c.user.nombre} </td>
              <td>
                <button
                  type="button"
                  className="btn btn-secondary me-2 disabled"
                  onClick={() => handleSubmitEdit(c)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setShowViewModal(true);
                    setView(c);
                  }}
                >
                  <i className="bi bi-eye"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(c)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación de venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Realmente desea eliminar la venta{" "}
          <b>{getStringOfProducts(toDelete?.product)}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={waitAxios}
          >
            Cerrar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleSubmitDelete(toDelete);
            }}
            disabled={waitAxios}
          >
            <b>Eliminar</b>
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showViewModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalle de Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Fecha y Hora: <b>{view?.fechaHora}</b>
          </p>
          <p>
            Precio Total: <b>$ {view?.precioTotal}</b>
          </p>
          <p>
            Venta realizada por:{" "}
            <b>
              {view?.user.apellido}, {view?.user.nombre}
            </b>
          </p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Peso</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody>
              {view?.productos.map((c, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1} </th>
                  <td>{c.producto}</td>
                  <td>{c.cantidad}</td>
                  <td>{c.peso} </td>
                  <td>${c.precio} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={waitAxios}
          >
            Cerrar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete(view);
            }}
            disabled={waitAxios}
          >
            <b>Eliminar</b>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
