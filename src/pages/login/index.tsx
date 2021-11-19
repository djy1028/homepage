import React, { useEffect,useState } from 'react'
// import { useAuth } from 'context/auth-context'
import { Button, Checkbox, Col, Form,Input, Row } from 'antd'
// import {LongButton} from './index'
// import { useAsync } from 'utils/use-async'
// import styled from '@emotion/styled'
// import { backpwd, verifycode } from 'auth-provider'
// import { ComModal } from 'components/com-modal'
// import { openNotificationWithIcon } from 'components/com-notify'
// import { Base64 } from 'js-base64';
import { useForm } from 'antd/lib/form/Form'
import { FormItem } from '../../components/form_item'

export const LoginScreen = ({onError}:{onError:(error:Error)=>void}) =>{
    // const {login,t} = useAuth()
    const [form] = useForm()
    // const [imgSrc,setImgSrc] = useState("")
    // const [math,setMath] = useState(-1)
    // const {run,isLoading,isError} = useAsync(undefined,{throwNewError:true})
    // const [showPwdback,setPwdback] = useState(false)
    const handleSubmit = async ({lang,...values}:{username:string,password:string,code:string,lang:string,remember:boolean})=>{
        //try catch是同步的，所以catch里面是无法捕获异步操作login里面返回的错误，所以需要加上async await进行处理
        // values.remember?setCookie(values?.username,values?.password,1):setCookie('','',-1)
        // try{
        //     //这里通过run来设置isloading的状态
        //    await run(login(values))
        // }
        // catch(e){
        //     onError(new Error(e.message))
        // }
    }

    // /* 记住我功能 */
    // const setCookie = (username:string, password:string,days:number)=> {
    //     let date = new Date(); // 获取时间
    //     date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days); // 保存1天
    //     // 字符串拼接cookie
    //     window.document.cookie =
    //       "username" + "=" + username + ";path=/;expires=" + date.toUTCString();
    //     window.document.cookie =
    //       "password" + "=" + Base64.encode(password) + ";path=/;expires=" + date.toUTCString();
    // }

    // const getCookie =()=> {
    //     if (document.cookie.length > 0) {
    //         let arr = document.cookie.split("; "); //分割成一个个独立的“key=value”的形式
    //         for (let i = 0; i < arr.length; i++) {
    //         let arr2 = arr[i].split("="); // 再次切割，arr2[0]为key值，arr2[1]为对应的value
    //         if (arr2[0] === "username") {
    //             form.setFieldsValue({
    //                 username:arr2[1]
    //             })
    //         } else if (arr2[0] === "password") {
    //             form.setFieldsValue({
    //                 password:Base64.decode(arr2[1]),
    //                 remember:true
    //             })
    //         }
    //         }
    //     }
    // }

    // useEffect(()=>{
    //     getCookie()
    //     verifycode().then(img=> setImgSrc(`data:image/jpeg;base64,${img}`))
    // },[math,isError])


  
    return <>
                <Form onFinish={handleSubmit} form={form}>
                    <FormItem name={'username'} ruleMessage={t('login.username_message')}  >
                        <Input type={'text'} allowClear placeholder={t('login.username_placeholder')} />
                    </FormItem>
                    <FormItem name={'password'} ruleMessage={t('login.password_message')}  >
                        <Input.Password allowClear placeholder={t('login.password_placeholder')}/>
                    </FormItem>
                    <FormItem name={'code'} style={{marginBottom:'.5rem'}} ruleMessage={t('login.validcode_message')} >
                        <Row gutter={4}>
                            <Col span={16}><Input allowClear type={'text'}  placeholder={t('login.validcode_placeholder')} id={'code_input'}/></Col>
                            <Col span={8}><a style={{width:'100%',height:'100%'}} onClick={()=>setMath(Math.random())} title={t('login.validcode_title')}>
                                <Img src={imgSrc} alt='' />
                                </a></Col>
                        </Row>
                    </FormItem>
                    <Form.Item >
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox  style={{float:'left'}}>{t('login.remember')}</Checkbox>
                        </Form.Item>
                        <a style={{float:'right'}} onClick={()=>setPwdback(true)} >
                            {t('login.forget_pwd')}
                        </a>
                    </Form.Item>
                    <LongButton loading={isLoading} htmlType={'submit'} type={'primary'} >{t('login.login_btn')}</LongButton>
                
                </Form>
                {showPwdback && <ComModal footer={null} visible={showPwdback} title={t('login.findback_pwd')} children={<Pwdback  close={()=>setPwdback(false)}/>} close={()=>setPwdback(false)}/>}   
            </>
           
}

const Img = styled.img`
    height:77%;
    width:100%;
    border-radius: 4px;
`

export const Pwdback = (props:{close:()=>void})=>{
    const {t} = useAuth()
    const {close} = props
    const onFinish = (fields:any)=>{
        backpwd(fields).then(res=>{
            openNotificationWithIcon(0,t('login.findback_mes'))
        }).catch(err=>openNotificationWithIcon(1,err.message))
    }
    return  <Form onFinish={onFinish}>
                <FormItem name={'email'} ruleMessage={t('register.email_message')} emailRule={{type:'email',message: t('register.email_validmessage')}}>
                    <Input type={'text'} allowClear placeholder={t('register.email_placeholder')} />
                </FormItem>
                <Form.Item  wrapperCol={{ offset: 10}}>
                    <Button type="primary" htmlType="submit">
                        {t('admin.activity.savebtn')}
                    </Button>
                    <Button  htmlType="button" onClick={close} style={{margin:'0 2rem'}}>
                        {t('admin.activity.cancelbtn')}
                    </Button>
                </Form.Item>
    
            </Form>
}