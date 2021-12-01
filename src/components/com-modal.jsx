import React, { useRef, useState } from 'react'
import { Modal } from 'antd';
import Draggable from 'react-draggable';


export const ComModal = (props)=> {
    const draggleRef = useRef(null);;
    const {visible,close,title,width,children,footer,onOk,isloading,...restProps} = props;
    const [disabled,setDisabled] = useState(true)
    const [bounds,setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
    const handleOk = (e) => {
        onOk && onOk()
        !isloading && close()
    }
 
    const handleCancel = (e) => {
        close()
    }

    const onStart = (event, uiData) => {
        const { clientWidth, clientHeight } = window?.document?.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        targetRect && setBounds( {
            left: -targetRect.left + uiData?.x,
            right: clientWidth - (targetRect?.right - uiData?.x),
            top: -targetRect?.top + uiData?.y,
            bottom: clientHeight - (targetRect?.bottom - uiData?.y),
        })
    };
  
    const modalTitle = <div id={'commodal_title'}
            style={{
                width: '100%',
                cursor: 'move',
            }}
            onMouseOver={() => {
                if (disabled) {
                setDisabled(false)
                }
            }}
            onMouseOut={() => {
                setDisabled(true)
            }}
            
            onFocus={() => {}}
            onBlur={() => {}}
            >
        {title}
    </div>
    return (
        <>
            <Modal
                title={modalTitle}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={width}
                bodyStyle={{maxHeight:'70vh',overflowY:'auto'}}
                footer={footer}
                maskClosable = {false}
                modalRender={modal => (
                    <Draggable
                        disabled={disabled}
                        bounds={bounds}
                        onStart={(event, uiData) => onStart(event, uiData)}
                    >
                    <div ref={draggleRef}>{modal}</div>
                    </Draggable>
                )} {...restProps}
            >
            {children}
            </Modal>
        </>
    );
  }