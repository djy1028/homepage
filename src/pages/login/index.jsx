import React, { useEffect, useState } from 'react'
import { LoginScreen } from './login'
import { RegisterScreen } from './register'
import styled from '@emotion/styled'
import { Button, Card, Result, Form, Input } from 'antd'
import { ErrorBox } from 'components/lib'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { forgetCodecheck, logout, regisactive, setNewPwd } from 'auth-provider'
import { openNotificationWithIcon } from 'components/com-notify'
import { ComModal } from 'components/com-modal'
import { FormItem } from 'components/form_item'
import { newPwd } from 'utils/pattern'
import { useDispatch } from 'react-redux'
const LoginApp = () => {
    const { t } = useTranslation()
    const [isRegister, setIsRegister] = useState(true)
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [checkRegis, setCheckRegis] = useState(window.location.hash.includes('studentLogin?link'))
    const [forgetPwd, setforgetPwd] = useState('')
    const [resetPwd,setrePwd] = useState(false)
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
            <Header>
                <Imgtitle src={process.env.PUBLIC_URL + "/title1.png"} />
                <Imgtitle src={process.env.PUBLIC_URL + "/title2.png"} />
            </Header>
            <Background src={process.env.PUBLIC_URL + "/home.png"} />
            {
                checkRegis ? <Result style={{ zIndex: 10 }} icon={<span style={{ fontSize: '3rem', color: '#fff' }}><Spin style={{ color: '#fff' }} indicator={antIcon} />  {t('login.checkingaccount')}</span>} /> :
                    <ShadowCard>
                            <ErrorBox error={error} />
                            {
                                isRegister ? <LoginScreen onError={setError} /> : <RegisterScreen setRegister={setIsRegister} onError={setError} />
                            }
                            <More>
                                <A type={"link"} onClick={() => setIsRegister(!isRegister)}>
                                    {isRegister ? t('login.noaccount') : t('login.existaccount')}</A>
                                <A href="https://summer.iscas.ac.cn/help/" target="_blank" rel="noreferrer"><span >&nbsp;<span>{t('homeheader.help')}</span>&nbsp;</span></A>

                            </More>
                    </ShadowCard>
            }
            
            {resetPwd && <ComModal footer={null} visible={resetPwd} title={t('login.setNewPwd')} children={<NewPwd forgetPwd={forgetPwd} setrePwd={setrePwd} visible={resetPwd} close={() => setrePwd(false)} />} close={() => setrePwd(false)} />}
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
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    

`

const Background = styled.img`
    position: absolute;
    width:100%;
    height:100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: left bottom, right bottom;
    background-size: calc(((100vw-40rem)/2)-3.2rem),calc(((100vw-40rem)/2)-3.2rem),cover;

`

const ShadowCard = styled(Card)`
    width:44rem;
    height:40rem;
    padding: 2rem;
    box-sizing: border-box;
    box-shadow:rgba(0,0,0,0.1) 0 0 10px;
    text-align: center;
    background-color: #ffffff;
    border-radius: .5rem;
    opacity: 0.9;
`

const Header = styled.header`
    height:22vh;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Imgtitle = styled.img`
    z-index: 10;
    margin:.5rem 0
`

const More = styled.div`
    display: flex;
    justify-content: space-around;

`

const A = styled.a`
    z-index: 1;
    &:hover {
        cursor: pointer;
    }
`

const NewPwd = (props) => {
    const { t } = useTranslation()
    const { close, visible, setrePwd, forgetPwd } = props
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