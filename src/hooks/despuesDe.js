import { parsearDateForm } from "./parsearDateForm";
import { parsearDateGaston } from "./parsearDateGaston";

export function despuesDe(obj, value) {
  try {
    let { anioG, mesG, diaG } = parsearDateGaston(obj);
    let { anioF, mesF, diaF } = parsearDateForm(value);

    if (anioF > anioG) {
      return false;
    } else if (anioF == anioG) {
      if (mesF > mesG) {
        return false;
      } else if (mesF == mesG) {
        if (diaF > diaG) {
          return false;
        }
      }
    }
    return true;
  } catch (e) {
    return false;
  }
}
