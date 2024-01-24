import React, { useState } from "react";
import { Form } from "react-bootstrap";
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
  };

  const { formState, onInputChange, onResetForm } = useForm(initialForm);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <h1>Lista de Códigos de productos</h1>
      <hr />
      <button
        type="button my-2"
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
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
      <table className="table table-striped">
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
            
          <tr>
            <th scope="row">1</th>
            <td>7002384917</td>
            <td>-</td>
            <td>Papas Fritas LAYS 500g.</td>
            <td>
              <button type="button" className="btn btn-secondary me-2">
                <i className="bi bi-pencil"></i>
              </button>
              <button type="button" className="btn btn-danger">
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>7283944172</td>
            <td>-</td>
            <td>COCA-COLA 3Lts</td>
            <td>
              <button type="button" className="btn btn-secondary me-2">
                <i className="bi bi-pencil"></i>
              </button>
              <button type="button" className="btn btn-danger">
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>0020398299</td>
            <td>-</td>
            <td>Chocolate BLOCK 600g.</td>
            <td>
              <button type="button" className="btn btn-secondary me-2">
                <i className="bi bi-pencil"></i>
              </button>
              <button type="button" className="btn btn-danger">
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
