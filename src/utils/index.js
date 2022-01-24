import { useEffect, useState, useRef, useMemo } from "react"
import CryptoJS from 'crypto-js'

//Falsy无法判断当键值的值为false情况，这种情况下会误删
const Falsy = (value) => value === 0 ? false : !value

const isVoid = (value) => value === undefined || value === null || value === ''

// 通过类型{[key:string]:unknown}来限制键值对
export const ObjectCleanEmpty = (obj) => {
    //一个函数方法不要改变传入的对象值
    const result = { ...obj }
    Object.keys(result).forEach(item => {

        if (isVoid(result[item]))
            //delete方法删除对象属性
            delete result[item]
    })
    return result
}
// 箭头函数泛型声明放在箭头函数之前,普通函数泛型声明放在函数名之后 funtion setState <S>
export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        //清楚上一次useEffect产生的副作用
        return () => { clearTimeout(timeout) }
    }, [value, delay])

    return useMemo(() => debouncedValue, [debouncedValue])
}

//自定义title的hooks
export const useDocumentTitle = (title, keepOnUmount = true) => {
    const oldTitle = useRef(document.title).current

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUmount) {
                document.title = oldTitle
            }
        }
    }, [oldTitle, keepOnUmount])
}

/* 返回组件的挂载状态，如果还没有挂载或者已经卸载，返回false；反之，返回true*/
export const useMountedRef = () => {
    const mountedRef = useRef(false)
    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    })
    return mountedRef
}

/* 格式化select框数据 */
export const useFormSel = (data, basecount) => data.map((item, index) => ({ id: basecount ? basecount + index + 1 : index + 1, name: item }))

/* 加密 */
export const aesEncrypt = (content) => {
    let secretKey = 'qBD7kLe6G5vH0H8a'
    let key = CryptoJS.enc.Utf8.parse(secretKey);
    let srcs = CryptoJS.enc.Utf8.parse(content ? String(content) : '');
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}
/* 解密 */
export const raesDecrypt = (encryptStr) => {
    let secretKey = 'qBD7kLe6G5vH0H8a'
    let key = CryptoJS.enc.Utf8.parse(secretKey);
    let decrypt = CryptoJS.AES.decrypt(encryptStr ? String(encryptStr) : '', key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}


