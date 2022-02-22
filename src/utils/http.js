import { notification } from 'antd';
import { getToken, logout } from '../auth-provider'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux';

/* 通用的http异步请求方法。未登录状态下使用,封装http，方便每次调用时候带上token */
export const http = (endpoint, { data, token, headers, ...customConfig }, dispatch = undefined) => {
    let config = {}
    if (headers) {
        config = {
            //method默认为get
            method: "GET",
            headers: {
                Authorization: token ? token : ''
            },
            ...customConfig
        }
    }
    else {
        config = {
            //method默认为get
            method: "GET",
            headers: {
                Authorization: token ? token : '',
                'Content-Type': data ? 'application/json' : ''
            },
            ...customConfig
        }
    }
    if (config.method.toUpperCase() === 'POST') {
        config.body = headers ? data : JSON.stringify(data || {})
    }
    return fetch(`${endpoint}`, config).then(async response => {
        if (response.status === 401) {
            await logout();
            window.location.hash = '/studentLogin'
            notification.error({
                message: '登录已过期，请重新登录'
            });
            dispatch && dispatch({ type: 'LOG_OUT' })

            setTimeout(() => {
                window.location.reload()
            }, 1000)
            return Promise.reject({ message: "请重新登录" })
        }
        const data = await response.json()
        if (response.ok) {
            return data
        }
        else {
            notification.error({
                message: data.message
            });
            return data
        }
    })
}

export const useHttp = () => {
    return useCallback((...[endpoint, config]) => http(endpoint, { ...config, token: getToken() }), [])
}
