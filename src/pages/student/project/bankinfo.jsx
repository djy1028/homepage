import { Button, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { openNotificationWithIcon } from 'components/com-notify';
import { emptyPattern } from 'utils/pattern';
import { useTranslation } from 'react-i18next';
import { useStuAddbank, useStuBankInfo, useStuEditbank } from 'utils/student';

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
        const operate = data.rows && data.rows.length>0?edit:add
        operate({ ...fieldsValue, studentBankId: data.bank.studentBankId }).then(res => {
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
        if (data && data.rows) {
            data.rows.length > 0 && form.setFieldsValue(data.rows[0])
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
            <Form.Item name="field2" label={t('admin.firsttrial.bankinfodes.1')} rules={[{ required: true, pattern: /^[1]([3-9])[0-9]{9}$/, max: 20, message: t('admin.account.phone_validmessage') }]}>
                <Input allowClear />
            </Form.Item>
            <Form.Item name="field3" label={t('admin.firsttrial.bankinfodes.2')} rules={[{
                required: true, validator(_, value) {
                    return !value ? Promise.reject(t('tutor.input_bank')) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : value.length > 100 ? Promise.reject(t('tutor.length_limit')) : Promise.resolve()
                }
            }]}>
                <Input allowClear placeholder={t('tutor.bank')} />
            </Form.Item>
            <Form.Item name="field4" label={t('admin.firsttrial.bankinfodes.3')} rules={[{ required: true, pattern: /^([0-9]{12})$/g, type: 'string', max: 12, message: t('tutor.banknum_mes') }]}>
                <Input allowClear placeholder={t('tutor.bankNumber')} />
            </Form.Item>
            <Form.Item name="field5" label={t('admin.firsttrial.bankinfodes.4')} rules={[{ required: true, pattern: /^([0-9]{1})(\d{14}|\d{17})[^\s]$/g, type: 'string', max: 100, message: t('tutor.banknum_valid') }]}>
                <Input allowClear placeholder={t('tutor.cardNumber')} />
            </Form.Item>
            <Form.Item name="field6" label={t('admin.firsttrial.bankinfodes.5')} rules={[{ required: true, type: 'string', max: 50, pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: t('admin.firsttrial.card_validmessage') }]}>
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


