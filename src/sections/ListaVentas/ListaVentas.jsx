import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";

/* Anexo LocalStorage: esto me permite controlar mi lista de ventas momentáneamente */
let venta = JSON.parse(localStorage.getItem("venta"));
if (!venta) {
  let ventas = [
    {
      time: "18/1/2024 08:12",
      product: "Papas Fritas LAYS 500g. x2, Palladini JAMÓN x300g",
      price: "2350",
      idUser: "admin",
      id: 1,
    },
    {
      time: "18/1/2024 08:12",
      product: "COCA-COLA 3Lts x3",
      price: "3350",
      idUser: "admin",
      id: 2,
    },
    {
      time: "18/1/2024 08:12",
      product: "Chocolate BLOCK 600g. x1, Papas Fritas LAYS 500g. x1",
      price: "5000",
      idUser: "admin",
      id: 3,
    },
  ];
  localStorage.setItem("venta", JSON.stringify(ventas));
}
/* Fin anexo LocalStorage */

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

  const [listado, setListado] = useState(venta);
  const [listaFiltrada, setListaFiltrada] = useState(venta);
  useEffect(() => {
    setListado(JSON.parse(localStorage.getItem("venta")));
    setListaFiltrada(JSON.parse(localStorage.getItem("venta")));
  }, [actualizar]);

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
              <th scope="row">{c.id} </th>
              <td>{c.time}</td>
              <td>{c.product} </td>
              <td>${c.price} </td>
              <td>{c.idUser} </td>
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
          {/* <tr>
            <th scope="row">1</th>
            <td>18/1/2024 08:12</td>
            <td className="text-break">
              Papas Fritas LAYS 500g. x2, Palladini JAMÓN x300g
            </td>
            <td>$2350</td>
            <td>admin</td>
            <td>
              <button type="button" className="btn btn-secondary me-2">
                <i className="bi bi-pencil"></i>
              </button>
              <button type="button" className="btn btn-secondary me-2">
                <i className="bi bi-eye"></i>
              </button>
              <button type="button" className="btn btn-danger">
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>12/1/2024 12:08</td>
            <td>COCA-COLA 3Lts x3</td>
            <td>$3350</td>
            <td>Admin</td>
            <td>
              <button type="button" className="btn btn-secondary me-2">
                <i className="bi bi-pencil"></i>
              </button>
              <button type="button" className="btn btn-secondary me-2">
                <i className="bi bi-eye"></i>
              </button>
              <button type="button" className="btn btn-danger">
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>28/12/2023 18:12</td>
            <td>Chocolate BLOCK 600g. x1, Papas Fritas LAYS 500g. x1</td>
            <td>$5000</td>
            <td>
              <button type="button" className="btn btn-secondary me-2">
                <i className="bi bi-pencil"></i>
              </button>
              <button type="button" className="btn btn-secondary me-2">
                <i className="bi bi-eye"></i>
              </button>
              <button type="button" className="btn btn-danger">
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr> */}
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
