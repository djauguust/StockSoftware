import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from '../../hooks/useForm';
import axios from 'axios';

export const ListaStock = () => {
    const initialForm = {
        searchText: "",
    };

    const { formState, onInputChange, onResetForm } = useForm(initialForm);

    const enterPulsed = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    const url = import.meta.env.VITE_URL_BACKEND;

    const [actualizar, setActualizar] = useState(false)
    const actualizador = () => setActualizar(!actualizar)
    const [listado, setListado] = useState(null)

    useEffect(() => {
        axios.get(`${url}/productos/`).then(({ data }) => {
            setListado(data)
        });
    }, [actualizar]);
    console.log(listado)

    return (
        <>
            <h1>
                STOCK
            </h1>
            <hr />
            {/* <button type="button my-2" className="btn btn-primary">
                <i className="bi bi-plus-circle"></i> Agregar Producto
            </button> */}
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
                    <tr>
                        <th scope="row">1</th>
                        <td>7002384917</td>
                        <td>Papas Fritas LAYS 500g.</td>
                        <td>48</td>
                        <td>-</td>
                        <td>$1040</td>
                        <td>
                            <button type="button" className="btn btn-secondary me-2"><i className="bi bi-pencil"></i></button>
                            <button type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>7283944172</td>
                        <td>COCA-COLA 3Lts</td>
                        <td>20</td>
                        <td>-</td>
                        <td>$1560</td>
                        <td>
                            <button type="button" className="btn btn-secondary me-2"><i className="bi bi-pencil"></i></button>
                            <button type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>0020398299</td>
                        <td>Chocolate BLOCK 600g.</td>
                        <td>2</td>
                        <td>-</td>
                        <td>$3600</td>
                        <td>
                            <button type="button" className="btn btn-secondary me-2"><i className="bi bi-pencil"></i></button>
                            <button type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
