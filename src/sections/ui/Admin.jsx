import React, { useContext } from 'react'
import { LoginContext } from '../../context/LoginContext';
import { Error404 } from './Error404';
import { Col, Container, ListGroup, Row, Tab } from 'react-bootstrap';
import { Aumento } from '../Admin/Aumento';

export const Admin = () => {
    const { user } = useContext(LoginContext);
    return (<>
        {user.rol == 2 ? <>
            <div className='m-4'><h1>Administración</h1></div>
            <Tab.Container
                id="list-group-tabs-example"
                defaultActiveKey="#aumento"
            >
                <Container fluid>
                    <Row>
                        <Col sm={3} className="bg-light py-2">
                            <ListGroup>
                                <ListGroup.Item action href="#aumento">
                                    Porcentaje de Cobro
                                </ListGroup.Item>
                                <ListGroup.Item action href="#usuarios">
                                    Administrar Usuarios
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#aumento" mountOnEnter unmountOnExit>
                                    {/* Aquí va el form del aumento */}<Aumento />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#usuarios" mountOnEnter unmountOnExit>
                                    {/* Aquí va la parte de admin de usuarios */}Construyendo Usuarios
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Container>
            </Tab.Container>
        </>
            : <Error404 />}
    </>

    )
}
