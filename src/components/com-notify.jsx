import {notification } from 'antd';
import React from 'react'

export const openNotificationWithIcon = (type,message) =>{
    type === 0 ? notification.success({ message, top:100}):notification.error({message,top:100})
}