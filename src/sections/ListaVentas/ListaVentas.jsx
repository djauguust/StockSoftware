import React from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from '../../hooks/useForm';

export const ListaVentas = () => {
    const initialForm = {
        searchText: "",
    };

    const { formState, onInputChange, onResetForm } = useForm(initialForm);

    return (
        <>
            <h1>
                Lista de Ventas
            </h1>
            <hr />
            <button type="button my-2" className="btn btn-primary">
                <i className="bi bi-plus-circle"></i> Agregar Venta
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
                        <th scope="col">Productos</th>
                        <th scope="col">Precio Total</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td >18/1/2024 08:12</td>
                        <td className='text-break'>Papas Fritas LAYS 500g. x2, Palladini JAMÓN x300g</td>
                        <td>$2350</td>
                        <td>
                            <button type="button" className="btn btn-secondary me-2"><i className="bi bi-pencil"></i></button>
                            <button type="button" className="btn btn-secondary me-2"><i className="bi bi-eye"></i></button>
                            <button type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td >12/1/2024 12:08</td>
                        <td>COCA-COLA 3Lts x3</td>
                        <td>$3350</td>
                        <td>
                            <button type="button" className="btn btn-secondary me-2"><i className="bi bi-pencil"></i></button>
                            <button type="button" className="btn btn-secondary me-2"><i className="bi bi-eye"></i></button>
                            <button type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td >28/12/2023 18:12</td>
                        <td>Chocolate BLOCK 600g. x1, Papas Fritas LAYS 500g. x1</td>
                        <td>$5000</td>
                        <td>
                            <button type="button" className="btn btn-secondary me-2"><i className="bi bi-pencil"></i></button>
                            <button type="button" className="btn btn-secondary me-2"><i className="bi bi-eye"></i></button>
                            <button type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button>
                        </td>
                        
                    </tr>
                </tbody>
            </table>
        </>
    )
}
