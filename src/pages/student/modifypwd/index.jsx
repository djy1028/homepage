import React from 'react'
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FormItem } from 'components/form_item';
import { newPwd } from 'utils/pattern';
import { openNotificationWithIcon } from 'components/com-notify';
import { logout, resetpwd } from 'auth-provider'
import styled from '@emotion/styled'
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { submitLogout } from 'store/redux/userRedux'



const Modifypwd = () => {
    const [form] = useForm()
    const { t} = useTranslation()
    const [resetloading, setloading] = useState(false)
    const user = useSelector(state => state.user)
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const layout = {
        labelCol: {
            sm: { flex: 'wrap', span: 6 },
            md: { flex: 'wrap', span: 7 },
            lg: { flex: 'wrap', span: 7 },
            xl: { flex: 'wrap', span: 6 },
        },
        wrapperCol: {
            sm: { span: 14 },
            md: { span: 17 },
            lg: { span: 17 },
            xl: { span: 14 },
        }
    };
    const onFinish = (fields) => {
        const { oldPassword, newPassword } = fields
        setloading(true)
        resetpwd(String(user?.token), { oldPassword, newPassword }).then(res => {
            openNotificationWithIcon(0, res.message)
            form.resetFields()
            setloading(false)
            logout().then(() => {
                queryClient.clear()
                window.location.hash = '/studentLogin'
                dispatch(submitLogout())
                
            })
        }).catch(err => {
            openNotificationWithIcon(1, err.message)
            form.resetFields()
            setloading(false)
        })
    }
    return (
        <Form style={{margin:'10rem'}} form={form} {...layout} onFinish={onFinish} initialValues={{ loginName: user?.name }}>
            <Form.Item label={t('loginname')} name={'loginName'}>
                <Input disabled type={'text'} />
            </Form.Item>
            <FormItem label={t('oldpwd')} name={'oldPassword'} ruleMessage={t('login.oldpassword_message')} passwordRule={{ pattern: newPwd, message: t('register.validate_pwd') }}  >
                <Input.Password allowClear placeholder={t('login.password_placeholder')} />
            </FormItem>
            <FormItem label={t('newpwd')} name={'newPassword'} ruleMessage={t('login.newpassword_message')} passwordRule={{ pattern: newPwd, message: t('register.validate_pwd') }}  >
                <Input.Password allowClear placeholder={t('login.password_placeholder')} />
            </FormItem>
            <Form.Item label={t('confirmnewpwd')} dependencies={['newPassword']} name={'cpassword'} rules={[
                {
                    required: true,
                    message: t('register.confirm_newpwd'),
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error(t('register.check_confirm')));
                    },
                }),
            ]}>
                <Input.Password allowClear placeholder={t('register.cpassword_placeholder')} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                <SubmitBtn  loading={resetloading} type="primary" htmlType="submit">
                    {t('admin.student.savebtn')}
                </SubmitBtn>
                <CancelBtn htmlType="button" onClick={() => { form.resetFields() }} >
                    {t('admin.student.cancelbtn')}
                </CancelBtn>
            </Form.Item>
        </Form>
    )
}

const SubmitBtn = styled(Button)`
    width: 8rem;
     @media (max-width: 1200px) {
        width: auto;
        height: auto;
    }
`

const CancelBtn = styled(Button)`
    width: 8rem;
    margin-left: 2rem;
     @media (max-width: 1200px) {
        width: auto;
        height: auto;
    }
`

export default Modifypwd