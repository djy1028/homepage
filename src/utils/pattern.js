export const rule1 = /^[\u4e00-\u9fa5a-zA-Z\d,\.，。]+$/g
//const rule2 = /^[\u4e00-\u9fa5a-zA-Z\d,\.，;；“”‘’''"";；\-、@。]+$/g
export const pwdPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "g")
export const newPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,20}$/g

export const emptyPattern = /^\s+$/
export const clearSpace = (str) => str.replace(/(^\s*)|(\s*$)/g, '')
