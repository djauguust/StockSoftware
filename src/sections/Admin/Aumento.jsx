import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'

export const Aumento = () => {
    const [actualizador, setActualizador] = useState(false)
    const actualizar = () => {
        setActualizador(!actualizador)
    }

    const url = import.meta.env.VITE_URL_BACKEND;

    const initialForm = {
        aumento: 0
    };
    const { formState, onInputChange, onResetForm, setFormState } = useForm(initialForm);

    useEffect(() => {
        axios.get(`${url}/negocio/`).then(({ data }) => {
            setFormState({ aumento: data.aumento })
        });
    }, [actualizador])

    const [editAumento, setEditAumento] = useState(false)

    const handleSave = () => {
        axios
            .put(`${url}/negocio/65f7469ba5197a516e801b2f`, { aumento: formState.aumento, nombre: "Gastón" })
            .then(({ data }) => {
                console.log(data)
                setEditAumento(false)
            })
            .catch(({ response }) => {
                console.log(response.data);
            });
    }

    const enterPulsed = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSave()
        }
    };

    return (
        <>
            <Form onSubmit={() => handleSave()}>
                <div className="row mx-0">
                    <div className="col-12">
                        <Form.Group className="m-3" controlId="formCodBarra">
                            <div className='row'>
                                <div className='col-6'>
                                    <Form.Label>
                                        <b>Porcentaje de aumento al ingresar una compra</b>
                                    </Form.Label>
                                </div>
                                <div className='col-6'>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">+</InputGroup.Text>
                                        <Form.Control
                                            type="number"
                                            name="aumento"
                                            value={formState.aumento}
                                            onChange={onInputChange}
                                            disabled={!editAumento}
                                            min={0}
                                            onKeyDown={enterPulsed}
                                        />
                                        <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                                    </InputGroup>
                                </div>
                            </div>
                        </Form.Group>
                    </div>
                </div>
            </Form >
            <Row className='mx-5'>
                <Col>
                    <Button
                        variant="primary"
                        onClick={() => { if (editAumento) { setEditAumento(false); actualizar() } else setEditAumento(true) }}
                        disabled={editAumento}
                    >
                        Editar
                    </Button>
                </Col>
                {editAumento && <>
                    <Col>
                        <Button variant="success" disabled={!editAumento} onClick={() => handleSave()}>
                            Guardar
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="danger" disabled={!editAumento} onClick={() => { setEditAumento(false); actualizar() }}>
                            Cancelar
                        </Button>
                    </Col>
                </>}
            </Row>
        </>
    )
}
