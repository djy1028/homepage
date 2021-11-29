import React from 'react'
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FormItem } from 'components/form_item';
import { pwdPattern } from 'utils/pattern';
import { openNotificationWithIcon } from 'components/com-notify';
import { resetpwd} from 'auth-provider'

export const Modifypwd = () => {
    const [form] = useForm()
    const { t} = useTranslation()
    const [resetloading, setloading] = useState(false)
    const user = useSelector(state=>state.user)
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    }
    const onFinish = (fields) => {
        const { oldPassword, newPassword } = fields
        setloading(true)
        resetpwd(String(user?.token), { oldPassword, newPassword }).then(res => {
            openNotificationWithIcon(0, res.message)
            form.resetFields()
            setloading(false)
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
            <FormItem label={t('oldpwd')} name={'oldPassword'} ruleMessage={t('login.oldpassword_message')} passwordRule={{ pattern: pwdPattern, message: t('register.validate_pwd') }}  >
                <Input.Password allowClear placeholder={t('login.password_placeholder')} />
            </FormItem>
            <FormItem label={t('newpwd')} name={'newPassword'} ruleMessage={t('login.newpassword_message')} passwordRule={{ pattern: pwdPattern, message: t('register.validate_pwd') }}  >
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
            <Form.Item wrapperCol={{ offset: 10 }} style={{marginTop:'5rem'}}>
                <Button style={{width:'8rem'}}  loading={resetloading} type="primary" htmlType="submit">
                    {t('admin.student.savebtn')}
                </Button>
                <Button htmlType="button" onClick={() => { form.resetFields() }} style={{ margin: '0 2rem', width: '8rem' }} >
                    {t('admin.student.cancelbtn')}
                </Button>
            </Form.Item>
        </Form>
    )
}