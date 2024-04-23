import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { obtenerFechaHoraEvento } from "../../hooks/getTime";
import { siguienteValorAlMaximo } from "../../hooks/getNextId";
import axios from "axios";
import { LoginContext } from "../../context/LoginContext";

export const ListaCompras = () => {
  const initialForm = {
    searchText: "",
    time: "",
    code: "",
    product: "",
    price: "",
    amount: "",
    weigth: "",
    userId: "",
    isCantidad: true,
  };
  const [actualizar, setActualizar] = useState(false);
  const actualizador = () => {
    setActualizar(!actualizar);
  };

  const { user } = useContext(LoginContext);

  const url = import.meta.env.VITE_URL_BACKEND;

  const [listado, setListado] = useState(null);

  useEffect(() => {
    axios.get(`${url}/compras/`).then(({ data }) => {
      setListado(data);
      setListaFiltrada(data);
    });
  }, [actualizar]);

  const { formState, onInputChange, onResetForm, setFormState } =
    useForm(initialForm);

  const [showModal, setShowModal] = useState(false);
  const [addMode, setAddMode] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [waitAxios, setWaitAxios] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setToDelete(null);
    setShowAlert(false);
    onResetForm();
  };

  const campoDeEntradaRef = useRef(null);
  const campoDeEntradaRef2 = useRef(null);

  useEffect(() => {
    if (showModal && addMode) {
      campoDeEntradaRef.current.focus();
    }
  }, [showModal]);

  const [oldPurchase, setOldPurchase] = useState(null);

  const [ListaCodigos, setListaCodigos] = useState(null);

  const getCodigos = () => {
    axios.get(`${url}/codigos`).then(({ data }) => {
      console.log(data);
      setListaCodigos(data);
    });
  };

  const handleSubmit = (objeto) => {
    setShowAlert(false);
    if (
      (objeto.amount == "" && objeto.weigth == "") ||
      objeto.code == "" ||
      objeto.price == ""
    ) {
      setShowAlert(true);
      return;
    }

    let nuevaC = {
      codigo: formState.code,
      precio: formState.price,
      cantidad: formState.amount || 0,
      peso: formState.weigth || 0,
      user: user.id,
      fechaHora: obtenerFechaHoraEvento(),
      isCantidad: formState.isCantidad,
    };
    console.log(nuevaC);
    setWaitAxios(true);
    if (addMode) {
      agregarCompra(nuevaC);
    } else {
      console.log("first");
      const index = parseInt(listado.findIndex((p) => p.id == oldPurchase.id));
      console.log(index);
      if (index !== -1) {
        let purchase = compra[index];
        purchase.code = nuevaC.code;
        purchase.product = nuevaC.product;
        purchase.price = nuevaC.price;
        purchase.amount = nuevaC.amount;
        purchase.weigth = nuevaC.weigth;
        localStorage.setItem("compra", JSON.stringify(compra));
        /* setOldPurchase(null); */
        actualizador();
      }
    }
    setTimeout(function () {
      setWaitAxios(false);
      onResetForm();
      actualizador();
      campoDeEntradaRef.current.focus();
    }, 500);
  };

  const agregarCompra = (nueva) => {
    axios
      .post(`${url}/compras/`, nueva)
      .then(({ data }) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };

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

  const handleDelete = (purchase) => {
    setToDelete(purchase);
    setShowDeleteModal(true);
  };

  const handleSubmitDelete = () => {
    setWaitAxios(true);
    const index = listado.findIndex((p) => p.id === toDelete.id);

    if (index !== -1) {
      axios
        .delete(`${url}/compras/${toDelete.id}`)
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
          const filter = item.producto
            .toLowerCase()
            .includes(value.toLowerCase());

          return filter ? filter : null;
        });

      const filterLastName =
        listado &&
        listado.filter((item) => {
          let codigoString = item.codigo.toString();
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

  useEffect(() => {
    if (!(formState.code == "")) {
      productoYCodigo();
    }
  }, [formState.code]);

  const tabPulsed = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      productoYCodigo();
      campoDeEntradaRef2.current.focus();
    }
  };

  const productoYCodigo = () => {
    let a = ListaCodigos.find((c) => c.code == formState.code);

    if (a != undefined) {
      setFormState({
        ...formState,
        product: a.description,
        isCantidad: a.isCantidad,
      });
      /* formState.product = a.description */
    } else {
      setFormState({ ...formState, product: "Producto no encontrado" });
      /* formState.product = "Producto no encontrado" */
    }
  };

  const onEnterPulsed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(formState);
    }
  };

  const enterPulsed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
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
          getCodigos();
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
          onKeyDown={enterPulsed}
        />
      </Form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha y Hora</th>
            <th scope="col">Código de Barras</th>
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
              <th scope="row">{index + 1} </th>
              <td>{c.fechaHora}</td>
              <td>{c.codigo}</td>
              <td>{c.producto} </td>
              <td>{c.cantidad} </td>
              <td>{c.peso} </td>
              <td>${c.precio} </td>
              <td>{c.user} </td>
              <td>
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => handleSubmitEdit(c)}
                  disabled
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  disabled
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
                    ref={campoDeEntradaRef}
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
                    ref={campoDeEntradaRef2}
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
    </>
  );
};
