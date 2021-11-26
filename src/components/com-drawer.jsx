import {Drawer, PageHeader } from 'antd';
import React from 'react'


export const ComDrawer = (props) =>{
    const {title,child,visible,close} = props
    return  <Drawer getContainer={false} 
                    width={'100%'} children={child} 
                    headerStyle={{padding:0}} closable={false} 
                    style={{ position: 'absolute'}}   
                    title={<PageHeader style={{padding:'0rem .5rem'}} 
                    onBack={close} title={<span style={{fontSize:'2rem',fontWeight:'normal'}}>{title}</span>}/>} 
                    placement="right" visible={visible} />
}