import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";

/* Anexo LocalStorage: esto me permite controlar mi lista de compras momentáneamente */
let compra = JSON.parse(localStorage.getItem("compra"));
if (!compra) {
  let compras = [
    {
      time: "18/1/2024 08:12",
      largeCode: 7002384917,
      shortCode: "-",
      product: "Papas Fritas LAYS 500g.",
      price: "800",
      amount: "50",
      weigth: "-",
      idUser: "AdminPrueba",
    },
    {
      time: "12/1/2024 12:08",
      largeCode: 7283944172,
      shortCode: "-",
      product: "COCA-COLA 3Lts",
      price: "1200",
      amount: "24",
      weigth: "-",
      idUser: "AdminPrueba",
    },
    {
      time: "28/12/2023 18:12",
      largeCode: 20398299,
      shortCode: "-",
      product: "Chocolate BLOCK 600g.",
      price: "800",
      amount: "50",
      weigth: "-",
      idUser: "AdminPrueba",
    },
    {
      time: "2/1/2024 18:12",
      largeCode: 1652336641,
      shortCode: "-",
      product: "Palladini JAMÓN",
      price: "23000",
      amount: "2",
      weigth: "5",
      idUser: "AdminPrueba",
    },
    {
      time: "21/1/2024 18:12",
      largeCode: "-",
      shortCode: 10,
      product: "Pan",
      price: "23000",
      amount: "-",
      weigth: "25",
      idUser: "AdminPrueba",
    },
  ];
  localStorage.setItem("compra", JSON.stringify(compras));
}
/* Fin anexo LocalStorage */

export const ListaCompras = () => {
  const initialForm = {
    searchText: "",
    time: "",
    largeCode: "",
    shortCode: "",
    product: "",
    price: "",
    amount: "",
    weigth: "",
    userId: "",
  };

  const { formState, onInputChange, onResetForm } = useForm(initialForm);

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

  const campoDeEntradaRef = useRef(null);

  useEffect(() => {
    if (showModal && addMode) {
      campoDeEntradaRef.current.focus();
    }
  }, [showModal]);

  const handleSubmit = () => {
    setShowAlert(false);
    if (
      objeto.description == "" ||
      (objeto.shortCode == "" && objeto.largeCode == "")
    ) {
      setShowAlert(true);
      return;
    }
    let repeat = listado.findIndex(
      (l) =>
        l.largeCode == objeto.largeCode ||
        l.shortCode == objeto.shortCode ||
        l.description == objeto.description
    );
    console.log(repeat);
    if (repeat !== -1) {
      setShowAlertRepeat(true);
      return;
    } else {
      setShowAlertRepeat(false);
    }

    let nuevoCP = {
      largeCode: formState.largeCode || "-",
      shortCode: formState.shortCode || "-",
      description: formState.description,
    };
    if (addMode) {
      agregarProducto(nuevoCP);
    } else {
      const index = parseInt(
        listado.findIndex(
          (p) =>
            p.largeCode == oldProduct.largeCode &&
            p.shortCode == oldProduct.shortCode &&
            p.description == oldProduct.description
        )
      );
      if (index !== -1) {
        let product = listado[index];
        product.largeCode = nuevoCP.largeCode;
        product.shortCode = nuevoCP.shortCode;
        product.description = nuevoCP.description;
        localStorage.setItem("producto", JSON.stringify(listado));
        setOldProduct(null);
      }
    }
    setShowModal(false);
    onResetForm();
    actualizador();
  };
  return (
    <>
      <div className="mt-4"></div>
      <h1>Lista de Compras</h1>
      <hr />
      <button
        type="button my-2"
        className="btn btn-primary"
        onClick={() => {
          setShowModal(true);
          setAddMode(true);
        }}
      >
        <i className="bi bi-plus-circle"></i> Agregar Compra
      </button>
      <Form className="mt-3">
        <input
          type="text"
          placeholder="Busca una compra"
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
            <th scope="col">Código de Barras</th>
            <th scope="col">Código Simple</th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Peso (en Kg)</th>
            <th scope="col">Precio TOTAL</th>
            <th scope="col">Ingresó</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {compra?.map((c, index) => (
            <tr key={index}>
              <th scope="row">{index + 1} </th>
              <td>{c.time}</td>
              <td>{c.largeCode}</td>
              <td>{c.shortCode} </td>
              <td>{c.product} </td>
              <td>{c.amount} </td>
              <td>{c.weigth} </td>
              <td>${c.price} </td>
              <td>{c.idUser} </td>
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
                <Form.Group className="mb-3" controlId="formCodBarraShort">
                  <Form.Label>Código Simple</Form.Label>
                  <Form.Control
                    type="number"
                    name="shortCode"
                    value={formState.shortCode}
                    onChange={onInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formCodBarra">
                  <Form.Label>Código de Barras</Form.Label>
                  <Form.Control
                    type="number"
                    name="largeCode"
                    value={formState.largeCode}
                    onChange={onInputChange}
                    ref={campoDeEntradaRef}
                  />
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    name="description"
                    value={formState.description}
                    onChange={onInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formCodBarraShort">
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
              </Alert>
            </>
          )}
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
            variant="primary"
            onClick={() => {
              handleSubmit(formState);
            }}
            /* disabled={waitAxios} */
          >
            {addMode ? "Agregar" : "Guardar Cambios"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
