import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";

/* Anexo LocalStorage: esto me permite controlar mi lista de códigos momentáneamente */
let producto = JSON.parse(localStorage.getItem("producto"));
if (!producto) {
  let productos = [
    {
      largeCode: 7002384917,
      shortCode: "-",
      description: "Papas Fritas LAYS 500g.",
    },
    {
      largeCode: 7283944172,
      shortCode: "-",
      description: "COCA-COLA 3Lts",
    },
    {
      largeCode: 20398299,
      shortCode: "-",
      description: "Chocolate BLOCK 600g.",
    },
    {
      largeCode: "-",
      shortCode: 10,
      description: "Pan",
    },
  ];
  localStorage.setItem("producto", JSON.stringify(productos));
}
/* Fin anexo LocalStorage */

export const ListaCodigos = () => {
  const initialForm = {
    searchText: "",
    largeCode: "",
    shortCode: "",
    description: "",
  };

  const { formState, onInputChange, onResetForm, setFormState } =
    useForm(initialForm);
  const [showModal, setShowModal] = useState(false);
  const [listado, setListado] = useState();
  const [actualizar, setActualizar] = useState(false);
  const actualizador = () => {
    setActualizar(!actualizar);
  };

  useEffect(() => {
    setListado(JSON.parse(localStorage.getItem("producto")));
  }, [actualizar]);

  const handleClose = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setToDelete(null);
    setShowAlert(false);
    onResetForm();
  };
  const [addMode, setAddMode] = useState(true);

  const handleSubmit = (objeto) => {
    if (
      objeto.description == "" ||
      (objeto.shortCode == "" && objeto.largeCode == "")
    ) {
      setShowAlert(true);
    }
    /* TO DO CONTROLAR QUE NO SE REPITA EL PRODUCTO O CÓDIGO */
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

  const [showAlert, setShowAlert] = useState(false);

  const agregarProducto = (nuevo) => {
    /* hago para local storage */
    let nuevaLista = [...listado, nuevo];
    localStorage.setItem("producto", JSON.stringify(nuevaLista));
  };

  const [toDelete, setToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = (product) => {
    setToDelete(product);
    setShowDeleteModal(true);
  };

  const handleSubmitDelete = () => {
    /* Lo hago con LocalStorage */
    const index = listado.findIndex(
      (p) => p.description === toDelete.description
    );
    if (index !== -1) {
      listado.splice(index, 1);
      localStorage.setItem("producto", JSON.stringify(listado));
      handleClose();
    } else {
      console.log("eliminado sin exito");
    }
    /* /Lo hago con LocalStorage */
  };

  const [oldProduct, setOldProduct] = useState(null);
  const handleSubmitEdit = (e) => {
    let sAux = e.shortCode,
      lAux = e.largeCode;
    if (e.shortCode == "-") {
      sAux = "";
    }
    if (e.largeCode == "-") {
      lAux = "";
    }
    let editProduct = {
      largeCode: lAux,
      shortCode: sAux,
      description: e.description,
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

    if (value.length) {
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
        />
      </Form>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Código de Barras</th>
            <th scope="col">Código simple</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaFiltrada?.map((e, index) => (
            <tr key={index}>
              <th scope="row">{index + 1} </th>
              <td>{e.largeCode}</td>
              <td>{e.shortCode}</td>
              <td>{e.description} </td>
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
          <Form>
            <div className="row mx-0">
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formCodBarra">
                  <Form.Label>Código de Barras</Form.Label>
                  <Form.Control
                    type="number"
                    name="largeCode"
                    value={formState.largeCode}
                    onChange={onInputChange}
                  />
                </Form.Group>
              </div>
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
              <div className="col-12">
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Descripción</Form.Label>
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
                <p>- El campo descripción debe ser completado</p>
                <p>- Al menos un código debe ser ingresado.</p>
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
          <Modal.Title>Confirmar eliminación de producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Realmente desea eliminar el producto <b>{toDelete?.description}</b>?
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
      {listaFiltrada?.length == 0 && formState.searchText != "" && (
        <Alert variant="danger">
          <b>¡Ningún producto encontrado!</b>
        </Alert>
      )}
    </>
  );
};
