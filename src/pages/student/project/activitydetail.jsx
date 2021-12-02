import styled from '@emotion/styled';
import { DatePicker, Form, Input, Radio, Spin } from 'antd'
import React, { useEffect } from 'react'
import { useDetialCfg } from './detailconfig'
import { useForm } from 'antd/lib/form/Form'
import moment from 'moment'
import { CommonSelect } from 'components/com-select';
import { emptyPattern } from 'utils/pattern';
import { useTranslation } from 'react-i18next';
import { useStuProgramModal } from 'utils/project';

export const Detail = () => {
    const [form] = useForm()
    const { t } = useTranslation()
    const { activityInfo, activityLoading,inquiryActivityId } = useStuProgramModal()
    const { formarea, formbonus, formaqfield, timeObj, aqvalue, formbonuesrole1, formbonuesrole2 } = useDetialCfg()
    const disabled = inquiryActivityId ? true : false
    const layout = {
        labelCol: {
            // xs: { flex: 'wrap', span: 8},
            sm: { flex: 'wrap', span: 12 },
            md: { flex: 'wrap',span: 10 },
            lg: { flex: 'wrap', span: 10 },
            xl: { flex: 'wrap', span: 6 },
        },
        wrapperCol: {
            // xs: { span: 24 },
            sm: { span: 12 },
            md: { span: 12 },
            lg: { span: 12 },
            xl: { span: 14 },
        },
    };
    const initialValues = {
        ...aqvalue,
        ...timeObj
    }

    useEffect(() => {
        if (activityInfo) {
            const editfields = activityInfo
            Object.keys(editfields).forEach(item => {
                if (item.includes('Time')) {
                    editfields[item] = editfields[item] ? moment(editfields[item]) : editfields[item]
                }
            })
            form.setFieldsValue(editfields)
        }
    }, [activityInfo, form])
    return (
        activityLoading ? <Spin>loading</Spin> :
            <Form form={form} {...layout} scrollToFirstError={true} name="activity_detail" initialValues={initialValues} >
                <Form.Item name="activityName" label={t('admin.activity.colums_title.1')} rules={[{
                    required: true, validator(_, value) {
                        return !value ? Promise.reject(t('admin.activity.input_activityName')) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : Promise.resolve()
                    }, type: 'string', max: 100
                }]}>
                    <Input placeholder={t('admin.activity.name_placeholder')} disabled={disabled} allowClear />
                </Form.Item>
                <Form.Item name="activityPage" label={t('admin.activity.colums_title.2')} rules={[{
                    required: true, validator(_, value) {
                        return !value ? Promise.reject(t('admin.activity.input_activityPage')) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : Promise.resolve()
                    }, type: 'string', max: 100
                }]}>
                    <Input placeholder={t('admin.activity.page_placeholder')} disabled={disabled} allowClear />
                </Form.Item>
                {
                    formarea.map(
                        (item, index) => <Form.Item extra={item.message} key={item.name} name={item.name} label={item.label} rules={[{
                            required: item.require, validator(_, value) {
                                if (item.require) {
                                    return !value ? Promise.reject(item.err_message) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : Promise.resolve()
                                }
                                return Promise.resolve()
                            }
                        }]}>
                            {index <= 6 ? <Input.TextArea disabled={disabled} autoSize={{ minRows: 2 }} allowClear showCount maxLength={500} /> : <DatePicker showTime style={{ width: '100%' }} disabled={disabled} />}
                        </Form.Item>
                    )
                }
                {
                    formbonus.map(
                        (field, index) => <FieldSet key={field.title + index}>
                            <Legend>{index <= 2 ? field.title + (index + 1) : field.title}</Legend>
                            {
                                field.fielditems.map(
                                    (item, idx) =>
                                        <Form.Item key={item.name} extra={item.message} name={index <= 2 ? item.name + (index + 1) : item.name} label={item.label} rules={[{ ...item.required }]}>
                                            {idx === 0 ? <CommonSelect disabled={disabled} width={'100%'} value={"高"} options={t('admin.activity.activity_dif', { returnObjects: true })} /> : <Input allowClear disabled={disabled} />}
                                        </Form.Item>)
                            }
                        </FieldSet>
                    )
                }
                <FieldSet>
                    <Legend>{formbonuesrole1.title}</Legend>
                    <Form.Item extra={t('admin.activity.bonusrole_unit')} name={'bonusPayStudentDuring1'} label={t('admin.activity.bonusmid')} rules={[
                        {
                            required: false, type: 'number', min: 0, max: 100, transform(value) { if (value) { return Number(value) } }
                        }
                    ]}>
                        <Input allowClear disabled={disabled} />
                    </Form.Item>
                    <Form.Item dependencies={['bonusPayStudentDuring1']} extra={t('admin.activity.bonusrole_unit')} name={'bonusPayStudentEnding1'} label={t('admin.activity.bonusend')} rules={[{ required: false, type: 'number', min: 0, max: 100, transform(value: string) { if (value) { return Number(value) } } },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if ((!Number(value) && !Number(getFieldValue('bonusPayStudentDuring1'))) || Number(getFieldValue('bonusPayStudentDuring1')) + Number(value) <= 100) {
                                return Promise.resolve();
                            }
                            else {
                                return Promise.reject(new Error(t('admin.activity.addplus')));
                            }
                        }
                    })]}>
                        <Input allowClear disabled={disabled} />
                    </Form.Item>
                </FieldSet>
                <FieldSet>
                    <Legend>{formbonuesrole2.title}</Legend>
                    <Form.Item extra={t('admin.activity.bonusrole_unit')} name={'bonusPayTeacherDuring2'} label={t('admin.activity.bonusmid')} rules={[
                        { required: false, type: 'number', min: 0, max: 100, transform(value) { if (value) { return Number(value) } } },

                    ]}>
                        <Input allowClear disabled={disabled} />
                    </Form.Item>
                    <Form.Item dependencies={['bonusPayTeacherDuring2']} extra={t('admin.activity.bonusrole_unit')} name={'bonusPayTeacherEnding2'} label={t('admin.activity.bonusend')} rules={[{ type: 'number', min: 0, max: 100, transform(value) { if (value) { return Number(value) } } },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if ((!Number(value) && !Number(getFieldValue('bonusPayTeacherDuring2'))) || Number(getFieldValue('bonusPayTeacherDuring2')) == NaN && Number(value) == NaN) {
                                return Promise.resolve();
                            }
                            else {
                                if (Number(getFieldValue('bonusPayTeacherDuring2')) + Number(value) <= 100) {
                                    return Promise.resolve();
                                }
                                else {
                                    return Promise.reject(new Error(t('admin.activity.addplus')));
                                }
                            }
                        }
                    })]}>
                        <Input allowClear disabled={disabled} />
                    </Form.Item>
                </FieldSet>
                <FieldSet>
                    <Legend>{formaqfield.title}</Legend>
                    {
                        formaqfield.fielditems.map(
                            item => <Form.Item key={item.inputname + item.radioname} labelCol={{ span: 6 }} wrapperCol={{ span: 18, offset: 4 }}>
                                <Form.Item colon={true} key={item.inputname} name={item.inputname} label={item.inputlabel} rules={[{ required: item.require }]}>
                                    <Input.TextArea autoSize disabled bordered={false} />
                                </Form.Item>
                                <Form.Item key={item.radioname} name={item.radioname} label={item.radiolabel} rules={[{ required: item.require }]} wrapperCol={{ offset: 4 }} >
                                    <Radio.Group disabled={disabled} >
                                        <Radio value={1}>{t('admin.activity.modal_radio1')}</Radio>
                                        <Radio value={0}>{t('admin.activity.modal_radio2')}</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Form.Item>
                        )
                    }
                </FieldSet>
            </Form>
    )
}

const FieldSet = styled.fieldset`
    margin:2rem 0;
    padding: 1rem 0;
    width: 92%;
    position: relative;
    left: 4%;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
`

const Legend = styled.legend`
    padding: .5em !important;
    border: 0 !important;
    margin-bottom: 0px;
    color: #2E9AFE !important;

`

