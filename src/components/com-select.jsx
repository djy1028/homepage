import { Select } from 'antd';
import React from 'react'

export const CommonSelect = (props)=>{
    const {width,value,onChange,defaultOptionName,options,...restProps} = props;
    return (
        <Select  getPopupContainer={triggerNode => triggerNode.parentNode} style={{width:width}} allowClear value={restProps.mode?value:options?.length?value:0} onChange={value=>onChange?.(value)} {...restProps}>
            {
                defaultOptionName?<Select.Option value={0}>{defaultOptionName}</Select.Option>:null
            }
            {
                options?.map(option=><Select.Option value={option.id} key={option.id}>{option.name}</Select.Option>)
            }
        </Select>
    )
}

