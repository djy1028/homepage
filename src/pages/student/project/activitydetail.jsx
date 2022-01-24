import styled from '@emotion/styled';
import { DatePicker, Form, Input, Radio, Spin, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDetialCfg } from './detailconfig'
import { useForm } from 'antd/lib/form/Form'
import moment from 'moment'
import { emptyPattern, numberplus } from 'utils/pattern';
import { useTranslation } from 'react-i18next';
import { useStuProgramModal } from 'utils/project';
export const Detail = () => {

    const [form] = useForm()
    const { t } = useTranslation()
    const [needMidApprove, setNeedMidApprove] = useState("0")
    const { activityInfo, activityLoading } = useStuProgramModal()
    const { formarea, timeObj, aqvalue, formbonuesrole1, formbonuesrole2, formlimit } = useDetialCfg()
    const layout = {
        labelCol: { flex: 'wrap', span: 6 },
        wrapperCol: { span: 14 },
    };
    const initialValues = {
        ...aqvalue,
        ...timeObj
    }

    useEffect(() => {
        console.log(activityInfo)
        if (activityInfo) {
            const editfields = activityInfo
            Object.keys(editfields).forEach(item => {
                if (item.includes('Time')) {
                    editfields[item] = editfields[item] ? moment(editfields[item]) : editfields[item]
                }
            })
            editfields.whitelist = editfields.whitelist || []
            editfields.needSummerMiddleApprove = editfields.summerMiddleApprovePublicTime ? "1" : "0"
            if (editfields.needSummerMiddleApprove === "1") {
                editfields.bonusPayStudentDuring1 = editfields.bonusPay && Number(editfields.bonusPay[0])
                editfields.bonusPayStudentEnding1 = editfields.bonusPay && Number(editfields.bonusPay[1])
                editfields.bonusPayTeacherDuring2 = editfields.bonusPay && Number(editfields.bonusPay[2])
                editfields.bonusPayTeacherEnding2 = editfields.bonusPay && Number(editfields.bonusPay[3])
            } else {
                editfields.bonusPayStudentEnding = editfields.bonusPay && Number(editfields.bonusPay[0])
                editfields.bonusPayTeacherEnding = editfields.bonusPay && Number(editfields.bonusPay[1])
            }
            setNeedMidApprove(editfields.needSummerMiddleApprove)
            const diff1 = editfields.bonusSet && editfields.bonusSet.shift()
            editfields.bonusdiff1 = diff1?.diff
            editfields.bonusstu1 = diff1?.stu
            editfields.bonusteach1 = diff1?.tutor
            form.setFieldsValue(editfields)
        }
    }, [activityInfo, form])

    return (
        activityLoading ? <Spin>loading</Spin> :
            <Form form={form} {...layout} scrollToFirstError={true} name="activity_detail" initialValues={{ ...initialValues, needSummerMiddleApprove: "0", maxProgramNumOrg: 3, maxProgramNumTeacher: 3, bonusPayStudentEnding: 100, bonusPayTeacherEnding: 100 }} >
                <Form.Item name="activityName" label={t('admin.activity.colums_title.1')} rules={[{
                    required: true, validator(_, value) {
                        return !value ? Promise.reject(t('admin.activity.input_activityName')) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : Promise.resolve()
                    }, type: 'string', max: 100
                }]}>
                    <Input placeholder={t('admin.activity.name_placeholder')} disabled allowClear />
                </Form.Item>
                <Form.Item name="activityPage" label={t('admin.activity.colums_title.2')} rules={[{
                    required: true, validator(_, value) {
                        return !value ? Promise.reject(t('admin.activity.input_activityPage')) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : Promise.resolve()
                    }, type: 'string', max: 100
                }]}>
                    <Input placeholder={t('admin.activity.page_placeholder')} disabled allowClear />
                </Form.Item>
                {
                    formarea && formarea.map(
                        (item, index) => item.name === 'summerMiddleApprovePublicTime' && needMidApprove === "0" ? null : <Form.Item extra={item.message} key={item.name} name={item.name} label={item.label} rules={[{
                            required: item.require, validator(_, value) {
                                if (item.require) {
                                    return !value ? Promise.reject(item.err_message) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : Promise.resolve()
                                }
                                return Promise.resolve()

                            }
                        }]}>
                            {index <= 6 ? <Input.TextArea disabled autoSize={{ minRows: 2 }} allowClear showCount maxLength={500} /> :
                                item.name === 'needSummerMiddleApprove' ? <Radio.Group onChange={(e) => setNeedMidApprove(e.target.value)}>
                                    {t('admin.activity.summerMiddleRadio', { returnObjects: true }).map((item, index) =>
                                        <Radio disabled key={item.value} value={item.value}>
                                            {item.name}
                                        </Radio>
                                    )}
                                </Radio.Group> : <DatePicker showTime style={{ width: '100%' }} disabled />}
                        </Form.Item>
                    )
                }
                {
                    formlimit.map(
                        (item, index) => <Form.Item key={item.name} name={item.name}
                            label={<div>{t(index === 0 ? 'admin.activity.orglimit.0' : 'admin.activity.tutorlimit.0')}<span style={{ color: 'red' }}>{t(index === 0 ? 'admin.activity.orglimit.1' : 'admin.activity.tutorlimit.1')}</span>{t(index === 0 ? 'admin.activity.orglimit.2' : 'admin.activity.tutorlimit.2')}</div>} rules={[{
                                required: true, validator(_, value) {

                                    return !value ? Promise.reject(item.err_message) : !numberplus.test(String(value)) ? Promise.reject(t('admin.activity.numplus')) : Promise.resolve()
                                }
                            }]} >
                            <InputNumber style={{ width: '100%' }} disabled min={1} max={999} />
                        </Form.Item>
                    )
                }
                <FieldSet key={t('admin.activity.setbonus')} >
                    <Legend>{t('admin.activity.setbonus')}</Legend>
                    <div style={{ position: 'relative', width: '90%', left: '5%' }}>
                        <Gratitle>{t('admin.activity.gradient') + 1}</Gratitle>
                        <Form.Item label={t('admin.activity.bonusdiff')} name={'bonusdiff1'} rules={[{ required: true }]}>
                            <Input disabled />
                        </Form.Item>

                        <Form.Item label={t('admin.activity.bonusstu')} name={'bonusstu1'} rules={[{ required: true }]}>
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label={t('admin.activity.bonusteach')} name={'bonusteach1'} rules={[{ required: true }]}>
                            <Input disabled />
                        </Form.Item>
                    </div>
                    <Form.List name="bonusSet">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <div key={field.key + 'bonus'} style={{
                                        position: 'relative', padding: '2rem 0', width: '90%', left: '5%', marginTop: '2rem',
                                        borderRadius: '1rem', boxShadow: '0 0 5px 0 rgb(0 0 0 / 10%)'
                                    }}>
                                        
                                        <Gratitle>{t('admin.activity.gradient') + (index + 2)}</Gratitle>
                                        <Form.Item label={t('admin.activity.bonusdiff')} name={[field.name, 'diff']} rules={[{ required: true }]}>
                                            <Input disabled />
                                        </Form.Item>

                                        <Form.Item label={t('admin.activity.bonusstu')} name={[field.name, 'stu']} rules={[{ required: true }]}>
                                            <Input disabled />
                                        </Form.Item>
                                        <Form.Item label={t('admin.activity.bonusteach')} name={[field.name, 'tutor']} rules={[{ required: true }]}>
                                            <Input disabled />
                                        </Form.Item>
                                    </div>
                                ))}
                            </>
                        )}
                    </Form.List>
                </FieldSet>

                <FieldSet>
                    <Legend>{formbonuesrole1.title}</Legend>
                    {needMidApprove === "1" && <Form.Item extra={t('admin.activity.bonusrole_unit')} name={'bonusPayStudentDuring1'} label={t('admin.activity.bonusmid')} rules={[
                        {
                            required: false, type: 'number', min: 0, max: 100, transform(value) { if (value) { return Number(value) } }
                        }
                    ]}>
                        <Input allowClear disabled/>
                    </Form.Item>}
                    {
                        needMidApprove === "1" ?
                            <Form.Item dependencies={['bonusPayStudentDuring1']} extra={t('admin.activity.bonusrole_unit')} name={'bonusPayStudentEnding1'} label={t('admin.activity.bonusend')} rules={[{ required: false, type: 'number', min: 0, max: 100, transform(value) { if (value) { return Number(value) } } },
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
                                <Input allowClear disabled/>
                            </Form.Item> :
                            <Form.Item extra={t('admin.activity.bonusrole_unit')} name={'bonusPayStudentEnding'} label={t('admin.activity.bonusend')} rules={[{ required: false, type: 'number', min: 0, max: 100 }]}>
                                <Input readOnly disabled/>
                            </Form.Item>
                    }
                </FieldSet>
                <FieldSet>
                    <Legend>{formbonuesrole2.title}</Legend>
                    {needMidApprove === "1" && <Form.Item extra={t('admin.activity.bonusrole_unit')} name={'bonusPayTeacherDuring2'} label={t('admin.activity.bonusmid')} rules={[
                        { required: false, type: 'number', min: 0, max: 100, transform(value) { if (value) { return Number(value) } } },
                    ]}>
                        <Input allowClear disabled />
                    </Form.Item>}
                    {needMidApprove === "1" ?
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
                            <Input allowClear disabled />
                        </Form.Item> :
                        <Form.Item extra={t('admin.activity.bonusrole_unit')} name={'bonusPayTeacherEnding'} label={t('admin.activity.bonusend')} rules={[{ type: 'number', min: 0, max: 100 }]}>
                            <Input readOnly disabled />
                        </Form.Item>
                    }
                </FieldSet>
                <FieldSet>
                    <Legend>{t('admin.activity.questionset')}</Legend>
                    <Form.List name="questions">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <div key={field.key + 'question'} style={{
                                        position: 'relative', padding: '2rem 0', width: '90%', left: '5%', marginTop: '2rem',
                                        borderRadius: '1rem', boxShadow: '0 0 5px 0 rgb(0 0 0 / 10%)'
                                    }}>
                               
                                        <Form.Item {...field} label={t(`admin.activity.question`) + (index + 1)} name={[field.name, 'qst']} rules={[{ required: true }]}>
                                            <Input.TextArea maxLength={200} disabled />
                                        </Form.Item>

                                        <Form.Item name={[field.name, 'ans']} label={''} wrapperCol={{ offset: 6 }} rules={[{ required: true, message: t('admin.activity.qsmust') }]} >
                                            <Radio.Group disabled >
                                                <Radio value={"1"}>{t('admin.activity.modal_radio1')}</Radio>
                                                <Radio value={"0"}>{t('admin.activity.modal_radio2')}</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </div>
                                ))}
                            </>
                        )}
                    </Form.List>
                </FieldSet>
            </Form >
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
const Gratitle = styled.h3`
    color: #2E9AFE !important;
    margin: 1rem 0;
    position: relative;
    left:50%;
    width:6rem;
`



