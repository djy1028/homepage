import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
export const Main = (props)=>{
    return <Container>
                {props.children}    
            </Container>
        }

const Container = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
`