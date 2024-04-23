import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import axios from "axios";

export const ListaStock = () => {
  const initialForm = {
    searchText: "",
  };

  const { formState, onInputChange, onResetForm, setFormState } =
    useForm(initialForm);

  const enterPulsed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const url = import.meta.env.VITE_URL_BACKEND;

  const [actualizar, setActualizar] = useState(false);
  const actualizador = () => setActualizar(!actualizar);
  const [listado, setListado] = useState(null);

  useEffect(() => {
    axios.get(`${url}/productos/`).then(({ data }) => {
      setListado(data);
    });
  }, [actualizar]);
  console.log(listado);

  const [toDelete, setToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmitDelete = () => {
    setWaitAxios(true);
    const index = listado.findIndex((p) => p.id === toDelete.id);

    if (index !== -1) {
      axios
        .delete(`${url}/stock/${toDelete.id}`)
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

  const handleDelete = (purchase) => {
    setToDelete(purchase);
    setShowDeleteModal(true);
  };

  const [oldPurchase, setOldPurchase] = useState(null);
  const handleSubmitEdit = (e) => {
    let lAux = e.code,
      wAux = e.weigth,
      aAux = e.amount;

    if (e.code == "-") {
      lAux = "";
    }
    if (e.weigth == "-") {
      wAux = "";
    }
    if (e.amount == "-") {
      aAux = "";
    }
    let editPurchase = {
      code: lAux,
      product: e.product,
      price: e.price,
      amount: aAux,
      weigth: wAux,
      id: e.id,
    };
    setOldPurchase(e);
    setFormState(editPurchase);
    setAddMode(false);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setToDelete(null);
    setShowAlert(false);
    onResetForm();
  };

  const [addMode, setAddMode] = useState(true);
  const tabPulsed = (event) => {};
  const onEnterPulsed = (event) => {};

  const [showAlert, setShowAlert] = useState(false);
  const [waitAxios, setWaitAxios] = useState(false);
  return (
    <>
      <h1>STOCK</h1>
      <hr />
      <button
        type="button my-2"
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
      >
        <i className="bi bi-plus-circle"></i> Agregar Stock
      </button>
      <Form className="mt-3">
        <input
          type="text"
          placeholder="Busca un producto"
          className="form-control"
          name="searchText"
          autoComplete="off"
          value={formState.searchText}
          onChange={onInputChange}
          onKeyDown={enterPulsed}
        />
      </Form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Código de Barras</th>
            <th scope="col">Descripción</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Cantidad Peso</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listado?.map((c, index) => (
            <tr key={index}>
              <th scope="row">{index + 1} </th>
              <td>{c.codigo}</td>
              <td>{c.descripcion}</td>
              <td>{c.isCantidad && c.cantidad} </td>
              <td>{!c.isCantidad && c.peso} </td>
              <td>${c.precio} </td>
              <td>
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => handleSubmitEdit(c)}
                >
                  <i className="bi bi-pencil"></i>
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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{addMode ? "Agregar" : "Modificar"} compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row mx-0">
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formCodBarra">
                  <Form.Label>Código de Barras</Form.Label>
                  <Form.Control
                    type="number"
                    name="code"
                    value={formState.code}
                    onChange={onInputChange}
                    onKeyDown={tabPulsed}
                  />
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    type="text"
                    name="product"
                    value={formState.product}
                    onChange={onInputChange}
                    disabled
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formAmount">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={formState.amount}
                    onChange={onInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formCodBarra">
                  <Form.Label>Peso (en KG.)</Form.Label>
                  <Form.Control
                    type="number"
                    name="weigth"
                    value={formState.weigth}
                    onChange={onInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formCodBarra">
                  <Form.Label>Precio Total</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="price"
                      value={formState.price}
                      onChange={onInputChange}
                      onKeyDown={onEnterPulsed}
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
          </Form>
          {showAlert && (
            <>
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <b>Formulario incompleto:</b>
                <p>- Al menos un código debe ser ingresado.</p>
                <p>- Al menos la cantidad o el peso debe ser ingresado.</p>
                <p>- El precio total es obligatorio.</p>
              </Alert>
            </>
          )}
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
            variant="primary"
            onClick={() => {
              handleSubmit(formState);
            }}
            disabled={waitAxios}
          >
            {addMode ? "Agregar" : "Guardar Cambios"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
