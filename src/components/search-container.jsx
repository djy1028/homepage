import styled from '@emotion/styled'
import Form from 'antd/lib/form/Form'
import React, { ReactNode } from 'react'
export const SearchContainer = (props)=>{
    return(
        <Container layout={'inline'} name={props.name} >
            {props.children}
        </Container>
    )
}

const Container = styled(Form)`
    width: 100%;
    padding: 0 1rem ;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
    border-radius: 5px;
    display:flex;
    justify-content: ${props=>props.name && props.name?.includes('btn')?'space-between':'flex-end'};
    margin-bottom: 1rem;
`