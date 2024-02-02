import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { obtenerFechaHoraEvento } from "../../hooks/getTime";
import { siguienteValorAlMaximo } from "../../hooks/getNextId";

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
      idUser: "admin",
      id: 1,
    },
    {
      time: "12/1/2024 12:08",
      largeCode: 7283944172,
      shortCode: "-",
      product: "COCA-COLA 3Lts",
      price: "1200",
      amount: "24",
      weigth: "-",
      idUser: "admin",
      id: 2,
    },
    {
      time: "28/12/2023 18:12",
      largeCode: 20398299,
      shortCode: "-",
      product: "Chocolate BLOCK 600g.",
      price: "800",
      amount: "50",
      weigth: "-",
      idUser: "admin",
      id: 3,
    },
    {
      time: "2/1/2024 18:12",
      largeCode: 1652336641,
      shortCode: "-",
      product: "Palladini JAMÓN",
      price: "23000",
      amount: "2",
      weigth: "5",
      idUser: "admin",
      id: 4,
    },
    {
      time: "21/1/2024 18:12",
      largeCode: "-",
      shortCode: 10,
      product: "Pan",
      price: "23000",
      amount: "-",
      weigth: "25",
      idUser: "admin",
      id: 5,
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
  const [actualizar, setActualizar] = useState(false);
  const actualizador = () => {
    setActualizar(!actualizar);
  };

  const [listado, setListado] = useState(compra);
  useEffect(() => {
    setListado(JSON.parse(localStorage.getItem("compra")));
    setListaFiltrada(JSON.parse(localStorage.getItem("compra")));
  }, [actualizar]);

  const { formState, onInputChange, onResetForm, setFormState } =
    useForm(initialForm);

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

  const [oldPurchase, setOldPurchase] = useState(null);

  const handleSubmit = (objeto) => {
    setShowAlert(false);
    if (
      (objeto.amount == "" && objeto.weigth == "") ||
      (objeto.shortCode == "" && objeto.largeCode == "") ||
      objeto.price == ""
    ) {
      setShowAlert(true);
      return;
    }

    let nuevaC = {
      largeCode: formState.largeCode || "-",
      shortCode: formState.shortCode || "-",
      price: formState.price,
      amount: formState.amount || "-",
      weigth: formState.weigth || "-",
      /* LocalStorage */
      product: formState.product,
      idUser: JSON.parse(localStorage.getItem("usuarioLogueado")).user,
      time: obtenerFechaHoraEvento(),
      id: siguienteValorAlMaximo(listado),
      /* /LocalStorage */
    };
    console.log(nuevaC);
    if (addMode) {
      agregarCompra(nuevaC);
    } else {
      const index = parseInt(
        listado.findIndex(
          (p) =>
            p.largeCode == oldPurchase.largeCode &&
            p.shortCode == oldPurchase.shortCode &&
            p.product == oldPurchase.product &&
            p.price == oldPurchase.price &&
            p.amount == oldPurchase.amount &&
            p.weigth == oldPurchase.weigth
        )
      );
      if (index !== -1) {
        let purchase = compra[index];
        purchase.largeCode = nuevaC.largeCode;
        purchase.shortCode = nuevaC.shortCode;
        purchase.product = nuevaC.product;
        purchase.price = nuevaC.price;
        purchase.amount = nuevaC.amount;
        purchase.weigth = nuevaC.weigth;
        localStorage.setItem("compra", JSON.stringify(compra));
        setOldPurchase(null);
      }
    }
    setShowModal(false);
    onResetForm();
    actualizador();
  };

  const agregarCompra = (nueva) => {
    /* Hago para LS */
    console.log("first");
    let nuevaLista = [...listado, nueva];
    localStorage.setItem("compra", JSON.stringify(nuevaLista));
  };

  const handleSubmitEdit = (e) => {
    let sAux = e.shortCode,
      lAux = e.largeCode,
      wAux = e.weigth,
      aAux = e.amount;
    if (e.shortCode == "-") {
      sAux = "";
    }
    if (e.largeCode == "-") {
      lAux = "";
    }
    if (e.weigth == "-") {
      wAux = "";
    }
    if (e.amount == "-") {
      aAux = "";
    }
    let editPurchase = {
      largeCode: lAux,
      shortCode: sAux,
      product: e.product,
      price: e.price,
      amount: aAux,
      weigth: wAux,
    };
    setOldPurchase(e);
    setFormState(editPurchase);
    setAddMode(false);
    setShowModal(true);
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
      localStorage.setItem("compra", JSON.stringify(listado));
      handleClose();
      actualizador();
    } else {
      console.log("eliminado sin exito");
    }
    /* /Lo hago con LocalStorage */
  };

  const [listaFiltrada, setListaFiltrada] = useState(listado);
  const [bandera, setBandera] = useState(0);
  useEffect(() => {
    if (formState.searchText == "") setListaFiltrada(listado);
    const value = formState.searchText;
    let updatedData = [];
    let aux = [];

    if (value?.length) {
      const filterFirstName =
        listado &&
        listado.filter((item) => {
          const filter = item.product
            .toLowerCase()
            .includes(value.toLowerCase());

          return filter ? filter : null;
        });

      const filterLastName =
        listado &&
        listado.filter((item) => {
          let codigoString = item.largeCode.toString();
          const filter = codigoString
            .toLowerCase()
            .includes(value.toLowerCase());

          return filter ? filter : null;
        });

      const result = filterFirstName
        ? filterFirstName.concat(filterLastName)
        : aux;

      updatedData = result.reduce((acc, item) => {
        if (!acc.includes(item)) {
          acc.push(item);
        }
        return acc;
      }, []);
      setListaFiltrada(updatedData);
    } else {
      setListaFiltrada(listado);
    }
  }, [formState.searchText, bandera]);

  useEffect(() => {
    if (!bandera) {
      setBandera(1);
    }
  }, [listado]);
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
          {listaFiltrada?.map((c, index) => (
            <tr key={index}>
              <th scope="row">{c.id} </th>
              <td>{c.time}</td>
              <td>{c.largeCode}</td>
              <td>{c.shortCode} </td>
              <td>{c.product} </td>
              <td>{c.amount} </td>
              <td>{c.weigth} </td>
              <td>${c.price} </td>
              <td>{c.idUser} </td>
              <td>
                <button
                  type="button"
                  className="btn btn-secondary me-2"
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
                    name="product"
                    value={formState.product}
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

      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación de compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Realmente desea eliminar la compra <b>{toDelete?.product}</b>?
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
