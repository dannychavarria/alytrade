// Verificador para identifiaciones personales
export const identificationRegex = (value) => new Promise((resolve, reject) => {
    const regex = /^[a-zA-Z0-9]{0,}([a-zA-Z0-9\-])+$/

    if (regex.test(value) || value.length === 0) {
        resolve(value)
    } else {
        //reject(value)
    }
})

// Verificador de valores flotantes
export const floatRegex = (value) => new Promise((resolve, reject) => {
    const regex = /^\d{0,}(\.\d{0,8})?$/

    if (regex.test(value) || value.length === 0) {
        resolve(value)
    } else {
        //reject(value)
    }
})

// Verificador para valoren enteros
export const integerRegex = (value) => new Promise((resolve, reject) => {
    const regex = /^\d{0,}?$/

    if (regex.test(value) || value.length === 0) {
        resolve(value)
    } else {
        //reject(value)
    }
})

// Verificador para nombres
export const nameRegex = (value) => new Promise((resolve, reject) => {
    const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\']{0,}(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\']*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\'](\s{0,})$/g

    if (regex.test(value) || value.length === 0) {
        resolve(value)
    } else {
        //reject(value)
    }
})

// Verificador para números telefónicos
export const telephoneRegex = (value) => new Promise((resolve, reject) => {
    const regex = /^[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g

    if (regex.test(value) || value.length === 0) {
        resolve(value)
    } else {
        //reject(value)
    }
})

// Verificador para correos
export const emailRegex = (value) => new Promise((resolve, reject) => {
    const regex = /^[\w\-\_\.]{0,}$/

    if (regex.test(value) || value.length === 0) {
        resolve(value)
    } else {
        //reject(value)
    }
})

// Verificador para un código postal
export const postalCodeRegex = (value) => new Promise((resolve, reject) => {
    const regex = /^[0-9]{0,}([0-9\-])+$/

    if (regex.test(value) || value.length === 0) {
        resolve(value)
    } else {
        //reject(value)
    }
})