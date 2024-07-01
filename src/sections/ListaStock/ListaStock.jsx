import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { obtenerFechaHoraEvento } from "../../hooks/getTime";

/* function actualizarProducto(p) {
  try {
    axios
      .put(`${import.meta.env.VITE_URL_BACKEND}/productos/${p.codigo}`, p)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
    return;
  } catch (e) {
    console.log(e);
  }
} */

export const ListaStock = () => {
  const initialForm = {
    searchText: "",
    codigo: "",
    descripcion: "",
    peso: "",
    cantidad: "",
    precio: "",
    id: "",
    agregarStock: 0,
    isCantidad: false,
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

  const [toDelete, setToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmitDelete = () => {
    setWaitAxios(true);
    const index = listado.findIndex((p) => p.id === toDelete.id);

    if (index !== -1) {
      axios
        .delete(`${url}/productos/${toDelete.id}`)
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
    // TO DO MODAL PARA BORRAR
  };

  const [oldPurchase, setOldPurchase] = useState(null);
  const handleSubmitEdit = (e) => {
    console.log(e);
    let lAux = e.codigo,
      wAux = e.peso,
      aAux = e.cantidad;

    if (e.codigo == "-") {
      lAux = "";
    }
    if (e.peso == "-") {
      wAux = "";
    }
    if (e.cantidad == "-") {
      aAux = "";
    }
    let editPurchase = {
      codigo: lAux,
      descripcion: e.descripcion,
      precio: e.precio,
      cantidad: aAux,
      peso: wAux,
      id: e.id,
      isCantidad: e.isCantidad,
    };
    setOldPurchase(e);
    setFormState(editPurchase);
    setAddMode(false);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setShowModalAddStock(false);
    setToDelete(null);
    setShowAlert(false);
    onResetForm();
  };

  const [addMode, setAddMode] = useState(true);
  const tabPulsed = (event) => {};
  const onEnterPulsed = (event) => {};

  const [showAlert, setShowAlert] = useState(false);
  const [waitAxios, setWaitAxios] = useState(false);

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
          const filter = item.descripcion
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
    if (!bandera && listado) {
      setBandera(1);
    }
  }, [listado]);

  const handleSubmit = async (objeto) => {
    // TO DO Confirmar edición o agregar nuevo stock
    setShowAlert(false);
    if (
      (objeto.cantidad == "" && objeto.peso == "") ||
      objeto.codigo == "" ||
      objeto.precio == ""
    ) {
      setShowAlert(true);
      return;
    }

    let nuevaC = {
      codigo: formState.codigo,
      precio: formState.precio,
      cantidad: formState.cantidad || 0,
      peso: formState.peso || 0,
      fechaHora: obtenerFechaHoraEvento(),
      isCantidad: objeto.isCantidad,
    };
    console.log(nuevaC);
    setWaitAxios(true);
    if (addMode) {
      agregarStock(nuevaC);
    } else {
      //TO DO ACTUALIZAR STOCK
      const index = parseInt(
        listado.findIndex(
          (p) =>
            p.codigo == oldPurchase.codigo &&
            p.descripcion == oldPurchase.descripcion
        )
      );
      if (index !== -1) {
        console.log(nuevaC);
        actualizarProducto(nuevaC);
        actualizador();
      }
    }
    setTimeout(function () {
      setWaitAxios(false);
      onResetForm();
      actualizador();
      handleClose();
    }, 500);
  };

  const agregarStock = () => {
    //TO DO
  };

  const [showModalAddStock, setShowModalAddStock] = useState(false);
  const [addStock, setAddStock] = useState(true);
  const campoDeEntradaRef = useRef(null);
  const campoDeEntradaRef2 = useRef(null);
  const [stockActual, setStockActual] = useState(0);
  const handleAddStock = (c) => {
    setFormState(c);
    setAddStock(true);
    setShowModalAddStock(true);
    setStockActual(c);
    setTimeout(function () {
      campoDeEntradaRef2.current.focus();
    }, 100);
  };

  const handleUploadPrice = (c) => {
    setFormState(c);
    setAddStock(false);
    setShowModalAddStock(true);
    setStockActual(c);
    setTimeout(function () {
      campoDeEntradaRef.current.focus();
    }, 100);
  };

  const handleSubmitAddStockOrUploadPrice = async (f, addStock) => {
    setWaitAxios(true);
    let aux = f;
    if (addStock) {
      // TO DO SI AGREGO STOCK
      if (aux.isCantidad) {
        aux.cantidad = parseInt(f.agregarStock) + parseInt(aux.cantidad);
      } else {
        aux.peso = parseInt(f.agregarStock) + parseInt(aux.peso);
      }
      await actualizarProducto(aux);
    } else {
      // TO DO SI ACTUALIZO PRECIO
      await actualizarProducto(aux);
    }
    setTimeout(function () {
      setWaitAxios(false);
      onResetForm();
      actualizador();
      handleClose();
    }, 1000);
  };

  const actualizarProducto = (p) => {
    axios
      .put(`${url}/productos/${p.codigo}`, p)
      .then(({ data }) => {
        console.log(data);
        actualizador();
      })
      .catch(({ response }) => {
        console.log(response);
        actualizador();
      });
    return;
  };

  return (
    <Fragment>
      <div className="m-5">
        <h1>STOCK</h1>
        <hr />
        <button
          type="button my-2"
          className="btn btn-primary"
          onClick={() => {
            setShowModal(true);
            setAddMode(true);
          }}
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
              <th scope="col">Cantidad Peso (Kg.)</th>
              <th scope="col">Precio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listaFiltrada?.map((c, index) => (
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
                    className="btn btn-success me-2"
                    onClick={() => handleAddStock(c)}
                    title="Agregar Stock"
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={() => handleUploadPrice(c)}
                    title="Actualizar Precio"
                  >
                    <i className="bi bi-currency-dollar"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={() => {
                      handleSubmitEdit(c), setAddMode(false);
                    }}
                    title="Editar Stock"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(c)}
                    title="Eliminar Producto"
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
            <Modal.Title>{addMode ? "Agregar" : "Modificar"} Stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="row mx-0">
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="formCodBarra">
                    <Form.Label>Código de Barras</Form.Label>
                    <Form.Control
                      type="number"
                      name="codigo"
                      value={formState.codigo}
                      onChange={onInputChange}
                      onKeyDown={tabPulsed}
                      disabled={!addMode}
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
                      name="descripcion"
                      value={formState.descripcion}
                      onChange={onInputChange}
                      disabled
                    />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="formcantidad">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      name="cantidad"
                      value={formState.cantidad}
                      onChange={onInputChange}
                    />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="formCodBarra">
                    <Form.Label>Peso (en KG.)</Form.Label>
                    <Form.Control
                      type="number"
                      name="peso"
                      value={formState.peso}
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
                        name="precio"
                        value={formState.precio}
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

        <Modal show={showModalAddStock} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {addStock ? "Agregar Stock" : "Actualizar Precio"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {addStock ? (
              <>
                <Row>
                  <Col>Stock Actual:</Col>
                  <Col>
                    <b>
                      {" "}
                      {stockActual.isCantidad
                        ? stockActual.cantidad
                        : stockActual.peso}
                    </b>{" "}
                    {stockActual.isCantidad ? "Unidades" : "Kilogramos"}
                  </Col>
                </Row>
                <Form>
                  <Form.Group className="my-3" controlId="formCodBarra">
                    <Row>
                      <Col>
                        <Form.Label>Agregar Stock:</Form.Label>
                      </Col>
                      <Col>
                        <Form.Control
                          type="number"
                          name="agregarStock"
                          value={formState.agregarStock}
                          onChange={onInputChange}
                          onKeyDown={tabPulsed}
                          ref={campoDeEntradaRef2}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </>
            ) : (
              <>
                <Form>
                  <Form.Group className="my-3" controlId="formCodBarra">
                    <Row>
                      <Col>
                        <Form.Label>Modificar Precio:</Form.Label>
                      </Col>
                      <Col>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                          <Form.Control
                            type="number"
                            name="precio"
                            value={formState.precio}
                            onChange={onInputChange}
                            onKeyDown={tabPulsed}
                            ref={campoDeEntradaRef}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
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
                handleSubmitAddStockOrUploadPrice(formState, addStock);
              }}
              disabled={waitAxios}
            >
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Fragment>
  );
};
