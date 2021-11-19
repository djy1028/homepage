import React from 'react'
import { useAuth } from 'context/auth-context'
import { Form,Input, Radio } from 'antd'
import {LongButton} from './index'
import { useAsync } from 'utils/use-async'
import {FormItem} from 'components/form_item'
import { openNotificationWithIcon } from 'components/com-notify'
import { pwdPattern } from 'utils/pattern'
export const RegisterScreen =({onError,setRegister}:{onError:(error:Error)=>void,setRegister:React.Dispatch<React.SetStateAction<boolean>>}) =>{
    const {register,t} = useAuth()
    const {run,isLoading} = useAsync(undefined,{throwNewError:true})
    const handleSubmit = async ({cpassword,...values}:{username:string,password:string,cpassword:string,type:string})=>{

        try{
            const res = await run(register(values))
            setRegister(true)
            res.code === 200?openNotificationWithIcon(0,res.message):openNotificationWithIcon(1,res.message)

        }
        catch(e){
            onError(new Error(e.message))
        }
    }

    return <Form onFinish={handleSubmit}  initialValues={{'type': 'stu'}} >
                <FormItem name={'username'} ruleMessage={t('register.email_message')} emailRule={{type:'email',message: t('register.email_validmessage')}}>
                    <Input type={'text'} allowClear placeholder={t('register.email_placeholder')} />
                </FormItem>
                <FormItem name={'password'}  ruleMessage={t('login.password_message')} passwordRule={{ pattern: pwdPattern , message: t('register.validate_pwd') }}  >
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
                            }),
                            ]}>
                    <Input.Password allowClear placeholder={t('register.cpassword_placeholder')} />
                </Form.Item>
                <FormItem name={'type'}>
                    <Radio.Group>
                        <Radio value={'stu'}>{t('register.type.0')}</Radio>
                        <Radio value={'org'}>{t('register.type.1')}</Radio>
                    </Radio.Group>
                </FormItem>
            <LongButton loading={isLoading} htmlType={'submit'} type={'primary'} >{t('register.register_btn')}</LongButton>
        </Form>
}