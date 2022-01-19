import React, { useEffect, useState } from 'react'
import { LoginScreen } from './login'
import { RegisterScreen } from './register'
import styled from '@emotion/styled'
import { Button, Card, Result, Form, Input,Radio,Modal } from 'antd'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { forgetCodecheck, logout, regisactive, setNewPwd } from 'auth-provider'
import { openNotificationWithIcon } from 'components/com-notify'
import { ComModal } from 'components/com-modal'
import { FormItem } from 'components/form_item'
import { newPwd } from 'utils/pattern'
import { useDispatch } from 'react-redux'
import i18n from 'i18next'
import { NavLink } from 'react-router-dom'
const LoginApp = () => {
    const { t } = useTranslation()
    const [isRegister, setIsRegister] = useState(true)
    const dispatch = useDispatch()
    const [checkRegis, setCheckRegis] = useState(window.location.hash.includes('studentLogin?link'))
    const [forgetPwd, setforgetPwd] = useState('')
    const [resetPwd, setrePwd] = useState(false)
    const handleChange = (type) => {
        i18n.changeLanguage(type)
        dispatch({
            type: type === 'zh' ? 'chiFlag_chi' : 'chiFlag_en',
        })
    }
    useEffect(() => {
        if (checkRegis) {
            const linkparam = window.location.hash.split('=')[1]
            regisactive({ link: linkparam }).then(res => {
                openNotificationWithIcon(0, res.message)
                setCheckRegis(false)
                window.location.hash = '/studentLogin'
            }).catch(err => {
                openNotificationWithIcon(1, err.message)
                setCheckRegis(false)
                window.location.hash = '/studentLogin'
            })
        }
        console.log(window.location.hash)
        if (window.location.hash.includes('studentLogin?forgetCode')) {
            const codeparam = window.location.hash.split('=')[1]
            logout().then(rsp => { 
                window.location.hash = '/studentLogin'
                dispatch({ type: 'LOG_OUT' })
                forgetCodecheck({ forgetCode: codeparam }).then(res => {
                    if (res.isAvailable) {
                        setrePwd(true)
                        setforgetPwd(codeparam)
                    }
                    else {
                        openNotificationWithIcon(1, res.message)
                        setrePwd(false)
                    }
                }).catch(err => {
                    openNotificationWithIcon(1, err.message)
                    setrePwd(false)
                    window.location.hash = '/studentLogin'
                })
            })
           
        }
    }, [])
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        <Container>
            <Background src={process.env.PUBLIC_URL + "/img/login.png"} />
            <ContanerRight>
                <RightHeader>
                    <img src={process.env.PUBLIC_URL + "/logoori.png"} />
                    <h1>{t('login.title')}</h1>
                    
                </RightHeader>
            {
                checkRegis ? <Result style={{ zIndex: 10 }} icon={<span style={{ fontSize: '3rem', color: '#fff' }}><Spin style={{ color: '#fff' }} indicator={antIcon} />  {t('login.checkingaccount')}</span>} /> :
                    <ShadowCard>
                        <Langselect id={'lang_select'} >
                            <Radio.Group onChange={(e) => handleChange(e.target.value)} defaultValue={i18n.language} >
                                <Radio value={'zh'}>{t('login.lang_zh')}</Radio>
                                <Radio value={'en'}>{t('login.lang_en')}</Radio>
                            </Radio.Group>
                        </Langselect>
                        {
                            isRegister ? <LoginScreen /> : <RegisterScreen setRegister={setIsRegister} />
                        }
                        <More>
                            <A type={"link"} onClick={() => setIsRegister(!isRegister)}>
                            {isRegister ? t('login.noaccount') : t('login.existaccount')}</A>
                            <NavLink to={ '/homepage'} >{t('homeheader.homepage')}</NavLink>
                            <A href="https://summer.iscas.ac.cn/help/" target="_blank" rel="noreferrer"><span >&nbsp;<span>{t('homeheader.help')}</span>&nbsp;</span></A>
                        </More>
                    </ShadowCard>
                }
               
                <RightFooter>
                    { t('login.copyright')}
                </RightFooter>
                <ComModal visible={ resetPwd} footer={null} title={t('login.setNewPwd')} children={<NewPwd forgetPwd={forgetPwd} setrePwd={setrePwd} close={() => setrePwd(false)} />} close={() => setrePwd(false)} />
            </ContanerRight>
        
        </Container>
    )
}

export const LongButton = styled(Button)`
    width:100%;
    background-color: #4c9bf5;
    border-radius: 5px;
    border:none
`

const Container = styled.div`
    display:flex;
    min-height: 100vh;
`
const ContanerRight = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

const Background = styled.img`
    display: inline-block;
    width:30%;
    height:100vh;
    @media (max-width: 768px){
        display: none;
    }
`

const ShadowCard = styled(Card)`
    width:42rem;
    height:35rem;
    padding: 0 2rem;
    box-sizing: border-box;
    box-shadow:rgba(0,0,0,0.1) 0 0 10px;
    text-align: center;
    background-color: #e8eef1;;
    border-radius: .5rem;
    opacity: 0.8;
`

const RightHeader = styled.header`
    height:22vh;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 4%;
    justify-content: center;
    @media (max-width: 1280px){
         height:15vh;
    }
    img{
        width:13rem;
        @media (max-width: 1280px){
            width:10rem
        }    
    }
    h1{
        font-weight: bolder;
        letter-spacing: 2px;
        @media (max-width: 1280px){
            font-size:26px ;
        }    
    }
`

const RightFooter = styled.footer`
    height:5vh;
    width:100%;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0%;
    justify-content: center;
    color:#333;
    @media (max-width: 1024px){
        font-size:14px
    }
    @media (max-width: 768px){
        font-size:12px
    }

`

const Langselect = styled.div`
    display: flex;
`

const More = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top:3rem

`

const A = styled.a`
    z-index: 1;
    &:hover {
        cursor: pointer;
    }
`
const NewPwd = (props) => {
    const { t } = useTranslation()
    const { close, setrePwd, forgetPwd } = props
    const layout = {
        labelCol: { flex: 'wrap', span: 5 },
        wrapperCol: { span: 18 },
    };
    const onFinish = (fields) => {
        const forgetCode = forgetPwd
        const params = { newPassword: fields.newPassword, forgetCode: forgetCode }
        setNewPwd(params).then(res => {
            openNotificationWithIcon(0, res.message)
            setrePwd(false)
            window.location.hash = '/studentLogin'
        }).catch(err => {
            openNotificationWithIcon(1, err.message)
            setrePwd(false)
            window.location.hash = '/studentLogin'
        })
    }
    return <Form onFinish={onFinish} {...layout}>
        <FormItem name={'newPassword'} label={t('login.newpws')} ruleMessage={t('login.password_message')} passwordRule={{ pattern: newPwd, message: t('register.validate_pwd') }}  >
                    <Input.Password allowClear placeholder={t('login.password_placeholder')} />
                </FormItem>

                <Form.Item label={t('login.confirmagain')} dependencies={['newPassword']} name={'cpassword'} rules={[
                    {
                        required: true,
                        message: t('register.confirm_pwd'),
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(t('register.check_confirm')));
                        },
                    }),
                ]}  >
                    <Input.Password allowClear placeholder={t('register.cpassword_placeholder')} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10 }}>
                    <Button type="primary" htmlType="submit">
                        {t('admin.activity.savebtn')}
                    </Button>
                    <Button htmlType="button" onClick={close} style={{ margin: '0 2rem' }} >
                        {t('admin.activity.cancelbtn')}
                    </Button>
                </Form.Item>

            </Form>
}

export default LoginApp