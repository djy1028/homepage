import styled from '@emotion/styled';
import { DatePicker, Form, Input, Radio, Spin, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDetialCfg } from './detailconfig'
import { useForm } from 'antd/lib/form/Form'
import moment from 'moment'
import { emptyPattern, numberplus } from 'utils/pattern';
import { CommonInputNum } from 'components/com-input';
import { useTranslation } from 'react-i18next';
import { useStuProgramModal } from 'utils/project';
export const Detail = () => {

    const [form] = useForm()
    const { t, i18n} = useTranslation()
    const [needMidApprove, setNeedMidApprove] = useState("0")
    const [Lang, setLang] = useState(1)
    const [needMid, setNeedMid] = useState("0")
    const { activityInfo, activityLoading } = useStuProgramModal()
    const { formarea, formareamix, formbonuesrole1, formbonuesrole2, formlimit, formTime } = useDetialCfg()
    const layout = {
        labelCol: { flex: 'wrap', span: 6 },
        wrapperCol: { span: 14 },
    };

    useEffect(() => {
        if (activityInfo) {
            const editfields = activityInfo
            Object.keys(editfields).forEach(item => {
                if (item.includes('Time')) {
                    editfields[item] = editfields[item] ? moment(editfields[item]) : editfields[item]
                }
            })

            editfields.needSummerMiddleApprove = editfields.summerMiddleApprovePublicTime ? "1" : "0"
            editfields.needMiddleApprove = editfields.studentMiddleCommitTime ? "1" : "0"
            if (editfields.needSummerMiddleApprove === "1" && editfields.needMiddleApprove === "1") {
                editfields.bonusPayStudentDuring1 = editfields.bonusPay && Number(editfields.bonusPay[0])
                editfields.bonusPayStudentEnding1 = editfields.bonusPay && Number(editfields.bonusPay[1])
                editfields.bonusPayTeacherDuring2 = editfields.bonusPay && Number(editfields.bonusPay[2])
                editfields.bonusPayTeacherEnding2 = editfields.bonusPay && Number(editfields.bonusPay[3])
            } else {
                editfields.bonusPayStudentEnding = editfields.bonusPay && Number(editfields.bonusPay[0])
                editfields.bonusPayTeacherEnding = editfields.bonusPay && Number(editfields.bonusPay[1])
            }
            setNeedMidApprove(editfields.needSummerMiddleApprove)
            setNeedMid(editfields.needMiddleApprove)
            const diff1 = editfields.bonusSet && editfields.bonusSet.shift()
            editfields.bonusdiff1 = diff1?.diff
            editfields.bonusdiff1_en = diff1?.diffEN
            editfields.bonusstu1 = diff1?.stu
            editfields.bonusteach1 = diff1?.tutor
            form.setFieldsValue(editfields)
            setLang(activityInfo.language)
        }
    }, [activityInfo, form])
    console.log(i18n.language)
    return (
        activityLoading ? <Spin>loading</Spin> :
            <Form form={form} {...layout} scrollToFirstError={true} name="activity_detail" >
                {/* <Form.Item name="language" label={t(Lang === 1 ? 'admin.activity.activelang' : Lang === 2 ? 'admin.activity.activelang_en' : !disabled ? 'admin.activity.activelang_mix' : i18n.language === 'zh' ? 'admin.activity.activelang' : 'admin.activity.activelang_en')} rules={[{ required: true }]}>
                    <Radio.Group disabled={disabled} onChange={(e => setLang(e.target.value))}>
                        <Space direction='vertical'>{t(Lang === 1 ? 'admin.activity.supportlang' : Lang === 2 ? 'admin.activity.supportlang_en' : 'admin.activity.supportlang_mix', { returnObjects: true }).map(
                            (item, index) => <Radio key={item + index} value={index}>{item}</Radio>
                        )}
                        </Space>
                    </Radio.Group>
                </Form.Item> */}
                {Lang === 0 && i18n.language === 'en' ? null : <Form.Item name="activityName" label={t(Lang === 1 || Lang === 0 ? 'admin.activity.colums_title.1' : 'admin.activity.colums_title_en.1')} rules={[{
                    required: true, whitespace: true, type: 'string', max: 1000
                }]}>
                    <Input placeholder={t(Lang === 1 || Lang === 0 ? 'admin.activity.name_placeholder' : 'admin.activity.name_placeholder_en')} disabled />
                </Form.Item>}
                {
                    ((Lang === 0 && i18n.language === 'en')) && <Form.Item name="activityNameEN" label={t('admin.activity.colums_title_en.1')} rules={[{
                        required: true, whitespace: true, type: 'string', max: 1000
                    }]}>
                        <Input placeholder={t('admin.activity.name_placeholder_en')} disabled />
                    </Form.Item>
                }
                <Form.Item name="activityPage" label={t(Lang === 0 ? i18n.language === 'zh' ? 'admin.activity.colums_title.2' : 'admin.activity.colums_title_en.2' : Lang === 1 ? 'admin.activity.colums_title.2' : 'admin.activity.colums_title_en.2')} rules={[{
                    required: true, whitespace: true, type: 'string', max: 1000
                }]}>
                    <Input placeholder={t(Lang === 1 || Lang === 0 ? 'admin.activity.page_placeholder' : 'admin.activity.page_placeholder_en')} disabled />
                </Form.Item>
                {
                    (Lang === 1 || Lang === 2) && formarea.map(
                        (item, index) => <Form.Item extra={Lang === 1 ? item.message : item.message_en} key={item.name} name={item.name} label={Lang === 1 ? item.label : item.label_en} rules={[{
                            required: item.require
                        }]}>
                            <Input.TextArea disabled autoSize={{ minRows: 2 }} showCount maxLength={1000} />
                        </Form.Item>
                    )
                }
                {
                    (Lang === 0) && formareamix.map(
                        (item, index) => (
                                i18n.language === 'zh' ?
                                    (!(index % 2)) && <Form.Item extra={item.message} key={item.name} name={item.name} label={item.label} rules={[{
                                        required: item.require
                                    }]}>
                                        <Input.TextArea disabled autoSize={{ minRows: 2 }} showCount maxLength={1000} />
                                    </Form.Item>
                                    :
                                    (index % 2!==0) && <Form.Item extra={item.message} key={item.name} name={item.name} label={item.label} rules={[{
                                        required: item.require
                                    }]}>
                                        <Input.TextArea disabled autoSize={{ minRows: 2 }}  showCount maxLength={1000} />
                                    </Form.Item>
                        )
                    )
                }
                <Form.Item wrapperCol={{ offset: 4 }}>
                    {Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.time_note') : t('admin.activity.time_note_en') : Lang === 1 ? t('admin.activity.time_note') : t('admin.activity.time_note_en')}
                </Form.Item>

                {
                    formTime.map(
                        (item, index) => item.name === 'summerMiddleApprovePublicTime' && needMidApprove === "0" ? null :
                            (item.name === 'studentMiddleCommitTime' || item.name === 'teacherMiddleApproveExpiredTime' || item.name === 'needSummerMiddleApprove' || item.name === 'summerMiddleApprovePublicTime') && needMid === "0" ? null :
                                <Form.Item key={item.name} name={item.name}
                                    label={Lang === 0 ? (i18n.language === 'zh' ? item.label : item.label_en) : Lang === 1 ? item.label : item.label_en} rules={[{
                                        required: item.require
                                    }]}>
                                    {item.name === 'needSummerMiddleApprove' ? <Radio.Group>
                                        {t(Lang === 0 ? (i18n.language === 'zh' ? 'admin.activity.summerMiddleRadio' : 'admin.activity.summerMiddleRadio_en') : Lang === 1 ? 'admin.activity.summerMiddleRadio' : 'admin.activity.summerMiddleRadio_en', { returnObjects: true }).map((item, index) =>
                                            <Radio disabled key={item.value} value={item.value}>
                                                {item.name}
                                            </Radio>
                                        )}
                                    </Radio.Group> :
                                        item.name === 'needMiddleApprove' ? <Radio.Group>
                                            {t(Lang === 0 ? (i18n.language === 'zh' ? 'admin.activity.summerMiddleRadio' : 'admin.activity.summerMiddleRadio_en') : Lang === 1 ? 'admin.activity.summerMiddleRadio' : 'admin.activity.summerMiddleRadio_en', { returnObjects: true }).map((item, index) =>
                                                <Radio disabled key={item.value} value={item.value}>
                                                    {item.name}
                                                </Radio>
                                            )}
                                        </Radio.Group> :
                                            <DatePicker showTime style={{ width: '100%' }} disabled />}
                                </Form.Item>
                    )
                }
                {
                    formlimit.map(
                        (item, index) => <Form.Item key={item.name} name={item.name}
                            label={
                                <Lines>
                                    {(Lang === 1 || (Lang === 0 && i18n.language === 'zh')) ?
                                        <>
                                            {t(index === 0 ? 'admin.activity.orglimit.0' : 'admin.activity.tutorlimit.0')}
                                            <span style={{ color: 'red' }}>{t(index === 0 ? 'admin.activity.orglimit.1' : 'admin.activity.tutorlimit.1')}</span>
                                            {t(index === 0 ? 'admin.activity.orglimit.2' : 'admin.activity.tutorlimit.2')}
                                        </> :
                                        <>
                                            {t(index === 0 ? 'admin.activity.orglimit_en.0' : 'admin.activity.tutorlimit_en.0')}
                                            <span style={{ color: 'red' }}>{t(index === 0 ? 'admin.activity.orglimit_en.1' : 'admin.activity.tutorlimit_en.1')}</span>
                                            {t(index === 0 ? 'admin.activity.orglimit_en.2' : 'admin.activity.tutorlimit_en.2')}
                                        </>
                                    }
                                </Lines>
                            }
                            rules={[{
                                required: true
                            }]} >
                            <InputNumber style={{ width: '100%' }} disabled min={1} max={999} />
                        </Form.Item>
                    )
                }
                <FieldSet key={t('admin.activity.setbonus')} >
                    <Legend>{Lang === 0 ? (i18n.language === 'zh' ? t('admin.activity.setbonus') : t('admin.activity.setbonus_en')) : Lang === 1 ? t('admin.activity.setbonus') : t('admin.activity.setbonus_en')}</Legend>
                    <div style={{ position: 'relative', width: '90%', left: '5%' }}>
                        <Gratitle>{(Lang === 0 ? (i18n.language === 'zh' ? t('admin.activity.gradient') : t('admin.activity.gradient_en')) : Lang === 1 ? t('admin.activity.gradient') : t('admin.activity.gradient_en')) + 1}</Gratitle>

                        {Lang === 0 && i18n.language === 'en' ? null : <Form.Item label={t(Lang === 1 || Lang === 0 ? 'admin.activity.bonusdiff' : 'admin.activity.bonusdiff_en')} name={'bonusdiff1'} rules={[{ required: true, type: 'string', whitespace: true }]}>
                            <Input disabled />
                        </Form.Item>}
                        {
                            (Lang === 0 && i18n.language === 'en') && <Form.Item label={t('admin.activity.bonusdiff_en')} name={'bonusdiff1_en'} rules={[{ required: true, type: 'string', whitespace: true }]}>
                                <Input disabled />
                            </Form.Item>
                        }
                        <Form.Item label={Lang === 0 ? (i18n.language === 'zh' ? t('admin.activity.bonusstu') : t('admin.activity.bonusstu_en')) : Lang === 1 ? t('admin.activity.bonusstu') : t('admin.activity.bonusstu_en')} name={'bonusstu1'} rules={[{
                            required: true
                        }]}>
                            <CommonInputNum disabled />
                        </Form.Item>
                        <Form.Item label={Lang === 0 ? (i18n.language === 'zh' ? t('admin.activity.bonusteach') : t('admin.activity.bonusteach_en')) : Lang === 1 ? t('admin.activity.bonusteach') : t('admin.activity.bonusteach_en')} name={'bonusteach1'} rules={[{
                            required: true
                        }]}>
                            <CommonInputNum disabled />
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
                                       
                                        <Gratitle>{(Lang === 0 ? (i18n.language === 'zh' ? t('admin.activity.gradient') : t('admin.activity.gradient_en')) : Lang === 1 ? t('admin.activity.gradient') : t('admin.activity.gradient_en')) + (index + 2)}</Gratitle>
                                        {Lang === 0 && i18n.language === 'en' ? null : <Form.Item label={t(Lang === 1 || Lang === 0 ? 'admin.activity.bonusdiff' : 'admin.activity.bonusdiff_en')} name={[field.name, 'diff']} rules={[{ required: true, type: 'string', whitespace: true, pattern: Lang === 2 ? /^[^\u4e00-\u9fa5]+$/g : undefined, message: Lang === 2 ? t('organization.activity.en_content_mes') : undefined }]}>
                                            <Input disabled />
                                        </Form.Item>}
                                        {
                                            ((Lang === 0 && i18n.language === 'en')) && <Form.Item label={t('admin.activity.bonusdiff_en')} name={[field.name, 'diffEN']} rules={[{ required: true, type: 'string', whitespace: true, pattern: /^[^\u4e00-\u9fa5]+$/g, message: t('organization.activity.en_content_mes') }]}>
                                                <Input disabled />
                                            </Form.Item>
                                        }
                                        <Form.Item label={Lang === 0 ? (i18n.language === 'zh' ? t('admin.activity.bonusstu') : t('admin.activity.bonusstu_en')) : Lang === 1 ? t('admin.activity.bonusstu') : t('admin.activity.bonusstu_en')} name={[field.name, 'stu']}
                                            rules={[{
                                                required: true
                                            }]}>
                                            <CommonInputNum disabled />
                                        </Form.Item>
                                        <Form.Item label={Lang === 0 ? (i18n.language === 'zh' ? t('admin.activity.bonusteach') : t('admin.activity.bonusteach_en')) : Lang === 1 ? t('admin.activity.bonusteach') : t('admin.activity.bonusteach_en')} name={[field.name, 'tutor']}
                                            rules={[{
                                                required: true
                                            }]}>
                                            <CommonInputNum disabled />
                                        </Form.Item>
                                    </div>
                                ))}
                            </>
                        )}
                    </Form.List>
                </FieldSet>
                <FieldSet>
                    <Legend>{Lang === 0 ?i18n.language === 'zh' ? formbonuesrole1.title : formbonuesrole1.title_en : Lang === 1 ? formbonuesrole1.title : formbonuesrole1.title_en}</Legend>
                    {needMid === "1" && needMidApprove === "1" && <Form.Item
                        extra={Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.bonusrole_unit') : t('admin.activity.bonusrole_unit_en') : Lang === 1 ? t('admin.activity.bonusrole_unit') : t('admin.activity.bonusrole_unit_en')}
                        name={'bonusPayStudentDuring1'}
                        label={Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.bonusmid') : t('admin.activity.bonusmid_en') : Lang === 1 ? t('admin.activity.bonusmid') : t('admin.activity.bonusmid_en')} rules={[
                            {
                                required: true, type: 'number', min: 0, max: 100, transform(value) { if (String(value)) { return Number(value) } }
                            }
                        ]}>
                        <Input disabled />
                    </Form.Item>}
                    {
                        needMid === "1" && needMidApprove === "1" ?
                            <Form.Item dependencies={['bonusPayStudentDuring1']}
                                extra={Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.bonusrole_unit') : t('admin.activity.bonusrole_unit_en') : Lang === 1 ? t('admin.activity.bonusrole_unit') : t('admin.activity.bonusrole_unit_en')}
                                name={'bonusPayStudentEnding1'}
                                label={Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.bonusend') : t('admin.activity.bonusend_en') : Lang === 1 ? t('admin.activity.bonusend') : t('admin.activity.bonusend_en')} rules={[{ required: true, type: 'number', min: 0, max: 100, transform(value) { if (String(value)) { return Number(value) } } }]}>
                                <Input disabled />
                            </Form.Item> :
                            <Form.Item extra={Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.bonusrole_unit') : t('admin.activity.bonusrole_unit_en') : Lang === 1 ? t('admin.activity.bonusrole_unit') : t('admin.activity.bonusrole_unit_en')} name={'bonusPayStudentEnding'}
                                label={Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.bonusend') : t('admin.activity.bonusend_en') : Lang === 1 ? t('admin.activity.bonusend') : t('admin.activity.bonusend_en')}
                                rules={[{ required: false, type: 'number', min: 0, max: 100 }]}>
                                <Input disabled />
                            </Form.Item>
                    }
                </FieldSet>
                <FieldSet>
                    <Legend>{Lang === 0 ? i18n.language == 'zh' ? formbonuesrole2.title : formbonuesrole2.title_en : Lang === 1 ? formbonuesrole2.title : formbonuesrole2.title_en}</Legend>
                    {needMid === "1" && needMidApprove === "1" && <Form.Item
                        extra={Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.bonusrole_unit') : t('admin.activity.bonusrole_unit_en') : Lang === 1 ? t('admin.activity.bonusrole_unit') : t('admin.activity.bonusrole_unit_en')}
                        name={'bonusPayTeacherDuring2'}
                        label={Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.bonusmid') : t('admin.activity.bonusmid_en') : Lang === 1 ? t('admin.activity.bonusmid') : t('admin.activity.bonusmid_en')}
                        rules={[
                            { required: true, type: 'number', min: 0, max: 100, transform(value) { if (String(value)) { return Number(value) } } },
                        ]}>
                        <Input disabled />
                    </Form.Item>}
                    {needMid === "1" && needMidApprove === "1" ?
                        <Form.Item dependencies={['bonusPayTeacherDuring2']}
                            extra={Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.bonusrole_unit') : t('admin.activity.bonusrole_unit_en') : Lang === 1 ? t('admin.activity.bonusrole_unit') : t('admin.activity.bonusrole_unit_en')}

                            name={'bonusPayTeacherEnding2'}
                            label={Lang === 0 ?i18n.language === 'zh' ? t('admin.activity.bonusend') : t('admin.activity.bonusend_en') : Lang === 1 ? t('admin.activity.bonusend') : t('admin.activity.bonusend_en')}
                            rules={[{ type: 'number', required: true, min: 0, max: 100, transform(value) { if (String(value)) { return Number(value) } } }]}>
                            <Input  disabled/>
                        </Form.Item> :
                        <Form.Item
                            extra={Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.bonusrole_unit') : t('admin.activity.bonusrole_unit_en') : Lang === 1 ? t('admin.activity.bonusrole_unit') : t('admin.activity.bonusrole_unit_en')}
                            name={'bonusPayTeacherEnding'}
                            label={Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.bonusend') : t('admin.activity.bonusend_en') : Lang === 1 ? t('admin.activity.bonusend') : t('admin.activity.bonusend_en')}
                            rules={[{ type: 'number', min: 0, max: 100 }]}>
                            <Input  disabled />
                        </Form.Item>
                    }
                </FieldSet>
                <FieldSet>
                    <Legend>{Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.questionset') : t('admin.activity.questionset_en') : Lang === 1 ? t('admin.activity.questionset') : t('admin.activity.questionset_en')}</Legend>
                    <Form.List name="questions">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <div key={field.key + 'question'} style={{
                                        position: 'relative', padding: '2rem 0', width: '90%', left: '5%', marginTop: '2rem',
                                        borderRadius: '1rem', boxShadow: '0 0 5px 0 rgb(0 0 0 / 10%)'
                                    }}>
                                        {
                                            (Lang === 0 && i18n.language === 'en')? <Form.Item label={t('admin.activity.question_en') + (index + 1)} name={[field.name, 'qstEN']} rules={[{ required: true, type: 'string', whitespace: true}]}>
                                                <Input.TextArea showCount maxLength={1000} disabled/>
                                            </Form.Item> :
                                                <Form.Item label={t(Lang === 1 || Lang === 0 ? `admin.activity.question` : 'admin.activity.question_en') + (index + 1)} name={[field.name, 'qst']} rules={[{ required: true, type: 'string', whitespace: true}]}>
                                                    <Input.TextArea showCount maxLength={1000} disabled  />
                                                </Form.Item>
                                        }
                                        <Form.Item name={[field.name, 'ans']} label={''} wrapperCol={{ offset: 6 }} rules={[{ required: true, message: Lang === 0 ? t('admin.activity.qsmust_mix') : Lang === 1 ? t('admin.activity.qsmust') : t('admin.activity.qsmust_en') }]} >
                                            <Radio.Group disabled >
                                                <Radio value={"1"}>{Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.modal_radio1') : t('admin.activity.modal_radio1_en') : Lang === 1 ? t('admin.activity.modal_radio1') : t('admin.activity.modal_radio1_en')}</Radio>
                                                <Radio value={"0"}>{Lang === 0 ? i18n.language === 'zh' ? t('admin.activity.modal_radio2') : t('admin.activity.modal_radio2_en') : Lang === 1 ? t('admin.activity.modal_radio2') : t('admin.activity.modal_radio2_en')}</Radio>
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
    width:13rem;
`
const Lines = styled.div`
    display: -webkit-box;
    overflow : hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

`


