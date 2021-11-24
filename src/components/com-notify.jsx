import {notification } from 'antd';
import React from 'react'

export const openNotificationWithIcon = (type,message) =>{
    type===0 ?notification.success({message}):notification.error({message})
}