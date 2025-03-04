import React from 'react'
import { Form,Input } from 'antd'
import {LongButton} from './index'
import { useAsync } from 'utils/use-async'
import {FormItem} from 'components/form_item'
import { openNotificationWithIcon } from 'components/com-notify'
import { newPwd } from 'utils/pattern'
import { useTranslation } from 'react-i18next';
import { register } from 'auth-provider'

export const RegisterScreen = ({ setRegister }) =>{
    const { t } = useTranslation()
    const {run,isLoading} = useAsync(undefined,{throwNewError:true})
    const handleSubmit = async ({cpassword,...values})=>{
        try{
            const res = await run(register(values))
            setRegister(true)
            res.code === 200?openNotificationWithIcon(0,res.message):openNotificationWithIcon(1,res.message)
        }
        catch (e) {
            openNotificationWithIcon(1,e.message)
        }
    }

    return <Form onFinish={handleSubmit} style={{ height: '28rem', display: 'flex', flexDirection: 'column', justifyContent: 'center'}} >
                <FormItem name={'username'} ruleMessage={t('register.email_message')} emailRule={{type:'email',message: t('register.email_validmessage')}}>
                    <Input type={'text'} allowClear placeholder={t('register.email_placeholder')} />
                </FormItem>
                <FormItem name={'password'}  ruleMessage={t('login.password_message')} passwordRule={{ pattern: newPwd , message: t('register.validate_pwd') }}  >
                    <Input.Password allowClear placeholder={t('login.password_placeholder')} />
                </FormItem>
                <Form.Item dependencies={['password']} name={'cpassword'} rules={[
                            {
                                required: true,
                                message: t('register.confirm_pwd'),
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(t('register.check_confirm')));
                                },
                            })
                            ]}>
                    <Input.Password allowClear placeholder={t('register.cpassword_placeholder')} />
                </Form.Item>
            <LongButton loading={isLoading} htmlType={'submit'} type={'primary'} >{t('register.register_btn')}</LongButton>
        </Form>
}