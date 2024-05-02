export const parsearDateGaston = (date) => {
  let anioG = parseInt(date.split("/")[2].split(" ")[0]);
  let mesG = parseInt(date.split("/")[1]);
  let diaG = parseInt(date.split("/")[0]);
  return { anioG, mesG, diaG };
};
