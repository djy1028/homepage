import React from 'react'
import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
export const Row = styled.div`
display:flex;
align-items: center;
justify-content: ${props=>props.between?'space-between':undefined};
margin-bottom:${props=>props.marginBottom + 'rem'};
> * {
    margin-top:0 !important;
    margin-bottom:0 !important;
    margin-right:${props=> typeof props.gap === 'number'? props.gap + 'rem': props.gap?'2rem':undefined}
}`

const FullPage = styled.div`
    height:100vh;
    display:flex;
    justify-content:center;
    align-items: center;
`

export const FullPageLoading = ()=><FullPage>
    <Spin size={"large"}/>
</FullPage>

export const FullPageError = ({error})=><FullPage>
    <ErrorBox error={error} />
</FullPage>

//类型守卫,判断是否是error类型
const isError = value=>value?.message

export const ErrorBox = ({error})=>{
    if(isError(error)){
        return  <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
    }
   
    return null
}

export const ButtonNoPadding = styled(Button)`
    padding:0
`

export const ScreenContainer = styled.div`
    padding:3.2rem;
    width:100%;
    display: flex;
    flex-direction: column;

`