export const parsearDateForm = (date) => {
  let anioF = parseInt(date.split("-")[0]);
  let mesF = parseInt(date.split("-")[1]);
  let diaF = parseInt(date.split("-")[2]);
  return { anioF, mesF, diaF };
};
