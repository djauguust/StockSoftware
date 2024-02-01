export const siguienteValorAlMaximo = (listado) => {
  let cuenta = 0;
  listado.map((l) => {
    if (l.id > cuenta) {
      cuenta = l.id;
    }
  });
  return cuenta + 1;
};
