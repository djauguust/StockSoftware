import React from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from '../../hooks/useForm';

export const ListaCompras = () => {
    const initialForm = {
        searchText: "",
    };
    
    const { formState, onInputChange, onResetForm } = useForm(initialForm);

    return (
        <>
            <h1>
                Lista de Compras
            </h1>
            <hr />
            <button type="button my-2" className="btn btn-primary">
                <i className="bi bi-plus-circle"></i> Agregar Compra
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
                        <th scope="col">Código de Barras</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Peso (en Kg)</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td >18/1/2024 08:12</td>
                        <td>7002384917</td>
                        <td>Papas Fritas LAYS 500g.</td>
                        <td>$800</td>
                        <td>50</td>
                        <td>-</td>
                        <td>
                            <button type="button" className="btn btn-secondary me-2"><i className="bi bi-pencil"></i></button>
                            <button type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td >12/1/2024 12:08</td>
                        <td>7283944172</td>
                        <td>COCA-COLA 3Lts</td>
                        <td>$1200</td>
                        <td>24</td>
                        <td>-</td>
                        <td>
                            <button type="button" className="btn btn-secondary me-2"><i className="bi bi-pencil"></i></button>
                            <button type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td >28/12/2023 18:12</td>
                        <td>0020398299</td>
                        <td>Chocolate BLOCK 600g.</td>
                        <td>$3000</td>
                        <td>30</td>
                        <td>-</td>
                        <td>
                            <button type="button" className="btn btn-secondary me-2"><i className="bi bi-pencil"></i></button>
                            <button type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td >2/1/2024 18:12</td>
                        <td>1652336641</td>
                        <td>Palladini JAMÓN</td>
                        <td>$23000</td>
                        <td>2</td>
                        <td>5</td>
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
