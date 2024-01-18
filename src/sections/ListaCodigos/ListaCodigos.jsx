import React from 'react'

export const ListaCodigos = () => {
    return (
        <>
            <h1>
                Lista de Códigos y Productos
            </h1>
            <hr />
            <button type="button my-2" class="btn btn-primary">
            <i class="bi bi-plus-circle"></i> Agregar Producto
            </button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Código</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>7002384917</td>
                        <td>Papas Fritas LAYS 500g.</td>
                        <td>
                            <button type="button" class="btn btn-secondary me-2"><i class="bi bi-pencil"></i></button>
                            <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>7283944172</td>
                        <td>COCA-COLA 3Lts</td>
                        <td>
                            <button type="button" class="btn btn-secondary me-2"><i class="bi bi-pencil"></i></button>
                            <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>0020398299</td>
                        <td>Chocolate BLOCK 600g.</td>
                        <td>
                            <button type="button" class="btn btn-secondary me-2"><i class="bi bi-pencil"></i></button>
                            <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
