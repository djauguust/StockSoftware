export const getStringOfProducts = (array) => {

    let retorno = ``;
    let size = array?.length
    array?.map((e, index) => {
        retorno = retorno + `"${e.producto}" `
        if (e.peso != 0) {
            retorno = retorno + `x${e.peso * 1000}g`
        }
        if (e.cantidad != 0) {
            retorno = retorno + `x${e.cantidad}`
        }
        if (index + 1 < size) {
            retorno = retorno + `, `
        } else {
            retorno = retorno + `.`
        }
    })
    return retorno
}
