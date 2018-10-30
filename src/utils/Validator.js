export const required = (msg) => (value) => (!value && value != 0 && value != '') ? msg : undefined

export const requiredObj = (msg) => (value) => (!value || Object.keys(value).length == 0 || (!value.id && value.id != 0 && value.id != '')) ? msg : undefined

export const validatePhone = (msg) => (value) => !(/^1[34578]\d{9}$/.test(value)) ? msg : undefined

