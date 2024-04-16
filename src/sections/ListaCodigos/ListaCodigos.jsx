import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { LoginContext } from "../../context/LoginContext";

export const ListaCodigos = () => {
  const initialForm = {
    searchText: "",
    code: "",
    description: "",
    isCantidad: ""
  };

  const [actualizar, setActualizar] = useState(false);
  const actualizador = () => {
    setActualizar(!actualizar);
  };

  const url = import.meta.env.VITE_URL_BACKEND;

  useEffect(() => {
    axios.get(`${url}/codigos/`).then(({ data }) => {
      setListado(data);
      setListaFiltrada(data);
    });
  }, [actualizar]);

  const { formState, onInputChange, onResetForm, setFormState } =
    useForm(initialForm);
  const [showModal, setShowModal] = useState(false);
  const [listado, setListado] = useState();
  const [waitAxios, setWaitAxios] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setToDelete(null);
    setShowAlert(false);
    setShowAlertRepeat(false);
    onResetForm();
    setWaitAxios(false);
    actualizador();
  };
  const [addMode, setAddMode] = useState(true);
  const [showAlertRepeat, setShowAlertRepeat] = useState(false);

  const handleSubmit = (objeto) => {
    setWaitAxios(true);
    setShowAlert(false);
    setShowAlertRepeat(false);
    if (objeto.description == "" || objeto.code == "" || objeto.isCantidad == "") {
      setShowAlert(true);
      return;
    }
    let repeat = listado.findIndex(
      (l) => l.code == objeto.code || l.description == objeto.description
    );

    if (repeat !== -1 && addMode) {
      setShowAlertRepeat(true);
      setWaitAxios(false);
      return;
    } else {
      setShowAlertRepeat(false);
    }
    
    let auxIC;
    if (formState.isCantidad == "true") {
      auxIC = true
    } else {
      auxIC = false
    }

    let nuevoCP = {
      code: formState.code || "-",
      description: formState.description,
      isCantidad: auxIC
    };
    if (addMode) {
      agregarProducto(nuevoCP);
    } else {
      const index = parseInt(
        listado.findIndex(
          (p) =>
            p.code == oldProduct.code && p.description == oldProduct.description
        )
      );
      if (index !== -1) {
        axios
          .put(`${url}/codigos/${oldProduct.code}`, nuevoCP)
          .then(({ data }) => {
            console.log(data);
            setOldProduct(null);
            actualizador();
          })
          .catch(({ response }) => {
            console.log(response.data);
          });
      }
    }
    setTimeout(function () {
      setWaitAxios(false);
      setShowModal(false);
      onResetForm();
      actualizador();
    }, 500);
  };

  const [showAlert, setShowAlert] = useState(false);

  const agregarProducto = (nuevo) => {
    axios
      .post(`${url}/codigos`, nuevo)
      .then(({ data }) => {
        console.log(data);
        actualizador();
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
    return;
  };

  const [toDelete, setToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = (product) => {
    setToDelete(product);
    setShowDeleteModal(true);
  };

  const handleSubmitDelete = () => {
    setWaitAxios(true);
    const index = listado.findIndex(
      (p) => p.description === toDelete.description
    );
    if (index !== -1) {
      axios
        .delete(`${url}/codigos/${toDelete.code}`)
        .then(({ data }) => {
          console.log(data);
          actualizador();
        })
        .catch(({ response }) => {
          console.log(response.data);
        });
      setTimeout(function () {
        console.log("first");
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
    /* /Lo hago con LocalStorage */
  };

  const [oldProduct, setOldProduct] = useState(null);
  const handleSubmitEdit = (e) => {
    let lAux = e.code;

    if (e.code == "-") {
      lAux = "";
    }
    let editProduct = {
      code: lAux,
      description: e.description,
      isCantidad: e.isCantidad
    };
    setOldProduct(e);
    setFormState(editProduct);
    setAddMode(false);
    setShowModal(true);
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
          const filter = item.description
            .toLowerCase()
            .includes(value.toLowerCase());

          return filter ? filter : null;
        });

      const filterLastName =
        listado &&
        listado.filter((item) => {
          let codigoString = item.code.toString();
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

  const campoDeEntradaRef = useRef(null);

  useEffect(() => {
    if (showModal && addMode) {
      campoDeEntradaRef.current.focus();
    }
  }, [showModal]);

  const keyDown = (event) => {
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

  useEffect(() => {
    setWaitAxios(false)
  }, [formState])

  return (
    <>
      <div className="mt-4"></div>
      <h1>Lista de Códigos de productos</h1>
      <hr />
      <button
        type="button my-2"
        className="btn btn-primary"
        onClick={() => {
          setShowModal(true);
          setAddMode(true);
        }}
      >
        <i className="bi bi-plus-circle"></i> Agregar Producto
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
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Código de Barras</th>
            <th scope="col">Descripción</th>
            <th scope="col">Venta</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaFiltrada?.map((e, index) => (
            <tr key={index}>
              <th scope="row">{index + 1} </th>
              <td>{e.code}</td>
              <td>{e.description} </td>
              <td>{e.isCantidad ? "Cantidad" : "Peso"} </td>
              <td>
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => handleSubmitEdit(e)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(e)}
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
          <Modal.Title>
            {addMode ? "Agregar" : "Modificar"} código de producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={() => {
              handleSubmit(formState);
            }}
          >
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
                  />
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    rows={3}
                    type="text"
                    name="description"
                    value={formState.description}
                    onChange={onInputChange}
                    onKeyDown={keyDown}
                  />
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Label>¿Se vende por cantidad o por peso?</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  required
                  name="isCantidad"
                  value={formState.isCantidad}
                  onChange={onInputChange}
                >
                  <option value="">Elija una opción...</option>
                  <option value="true">Cantidad</option>
                  <option value="false">Peso</option>
                </Form.Select>
              </div>
            </div>
          </Form>
          {showAlert && (
            <>
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
                className="mt-2"
              >
                <b>Formulario incompleto:</b>
                <p>- El campo descripción debe ser completado</p>
                <p>- El campo código de barras debe ser completado.</p>
                <p>- Debe responder si se vende por Cant o por Peso.</p>
              </Alert>
            </>
          )}
          {showAlertRepeat && (
            <>
              <Alert
                variant="danger"
                onClose={() => setShowAlertRepeat(false)}
                dismissible
              >
                <b>Producto repetido</b>
                <p>
                  - Al menos código de barras o descripción coincide con algún
                  producto de la lista.
                </p>
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
          <Modal.Title>Confirmar eliminación de producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Realmente desea eliminar el producto <b>{toDelete?.description}</b>?
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
      {listaFiltrada?.length == 0 && formState.searchText != "" && (
        <Alert variant="danger">
          <b>¡Ningún producto encontrado!</b>
        </Alert>
      )}
    </>
  );
};
