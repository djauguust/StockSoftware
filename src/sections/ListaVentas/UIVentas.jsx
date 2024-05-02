import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { LoginContext } from "../../context/LoginContext";
import { obtenerFechaHoraEvento } from "../../hooks/getTime";

export const UIVentas = () => {
  const [hora, setHora] = useState(new Date());

  /* useEffect(() => {
    // Función para actualizar la hora
    const actualizarHora = () => {
      setHora(new Date());
    };

    // Actualiza la hora cada segundo
    const intervalo = setInterval(actualizarHora, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalo);
  }, []); // El segundo argumento del useEffect está vacío para que solo se ejecute una vez al montar el componente
 */
  // Función para formatear la hora en formato legible
  const formatearHora = (date) => {
    const horas = date.getHours();
    const minutos = date.getMinutes();
    const segundos = date.getSeconds();
    return `${horas < 10 ? `0${horas}` : horas}:${
      minutos < 10 ? `0${minutos}` : minutos
    }:${segundos < 10 ? `0${segundos}` : segundos}`;
  };
  const formatearFecha = (date) => {
    const dia = date.getDate();
    const mes = date.getMonth();
    const anio = date.getFullYear();

    return `${dia}/${mes + 1}/${anio}`;
  };
  const initialForm = {
    textoBusqueda: "",
    codigo: "",
    cantidad: "",
    peso: "",
    producto: "",
    precio: "",
    cambio: 0,
  };
  const { formState, onInputChange, onResetForm, setFormState } =
    useForm(initialForm);

  const [lista, setLista] = useState([]);

  let array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  const { user } = useContext(LoginContext);

  const [actualizar, setActualizar] = useState(false);
  const actualizador = () => setActualizar(!actualizar);

  const url = import.meta.env.VITE_URL_BACKEND;
  const [listaDeCodigos, setListaDeCodigos] = useState(null);

  useEffect(() => {
    axios.get(`${url}/productos/`).then(({ data }) => {
      setListaDeCodigos(data);
    });
  }, [actualizar]);

  const refCantidad = useRef(null);
  const refPeso = useRef(null);
  const refCodigo = useRef(null);

  useEffect(() => {
    refCantidad.current.focus();
  }, []);

  const onCantidadPulsed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      refPeso.current.focus();
    }
    if (event.key === "Tab") {
      event.preventDefault();
      /* Codigo = Cantidad y Cantidad = 1 */
      setFormState({
        ...formState,
        codigo: formState.cantidad,
        cantidad: 1,
        peso: "",
      });
      /* Carga al carrito y onResetForm */

      agregarACarrito({ codigo: formState.cantidad, cantidad: 1, peso: "" });
    }
  };

  const onPesoPulsed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      refCodigo.current.focus();
    }

    if (event.key === "Tab") {
      event.preventDefault();
      /* Codigo = Peso y Peso = 100 */
      setFormState({
        ...formState,
        codigo: formState.peso,
        peso: 100,
        cantidad: "",
      });
      /* Carga al carrito y onResetForm */
      agregarACarrito({ codigo: formState.peso, peso: 100, cantidad: "" });
    }
  };

  const onCodigoPulsed = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      if (
        formState.cantidad == "" &&
        formState.peso == "" &&
        formState.codigo !== ""
      ) {
        onResetForm();
        refCantidad.current.focus();
        return;
      }
    }
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      if (
        formState.codigo == "" &&
        formState.peso == "" &&
        formState.cantidad == ""
      ) {
        /* Cierra la caja */
        watchModal();
      } else {
        if (formState.cantidad !== "" && formState.peso !== "") {
          /* Estado no permitido*/
          onResetForm();
        } else {
          if (formState.codigo == "") {
            /* onResetForm */
            console.log("Sólo codigo vacío");
          } else {
            /* Carga en carrito y onResetForm */
            if (formState.cantidad == "" && formState.peso == "") {
              onResetForm();
            } else {
              agregarACarrito(formState);
            }
          }
        }
      }
      refCantidad.current.focus();
    }
  };

  const agregarACarrito = (producto) => {
    let aux = listaDeCodigos.find((e) => e.codigo == producto.codigo);

    if (aux) {
      if (
        (aux.isCantidad && producto.peso == "") ||
        (!aux.isCantidad && producto.cantidad == "")
      ) {
        setLista([
          ...lista,
          {
            producto: aux.descripcion,
            cantidad: producto.cantidad,
            peso: producto.peso,
            precio: aux.precio,
            codigo: aux.codigo,
            isCantidad: aux.isCantidad,
          },
        ]);
      }
    }
    onResetForm();
  };

  /* Quedo aquí porque tengo que empezar con STOCK */
  console.log(lista);
  console.log(listaDeCodigos);

  const limpiarLista = () => {
    setLista([]);
    refCantidad.current.focus();
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let aux = 0;
    lista.map((e) => {
      aux = aux + e.precio * e.cantidad + e.precio * (e.peso / 1000);
    });
    setTotal(aux);
  }, [lista]);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const campoDeEntradaRef = useRef(null);

  const watchModal = () => {
    if (total == 0) {
      console.log("Sin productos!");
    } else {
      setShowModal(true);
      setFormState({ ...formState, cambio: "" });
      setTimeout(function () {
        campoDeEntradaRef.current.focus();
      }, 100);
    }
  };

  const handleSubmit = () => {
    let aux = {
      user: user.id,
      fechaHora: obtenerFechaHoraEvento(),
      productos: lista,
    };
    console.log(aux);
    axios
      .post(`${url}/ventas`, aux)
      .then(({ data }) => {
        console.log(data);
        setShowModal(false);
        setLista([]);
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  };

  const enterPulsed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const deleteElement = (e) => {
    const newArray = [...lista.slice(0, e), ...lista.slice(e + 1)];
    setLista(newArray);
    refCantidad.current.focus();
  };

  return (
    <Fragment>
      <Row className="my-3 mx-5">
        <Col>
          <b>
            <h3>
              <Row>{formatearFecha(hora)}</Row>
              <Row>{formatearHora(hora)}</Row>
            </h3>
          </b>
        </Col>
        <Col xs={9}>
          <h2>Ventas</h2>
        </Col>
      </Row>
      <hr />
      <Row className="container-fluid">
        <div className="row px-5 container-fluid">
          <div className="col-4">
            <Form.Group className="mb-3" controlId="formCodBarra">
              <Form.Label>
                <h5>Cantidad</h5>
              </Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                value={formState.cantidad}
                onChange={onInputChange}
                ref={refCantidad}
                onKeyDown={onCantidadPulsed}
              />
            </Form.Group>
          </div>
          <div className="col-4">
            <Form.Group className="mb-3" controlId="formCodBarra">
              <Form.Label>
                <h5>Peso (en gramos)</h5>
              </Form.Label>
              <Form.Control
                type="number"
                name="peso"
                value={formState.peso}
                onChange={onInputChange}
                ref={refPeso}
                onKeyDown={onPesoPulsed}
              />
            </Form.Group>
          </div>
          <div className="col-4">
            <Form.Group className="mb-3" controlId="formCodBarra">
              <Form.Label>
                <h5>Código de Barras</h5>
              </Form.Label>
              <Form.Control
                type="number"
                name="codigo"
                value={formState.codigo}
                onChange={onInputChange}
                ref={refCodigo}
                onKeyDown={onCodigoPulsed}
              />
            </Form.Group>
          </div>
        </div>
      </Row>
      <Row className="my-3 mx-5">
        <h1>
          {lista[lista.length - 1]?.producto} : $
          {lista[lista.length - 1]?.precio}
        </h1>
      </Row>
      <hr />
      <table className="table table-striped mt-3 px-4">
        <thead className="px-2">
          <tr>
            <th scope="col">#</th>
            <th scope="col">PRODUCTO</th>
            <th scope="col">CANTIDAD</th>
            <th scope="col">PESO</th>
            <th scope="col">PRECIO (Kg o u.)</th>
            <th scope="col">Subtotal</th>
            <th scope="col">ELIMINAR</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((p, index) => (
            <tr key={index}>
              <th scope="row">{index + 1} </th>
              <td>{p.producto}</td>
              <td>{p.cantidad}</td>
              <td>{p.peso == "" ? "" : `${p.peso}g.`}</td>
              <td>${p.precio}</td>
              <td>${p.precio * p.cantidad + p.precio * (p.peso / 1000)}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  size="xs"
                  onClick={() => deleteElement(index)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          {array.map((e) => {
            if (e < 30)
              return (
                <tr key={e + 1}>
                  <th scope="row"> </th>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr>
              );
          })}
        </tbody>
      </table>

      <nav className="navbar navbar-dark bg-dark fixed-bottom text-white">
        <div className="container">
          <div className="col-3">
            <Button
              className="ms-4"
              variant="success"
              size="lg"
              onClick={() => watchModal()}
            >
              <b>PAGAR</b>
            </Button>
          </div>
          <div className="col-3">
            <Button
              className="ms-4"
              variant="danger"
              size="lg"
              onClick={limpiarLista}
            >
              <b>LIMPIAR</b>
            </Button>
          </div>
          <div className="col-2"></div>
          <div className="col-4">
            <h1 className="me-0">TOTAL: $ {total}</h1>
          </div>
        </div>
      </nav>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CONFIRMAR VENTA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row mx-0">
              <div className="col-12">
                <Form.Group className="mb-3" controlId="formCodBarra">
                  <Form.Label>
                    <b>TOTAL A PAGAR</b>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="total"
                    value={total}
                    disabled
                  />
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group className="mb-3" controlId="formCodBarra">
                  <Form.Label>
                    <b>CAMBIO</b>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="cambio"
                    value={formState.cambio}
                    onChange={onInputChange}
                    ref={campoDeEntradaRef}
                    onKeyDown={enterPulsed}
                  />
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group className="mb-3" controlId="formCodBarra">
                  <Form.Label>
                    <b>VUELTO</b>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="vuelto"
                    value={formState.cambio - total}
                    disabled
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
          {/* {showAlert && (
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
          )} */}
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
            Confirmar Venta
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
