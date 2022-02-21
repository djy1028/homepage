import { Button, Form, Input, message, Upload, Image, Spin, Divider, Space } from 'antd'
import React, { useEffect } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { CloudUploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEditStudent, useAddStudent, useStudentModal } from 'utils/student';
import { openNotificationWithIcon } from 'components/com-notify';
import { emptyPattern } from 'utils/pattern';
import styled from '@emotion/styled'
import { useState } from 'react';
import { ComModal } from 'components/com-modal';
import { aesEncrypt, raesDecrypt } from 'utils';
import Modal from 'antd/lib/modal/Modal';

const Info = () => {
    const [form] = useForm()
    const { t, i18n } = useTranslation()
    const [editprofile, setEditprofile] = useState(false)
    const [showalert, setShowalert] = useState(true)
    const { edit, editingStudent, isLoading, close, studentEdit } = useStudentModal()
    const useStudentMutate = studentEdit ? useEditStudent : useAddStudent
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
        fieldsValue.name = aesEncrypt(fieldsValue.name)
        fieldsValue.phone = aesEncrypt(fieldsValue.phone)
        fieldsValue.cardNumber = aesEncrypt(fieldsValue.cardNumber)
        mutateAsync(studentEdit ? {
            ...fieldsValue, studentId: editingStudent['studentId'],
            cardFrontUrl: fieldsValue['cardFrontUrl'] && fieldsValue['cardFrontUrl'].length > 0 ? fieldsValue['cardFrontUrl'][0].name : '',
            cardBackUrl: fieldsValue['cardBackUrl'] && fieldsValue['cardBackUrl'].length > 0 ? fieldsValue['cardBackUrl'][0].name : '',
            studentCardUrl: fieldsValue['studentCardUrl'][0].name,
        } : {
            ...fieldsValue,
            cardFrontUrl: fieldsValue['cardFrontUrl'] && fieldsValue['cardFrontUrl'].length > 0 ? fieldsValue['cardFrontUrl'][0].name : '',
            cardBackUrl: fieldsValue['cardBackUrl'] && fieldsValue['cardBackUrl'].length > 0 ? fieldsValue['cardBackUrl'][0].name : '',
            studentCardUrl: fieldsValue['studentCardUrl'][0].name,
        }).then((res) => {
            if (res.code === 200) {
                openNotificationWithIcon(0, res.message)
                setEditprofile(false)
                close()
            }
            else {
                openNotificationWithIcon(1, res.message)
            }
        })
    }

    useEffect(() => {
        if (editingStudent) {
            const newEditingStu = { ...editingStudent }
            newEditingStu.name = raesDecrypt(editingStudent.name)
            newEditingStu.phone = raesDecrypt(editingStudent.phone)
            newEditingStu.cardNumber = raesDecrypt(editingStudent.cardNumber)
            newEditingStu.cardFrontUrl = editingStudent.cardFrontUrl && editingStudent.cardFrontUrl[0].url ? editingStudent.cardFrontUrl : null
            newEditingStu.cardBackUrl = editingStudent.cardBackUrl && editingStudent.cardBackUrl[0].url ? editingStudent.cardBackUrl : null
            newEditingStu.studentCardUrl = editingStudent.studentCardUrl && editingStudent.studentCardUrl[0].url ? editingStudent.studentCardUrl : null
            console.log(newEditingStu, editingStudent)
            form.setFieldsValue(newEditingStu)
        }
    }, [{ ...editingStudent }])
    return ((isLoading || mutateLoading) ? <Spin>loading...</Spin> :
        <div id={'studentinfo'} style={{ width: '100%', height: '100%' }}>
            {editingStudent && <HeaderContain>
                <div>{t('admin.student.columns_title.8') + '：'} <span style={{ color: editingStudent.isApproved === 1 ? "#4bc701" : editingStudent.isApproved === -1 ? "#f52929" : "#2483f9" }}>{t(editingStudent.isApproved === 1 ? 'student.approved' : editingStudent.isApproved === -1 ? 'student.noapproved' : 'student.waitapproved')}</span></div>
                {editingStudent.isApproved !== 0 && <div>{t('admin.origanize.approvedComment') + '：'}
                    <Button onClick={() => Modal.info({
                        title: t('admin.origanize.approvedComment'),
                        content: (
                            <div>
                                {editingStudent.approvedComment}
                            </div>
                        )
                    })} type={'link'}>{t('admin.origanize.checkComment')}</Button></div>}
                <div>{t('admin.student.columns_title.9') + '：' + editingStudent.createTime}</div>
            </HeaderContain>}
            {editingStudent && <Divider />}
            <Form style={{ height: 'calc(100vh - 320px)', overflow: 'auto' }} form={form} {...layout} scrollToFirstError={true} name="organize_detail" onFinish={onFinish} >
                <Form.Item name="name" label={t('admin.student.detail_title.0')} rules={[{
                    required: true, validator(_, value) {
                        return !value ? Promise.reject(t('admin.student.input_studentname')) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : Promise.resolve()
                    }, type: 'string', max: 100
                }]}>
                    <Input allowClear disabled={editprofile} bordered={editprofile || !editingStudent} readOnly={!editprofile && editingStudent} />
                </Form.Item>

                <Form.Item name="phone" label={t('admin.student.detail_title.1')} rules={[{ required: true }]}>
                    <Input allowClear bordered={editprofile || !editingStudent} readOnly={!editprofile && editingStudent} />
                </Form.Item>

                <Form.Item name="school" label={t('admin.student.detail_title.2')} rules={[{
                    required: true, validator(_, value) {
                        return !value ? Promise.reject(t('admin.student.input_school')) : emptyPattern.test(value) ? Promise.reject(t('admin.emptycheck')) : Promise.resolve()
                    }, type: 'string', max: 200
                }]}>
                    <Input allowClear bordered={editprofile || !editingStudent} readOnly={!editprofile && editingStudent} />
                </Form.Item>

                <Form.Item name="cardNumber" label={t('admin.student.detail_title.6')} rules={[{ required: i18n.language === 'zh' ? true : false, type: 'string', max: 50 }]}>
                    <Input allowClear bordered={editprofile || !editingStudent} readOnly={!editprofile && editingStudent} maxLength={100} />
                </Form.Item>
                {
                    (editingStudent && !editprofile) ?
                        <Form.Item label={t('admin.student.detail_title.3')}>
                            {editingStudent.cardFrontUrl && editingStudent.cardFrontUrl[0].url ? <Image
                                width={190}
                                height={120}
                                src={editingStudent.cardFrontUrl && editingStudent.cardFrontUrl[0].url}
                            /> : null}
                        </Form.Item> :
                        <Form.Item name="cardFrontUrl" label={t('admin.student.detail_title.3')} rules={[{ required: i18n.language === 'zh' ? true : false, message: t('admin.student.cardfront_mes') }]}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}>
                            <Upload maxCount={1} onPreview={() => null} beforeUpload={file => {
                                if (!file.type.includes('image/')) {
                                    message.error(t('admin.student.img_des'));
                                }
                                return file.type.includes('image/') ? true : Upload.LIST_IGNORE
                            }} listType="picture" accept={'image/*'} action={`/upload/${'cardFrontUrl'}`}>
                                <Button icon={<CloudUploadOutlined />}>{t('admin.student.upload1')}</Button>
                            </Upload>
                        </Form.Item>
                }
                {
                    (editingStudent && !editprofile) ?
                        <Form.Item label={t('admin.student.detail_title.4')}>
                            {editingStudent.cardBackUrl && editingStudent.cardBackUrl[0].url ? <Image
                                width={190}
                                height={120}
                                src={editingStudent.cardBackUrl && editingStudent.cardBackUrl[0].url}
                            /> : null}
                        </Form.Item> :
                        <Form.Item name="cardBackUrl" label={t('admin.student.detail_title.4')} rules={[{ required: i18n.language === 'zh' ? true : false, message: t('admin.student.cardback_mes') }]}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}>
                            <Upload accept={'image/*'} onPreview={() => null} beforeUpload={file => {
                                if (!file.type.includes('image/')) {
                                    message.error(t('admin.student.img_des'));
                                }
                                return file.type.includes('image/') ? true : Upload.LIST_IGNORE
                            }} maxCount={1} listType="picture" action={`/upload/${'cardBackUrl'}`}>
                                <Button icon={<CloudUploadOutlined />}>{t('admin.student.upload2')}</Button>
                            </Upload>
                        </Form.Item>
                }
                {
                    (editingStudent && !editprofile) ?
                        <Form.Item label={t('admin.student.detail_title.5')}>
                            <Image
                                width={190}
                                height={120}
                                src={editingStudent.studentCardUrl && editingStudent.studentCardUrl[0].url}
                            />
                        </Form.Item> :
                        <Form.Item name="studentCardUrl" label={t('admin.student.detail_title.5')} rules={[{ required: true, message: t('admin.student.idcard_mes') }]}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}>
                            <Upload accept={'image/*'} onPreview={() => null} beforeUpload={file => {
                                if (!file.type.includes('image/')) {
                                    message.error(t('admin.student.img_des'));
                                }
                                return file.type.includes('image/') ? true : Upload.LIST_IGNORE
                            }} maxCount={1} listType="picture" action={`/upload/${'studentCardUrl'}`}>
                                <Button icon={<CloudUploadOutlined />}>{t('admin.student.upload3')}</Button>
                            </Upload>
                        </Form.Item>
                }
                {
                    (editingStudent && !editprofile) ?
                        <Form.Item label={t('admin.student.detail_title.8')} rules={[{ required: false }]}>
                            <Input.TextArea autoSize defaultValue={editingStudent.education} readOnly />
                        </Form.Item> :
                        <Form.Item name="education" label={t('admin.student.detail_title.8')} rules={[{ required: false }]}>
                            <Input.TextArea autoSize allowClear showCount maxLength={500} />
                        </Form.Item>
                }
                {
                    (editingStudent && !editprofile) ?
                        <Form.Item label={t('admin.student.detail_title.9')} rules={[{ required: false }]}>
                            <Input.TextArea autoSize defaultValue={editingStudent.internship} readOnly />
                        </Form.Item> :
                        <Form.Item name="internship" label={t('admin.student.detail_title.9')} rules={[{ required: false }]}>
                            <Input.TextArea autoSize allowClear showCount maxLength={500} />
                        </Form.Item>
                }
                {
                    (editingStudent && !editprofile) ?
                        <Form.Item label={t('admin.student.detail_title.10')} rules={[{ required: false }]}>
                            <Input.TextArea autoSize defaultValue={editingStudent.program} readOnly />
                        </Form.Item> :
                        <Form.Item name="program" label={t('admin.student.detail_title.10')} rules={[{ required: false }]}>
                            <Input.TextArea autoSize allowClear showCount maxLength={500} />
                        </Form.Item>
                }
                {
                    (editingStudent && !editprofile) ?
                        <Form.Item label={t('admin.student.detail_title.11')} rules={[{ required: false }]}>
                            <Input.TextArea autoSize defaultValue={editingStudent.openSoource} readOnly />
                        </Form.Item> :
                        <Form.Item name="openSoource" label={t('admin.student.detail_title.11')} rules={[{ required: false }]}>
                            <Input.TextArea autoSize allowClear showCount maxLength={500} />
                        </Form.Item>
                }
                {
                    (editingStudent && !editprofile) ?
                        <Form.Item label={t('admin.student.detail_title.12')} rules={[{ required: false }]}>
                            <Input.TextArea autoSize defaultValue={editingStudent.skill} readOnly />
                        </Form.Item> :
                        <Form.Item name="skill" label={t('admin.student.detail_title.12')} rules={[{ required: false }]}>
                            <Input.TextArea autoSize allowClear showCount maxLength={500} />
                        </Form.Item>
                }
                <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                    {
                        (editingStudent && !editprofile) && <SubmitBtn onClick={() => {
                            setEditprofile(true)
                            edit()
                            form.setFieldsValue(editingStudent)
                        }} htmlType={''}>
                            {t('admin.student.editbtn')}
                        </SubmitBtn>
                    }
                    {
                        (!editingStudent || editprofile) && <SubmitBtn loading={mutateLoading} htmlType="submit">
                            {t('admin.student.savebtn')}
                        </SubmitBtn>
                    }
                    {
                        editprofile && <CancelBtn onClick={() => {
                            setEditprofile(false)
                            close()
                        }}>{t('admin.student.cancelbtn')}</CancelBtn>
                    }
                </Form.Item>
            </Form>
            {!editingStudent && showalert && <ComModal style={{ top: '20rem' }} footer={<Button onClick={() => setShowalert(false)} style={{ background: '#0d86ff', border: 'none' }} type={'primary'}>{'知道了'}</Button>} visible={showalert} close={() => setShowalert(false)} children={<Space align={"start"}><InfoCircleOutlined style={{ color: '#ffb100', fontSize: '1.8rem' }} /> <p style={{ fontSize: '1.8rem' }}>{t('project.alert_msg')}</p></Space>} title={t('project.mes_alert')} />}
        </div>
    )
}

const SubmitBtn = styled(Button)`
    width: 9.5rem;
    height: 3rem;
    color: #0d86ff;
    border-color: #0d86ff;
     @media (max-width: 1200px) {
        width: auto;
        height: auto;
    }
`

const CancelBtn = styled(Button)`
    width: 9.5rem;
    height: 3rem;
    margin-left: 2rem;
     @media (max-width: 1200px) {
        width: auto;
        height: auto;
    }
`
const HeaderContain = styled.div`
    width: '100%'; 
    height: '100%';
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 0.6rem;
`

export default Info

