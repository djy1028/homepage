import { Button, Form, Input, message, Upload, Image, Spin} from 'antd'
import React, { useEffect } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { CloudUploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEditStudent, useAddStudent, useStudentModal } from 'utils/student';
import { openNotificationWithIcon } from 'components/com-notify';
import { emptyPattern } from 'utils/pattern';
import styled from '@emotion/styled'
import { useState } from 'react';

export const Info = () => {
    const [form] = useForm()
    const { t, i18n } = useTranslation()
    const [editprofile,setEditprofile] = useState(false)
    const { edit, editingStudent, isLoading, close, refetch, studentEdit } = useStudentModal()
    const useStudentMutate = studentEdit?useEditStudent:useAddStudent
    const { mutateAsync, isLoading: mutateLoading } = useStudentMutate()
    const formData = new FormData()
    const normFile = (e) => {
        formData.append('file1', e)
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
    };

    const onFinish = (fieldsValue) => {
        mutateAsync({
            ...fieldsValue, studentId: editingStudent['studentId'],
            cardFrontUrl: fieldsValue['cardFrontUrl'] && fieldsValue['cardFrontUrl'].length > 0 ? fieldsValue['cardFrontUrl'][0].name : '',
            cardBackUrl: fieldsValue['cardBackUrl'] && fieldsValue['cardBackUrl'].length > 0 ? fieldsValue['cardBackUrl'][0].name : '',
            studentCardUrl: fieldsValue['studentCardUrl'][0].name,
        }).then((res) => {
            form.resetFields()
            if (res.code === 200) {
                openNotificationWithIcon(0, res.message)
                refetch().then(rsp => {
                    rsp.data.res && form.setFieldsValue(rsp.data.res)
                    setEditprofile(false)
                    close()
                })
            }
            else {
                openNotificationWithIcon(1, res.message)
            }
        })
    }

    useEffect(() => {
        if (editingStudent) {
            editingStudent.cardFrontUrl = editingStudent.cardFrontUrl && editingStudent.cardFrontUrl[0].url ? editingStudent.cardFrontUrl : null
            editingStudent.cardBackUrl = editingStudent.cardBackUrl && editingStudent.cardBackUrl[0].url ? editingStudent.cardBackUrl : null
            editingStudent.studentCardUrl = editingStudent.studentCardUrl && editingStudent.studentCardUrl[0].url ? editingStudent.studentCardUrl : null
            form.setFieldsValue(editingStudent)
        }
    }, [editingStudent, form])
    return ((isLoading || mutateLoading)?<Spin>loading...</Spin>:
            <Form form={form} {...layout} scrollToFirstError={true} name="organize_detail" onFinish={onFinish} >
                <Form.Item name="name" label={t('admin.student.detail_title.0')} rules={[{
                    required: true, validator(_, value) {
                        return !value ? Promise.reject(t('admin.student.input_studentname')) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : Promise.resolve()
                    }, type: 'string', max: 100
                }]}>
                    {
                        (editingStudent && !editprofile) ? editingStudent.name : <Input allowClear />
                    }
                </Form.Item>
                <Form.Item name="phone" label={t('admin.student.detail_title.1')} rules={[{ required: true, pattern: /^[1]([3-9])[0-9]{9}$/, message: t('admin.student.phone_validmessage') }]}>
                    {
                        (editingStudent && !editprofile) ? editingStudent.phone : <Input allowClear />
                    }
                </Form.Item>
                <Form.Item name="school" label={t('admin.student.detail_title.2')} rules={[{
                    required: true, validator(_, value) {
                        return !value ? Promise.reject(t('admin.student.input_school')) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : Promise.resolve()
                    }, type: 'string', max: 200
                }]}>
                    {
                        (editingStudent && !editprofile) ? editingStudent.school : <Input allowClear />
                    }
                </Form.Item>
                <Form.Item name="cardNumber" label={t('admin.student.detail_title.6')} rules={[{ required: true, type: 'string', max: 50, pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: t('admin.student.card_validmessage') }]}>
                    {
                        (editingStudent && !editprofile) ? editingStudent.cardNumber : <Input allowClear maxLength={100} />
                    }
                </Form.Item>
                <Form.Item name="cardFrontUrl" label={t('admin.student.detail_title.3')} rules={[{ required: i18n.language === 'zh' ? true : false, message: t('admin.student.cardfront_mes') }]}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}>
                    {
                        (editingStudent && !editprofile) ? <Image
                            width={190}
                            height={120}
                        src={editingStudent.cardFrontUrl && editingStudent.cardFrontUrl[0].url}
                        /> :
                            <Upload maxCount={1} onPreview={() => null} beforeUpload={file => {
                                if (!file.type.includes('image/')) {
                                    message.error(t('admin.student.img_des'));
                                }
                                return file.type.includes('image/') ? true : Upload.LIST_IGNORE
                            }} listType="picture" accept={'image/*'} action={`/upload/${'cardFrontUrl'}`}>
                                <Button icon={<CloudUploadOutlined />}>{t('admin.student.upload1')}</Button>
                            </Upload>
                    }
                </Form.Item>
                <Form.Item name="cardBackUrl" label={t('admin.student.detail_title.4')} rules={[{ required: i18n.language === 'zh' ? true : false, message: t('admin.student.cardback_mes') }]}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}>
                    {
                        (editingStudent && !editprofile) ? <Image
                            width={190}
                            height={120}
                        src={editingStudent.cardBackUrl && editingStudent.cardBackUrl[0].url}
                        /> :
                            <Upload accept={'image/*'} onPreview={() => null} beforeUpload={file => {
                                if (!file.type.includes('image/')) {
                                    message.error(t('admin.student.img_des'));
                                }
                                return file.type.includes('image/') ? true : Upload.LIST_IGNORE
                            }} maxCount={1} listType="picture" action={`/upload/${'cardBackUrl'}`}>
                                <Button icon={<CloudUploadOutlined />}>{t('admin.student.upload2')}</Button>
                            </Upload>
                    }

                </Form.Item>
                <Form.Item name="studentCardUrl" label={t('admin.student.detail_title.5')} rules={[{ required: true, message: t('admin.student.idcard_mes') }]}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}>
                    {
                        (editingStudent && !editprofile) ? <Image
                            width={190}
                            height={120}
                        src={editingStudent.studentCardUrl && editingStudent.studentCardUrl[0].url}
                        /> :
                            <Upload accept={'image/*'} onPreview={() => null} beforeUpload={file => {
                                if (!file.type.includes('image/')) {
                                    message.error(t('admin.student.img_des'));
                                }
                                return file.type.includes('image/') ? true : Upload.LIST_IGNORE
                            }} maxCount={1} listType="picture" action={`/upload/${'studentCardUrl'}`}>
                                <Button icon={<CloudUploadOutlined />}>{t('admin.student.upload3')}</Button>
                            </Upload>
                    }

                </Form.Item>

                <Form.Item name="education" label={t('admin.student.detail_title.8')} rules={[{ required: false }]}>
                    {
                        (editingStudent && !editprofile) ? <Input.TextArea readOnly /> : <Input.TextArea allowClear showCount maxLength={500} />
                    }
                </Form.Item>
                <Form.Item name="internship" label={t('admin.student.detail_title.9')} rules={[{ required: false }]}>
                    {
                        (editingStudent && !editprofile) ? <Input.TextArea readOnly /> : <Input.TextArea allowClear showCount maxLength={500} />
                    }
                </Form.Item>
                <Form.Item name="program" label={t('admin.student.detail_title.10')} rules={[{ required: false }]}>
                    {
                        (editingStudent && !editprofile) ? <Input.TextArea readOnly /> : <Input.TextArea allowClear showCount maxLength={500} />
                    }
                </Form.Item>
                <Form.Item name="openSoource" label={t('admin.student.detail_title.11')} rules={[{ required: false }]}>
                    {
                        (editingStudent && !editprofile) ? <Input.TextArea readOnly /> : <Input.TextArea allowClear showCount maxLength={500} />
                    }
                </Form.Item>
                <Form.Item name="skill" label={t('admin.student.detail_title.12')} rules={[{ required: false }]}>
                    {
                        (editingStudent && !editprofile) ? <Input.TextArea readOnly /> : <Input.TextArea allowClear showCount maxLength={500} />
                    }
                </Form.Item>
                <Form.Item wrapperCol={{ offset: (!editingStudent || !editprofile)?11:10 }}>
                        {
                    (editingStudent && !editprofile) && <SubmitBtn onClick={() => {
                        setEditprofile(true)
                        edit()
                    }} htmlType={''}>
                                                                {t('admin.student.editbtn')}
                        </SubmitBtn>
                        }
                        {
                            (!editingStudent||editprofile) && <SubmitBtn loading={mutateLoading} htmlType="submit">
                                {t('admin.student.savebtn')}
                            </SubmitBtn>
                        }
                        {
                    editprofile && <CancelBtn onClick={() => {
                        setEditprofile(false)
                        close()
                    } }>{t('admin.student.cancelbtn')}</CancelBtn>
                        }
                    </Form.Item>
            </Form>
    )
}

const SubmitBtn = styled(Button)`
    width: 9.5rem;
    height: 3rem;
    color: #0d86ff;
    border-color: #0d86ff;`

const CancelBtn = styled(Button)`
    width: 9.5rem;
    height: 3rem;
    margin-left: 2rem;
`

