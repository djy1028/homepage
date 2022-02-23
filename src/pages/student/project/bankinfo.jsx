import { Button, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { openNotificationWithIcon } from 'components/com-notify';
import { emptyPattern } from 'utils/pattern';
import { useTranslation } from 'react-i18next';
import { useStuAddbank, useStuBankInfo, useStuEditbank } from 'utils/student';
import { aesEncrypt, raesDecrypt } from 'utils';

export const Bankinfo = (props) => {
    const { studentId,close } = props
    const [form] = useForm()
    const { t, i18n } = useTranslation()
    const { data } = useStuBankInfo(studentId)
    const layout = {
        labelCol: { span: i18n.language === 'zh' ? 5 : 8 },
        wrapperCol: { span: 16 },
    };
    const { mutateAsync: edit, isLoading: editLoading } = useStuEditbank(studentId)
    const { mutateAsync: add, isLoading: addLoading } = useStuAddbank(studentId)
    const onFinish = (fieldsValue) => {
        fieldsValue.field1 = aesEncrypt(fieldsValue.field1)
        fieldsValue.field2 = aesEncrypt(fieldsValue.field2)
        fieldsValue.field5 = aesEncrypt(fieldsValue.field5)
        fieldsValue.field6 = aesEncrypt(fieldsValue.field6)
        fieldsValue.field8 = aesEncrypt(fieldsValue.field8)
        const operate = data.rows && data.rows.length > 0 ? edit : add
        const params = data.rows && data.rows.length > 0 ? { ...fieldsValue, bankId: data.bank.bankId } : {...fieldsValue}
        operate(params).then(res => {
            if (res.code === 200) {
                openNotificationWithIcon(0, res.message)
                form.resetFields()
                close()
            }
            else {
                openNotificationWithIcon(1, res.message)
            }
        }).catch(err => openNotificationWithIcon(1, err.message))
    }
    useEffect(() => {
        if (data && data.rows && data.rows.length > 0) {
            let tempbank = { ...(data.rows[0]) }
            tempbank.field1 = raesDecrypt(tempbank.field1)
            tempbank.field2 = raesDecrypt(tempbank.field2)
            tempbank.field5 = raesDecrypt(tempbank.field5)
            tempbank.field6 = raesDecrypt(tempbank.field6)
            tempbank.field8 = raesDecrypt(tempbank.field8)
            form.setFieldsValue(tempbank)
        }
    }, [data, form])

    return (
        <Form scrollToFirstError={true} form={form} {...layout} onFinish={onFinish} name="bankinfo_detail" >
            <h3 style={{position:'relative',left:'38%'}}><strong>{t('tutor.bank_title')}</strong></h3>
            <p style={{ position: 'relative', left: '20%' }}>{t('tutor.bank_subtl1')}{t('tutor.bank_sbutl2')}</p>
            <Form.Item name="field1" label={t('admin.firsttrial.bankinfodes.0')} rules={[{
                required: true, validator(_, value) {
                    return !value ? Promise.reject(t('tutor.input_receiver')) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : value.length > 100 ? Promise.reject(t('tutor.length_limit')) : Promise.resolve()
                }
            }]}>
                <Input placeholder={t('tutor.concat')} allowClear />
            </Form.Item>
            <Form.Item name="field2" label={t('admin.firsttrial.bankinfodes.1')} rules={[{ required: true, max: 20, message: t('admin.account.phone_validmessage') }]}>
                <Input allowClear />
            </Form.Item>
            <Form.Item name="field3" label={t('admin.firsttrial.bankinfodes.2')} rules={[{
                required: true, validator(_, value) {
                    return !value ? Promise.reject(t('tutor.input_bank')) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : value.length > 100 ? Promise.reject(t('tutor.length_limit')) : Promise.resolve()
                }
            }]}>
                <Input allowClear placeholder={t('tutor.bank')} />
            </Form.Item>
            <Form.Item name="field4" label={t('admin.firsttrial.bankinfodes.3')} rules={[{ required: true, type: 'string' }]}>
                <Input allowClear placeholder={t('tutor.bankNumber')} />
            </Form.Item>
            <Form.Item name="field5" label={t('admin.firsttrial.bankinfodes.4')} rules={[{ required: true, type: 'string', max: 100, message: t('tutor.banknum_valid') }]}>
                <Input allowClear placeholder={t('tutor.cardNumber')} />
            </Form.Item>
            <Form.Item name="field6" label={t('admin.firsttrial.bankinfodes.5')} rules={[{ required: true, type: 'string', max: 50, message: t('admin.firsttrial.card_validmessage') }]}>
                <Input allowClear />
            </Form.Item>

            <Form.Item name="field7" label={t('tutor.addressee')} rules={[{
                required: true, validator(_, value) {
                    return !value ? Promise.reject(t('tutor.input_certrecer')) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : value.length > 100 ? Promise.reject(t('tutor.length_limit')) : Promise.resolve()
                }
            }]}>
                <Input.TextArea placeholder={t('tutor.addressmes')} autoSize allowClear />
            </Form.Item>
            <Form.Item name="field8" label={t('tutor.address')} rules={[{
                required: true, validator(_, value) {
                    return !value ? Promise.reject(t('tutor.input_certaddr')) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : value.length > 200 ? Promise.reject(t('tutor.length_limit2')) : Promise.resolve()
                }, type: 'string', max: 100
            }]}>
                <Input.TextArea placeholder={t('tutor.addressmes')} autoSize allowClear />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10 }}>
                <Button loading={editLoading||addLoading} type="primary" htmlType="submit">
                    {t('admin.student.savebtn')}
                </Button>
                <Button htmlType="button" onClick={close} style={{ margin: '0 2rem' }} >
                    {t('admin.student.cancelbtn')}
                </Button>
            </Form.Item>
        </Form>
    )
}


