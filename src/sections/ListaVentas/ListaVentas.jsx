import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { getStringOfProducts } from "./getStringOfProducts";

export const ListaVentas = () => {
  const initialForm = {
    searchText: "",
    time: "",
    product: "",
    price: "",
    userId: "",
  };
  const { formState, onInputChange, onResetForm } = useForm(initialForm);

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

  const handleClose = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setToDelete(null);
    setShowAlert(false);
    onResetForm();
  };

  const handleDelete = (purchase) => {
    setToDelete(purchase);
    setShowDeleteModal(true);
  };

  const handleSubmitDelete = () => {
    /* Lo hago con LocalStorage */
    const index = listado.findIndex((p) => p.id === toDelete.id);
    if (index !== -1) {
      listado.splice(index, 1);
      localStorage.setItem("venta", JSON.stringify(listado));
      handleClose();
      actualizador();
    } else {
      console.log("eliminado sin exito");
    }
    /* /Lo hago con LocalStorage */
  };

  const url = import.meta.env.VITE_URL_BACKEND;

  useEffect(() => {
    axios.get(`${url}/ventas/`).then(({ data }) => {
      console.log(data)
      setListado(data);
      setListaFiltrada(data);
    });
  }, [actualizar]);
  
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
          className="form-control"
          name="searchText"
          autoComplete="off"
          value={formState.searchText}
          onChange={onInputChange}
        />
      </Form>
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
                <button type="button" className="btn btn-secondary me-2">
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
          ¿Realmente desea eliminar la venta <b>{toDelete?.product}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          /* disabled={waitAxios} */
          >
            Cerrar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleSubmitDelete(toDelete);
            }}
          /* disabled={waitAxios} */
          >
            <b>Eliminar</b>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
