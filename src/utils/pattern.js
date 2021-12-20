export const rule1 = /^[\u4e00-\u9fa5a-zA-Z\d,\.，。]+$/g
//const rule2 = /^[\u4e00-\u9fa5a-zA-Z\d,\.，;；“”‘’''"";；\-、@。]+$/g
export const pwdPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "g")
export const newPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[0-9A-Za-z]{8,20}$/

export const emptyPattern = /^\s+$/
export const clearSpace = (str) => str.replace(/(^\s*)|(\s*$)/g, '')
