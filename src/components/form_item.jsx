import React, { ReactNode } from 'react'
import {Form, FormItemProps} from 'antd'

// interface ItemProps extends FormItemProps{
//     name:string,
//     ruleMessage?:string,
//     children:ReactNode,
//     label?:string,
//     emailRule?:object,
//     passwordRule?:{
//         pattern: RegExp;
//         message: string;
//     }
// }

export const FormItem = (props)=>{
    const {name,ruleMessage,children,label,emailRule,passwordRule,...rest} = props
    return <>
        <Form.Item label={label} name={name} {...rest}  rules={[{required:true,message:ruleMessage},emailRule?emailRule:{},passwordRule?passwordRule:{}]} >
            {children}
        </Form.Item>
    </>
}