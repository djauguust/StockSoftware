export function obtenerFechaHoraEvento() {
  // Crear un nuevo objeto Date con la fecha y hora actuales
  let fechaHoraActual = new Date();

  // Obtener los componentes de la fecha y hora
  let año = fechaHoraActual.getFullYear();
  let mes = fechaHoraActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
  let dia = fechaHoraActual.getDate();
  let horas = fechaHoraActual.getHours();
  let minutos = fechaHoraActual.getMinutes();
  let segundos = fechaHoraActual.getSeconds();

  // Formatear la fecha y hora como una cadena
  let fechaHoraFormateada = `${dia}/${mes}/${año} ${
    horas < 10 ? `0` : ``
  }${horas}:${minutos < 10 ? `0` : ``}${minutos}:${
    segundos < 10 ? `0` : ``
  }${segundos}`;

  // Devolver la cadena formateada
  return fechaHoraFormateada;
}
