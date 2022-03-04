import { Input, InputNumber, InputProps, InputNumberProps } from 'antd';
import React from 'react'


export const CommonInput = (props) => {

    const { value, ...restProps } = props;
    return <Input value={value}  {...restProps} />
}

export const CommonInputNum = (props) => {

    const { value, ...restProps } = props;
    return <InputNumber min={1} style={{ width: '100%' }} max={100000000} addonAfter="￥" value={value}  {...restProps} />
}