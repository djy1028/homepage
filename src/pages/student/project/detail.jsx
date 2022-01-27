import styled from '@emotion/styled';
import React from 'react'
import { Button, Descriptions, Divider, message, Modal, Space, Spin, Steps, Upload } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, CloudUploadOutlined, DownloadOutlined, ExclamationCircleOutlined, InfoCircleOutlined }  from '@ant-design/icons'
import { checkSetPriority, downloadApplication, downloadTemplate, getToken } from 'auth-provider';
import { openNotificationWithIcon } from 'components/com-notify';
import { useTranslation } from 'react-i18next';
import { useBankModal, useStuProgramModal, useStuProQueryKey } from 'utils/project';
import { useStuproupload, useStuprozipupload } from 'utils/student';
import { Bankinfo } from './bankinfo';
import { ComModal } from 'components/com-modal';
import { useState } from 'react';
import { raesDecrypt } from 'utils';

export const Detail = (props)=>{
    const { t } = useTranslation()
    const { refetch } = props
    const token = getToken()
    const { applyInfo, applyInfoLoading, isFetching, inquiryApplyId, fetchapply } = useStuProgramModal()
    const { close } = useStuProgramModal()
    const [commit,setCommit] = useState(false)
    const { projectModal, editBank,closeBank } = useBankModal()
    const { mutateAsync, isLoading: uploadLoading } = useStuproupload(useStuProQueryKey())
    const { mutateAsync: mutateAsynczip, isLoading: uploadzipLoading } = useStuprozipupload(inquiryApplyId)
    const uploadfile = ()=>{
        mutateAsync({id:applyInfo.id}).then(res=>{
            if (res.code === 200) {
                openNotificationWithIcon(0, res.message)
                fetchapply()

            } else {
                openNotificationWithIcon(1, res.message)
            } 
        })
    }
    const uploadzip = (phase) => {
        let status = ''
        switch (phase) {
            case 'apply':
                status = 'first'
                break
            case 'mid':
                status = 'mid'
                break
            case 'end':
                status = 'end'
                break
        }
        checkSetPriority(token, { activityId: applyInfo.activityId, status: status }).then(rsp => {
            if (rsp.res) {
                mutateAsynczip({ id: applyInfo.id, phase: phase }).then(res => {
                    if (res.code === 200) {
                        openNotificationWithIcon(0, res.message)
                        close()
                        refetch()

                    }
                    else {
                        openNotificationWithIcon(1, res.message)
                    }
                })
            }
            else {
                openNotificationWithIcon(1, t(status === 'first' ? 'project.reject_first' : status === 'mid' ? 'project.reject_mid' :'project.reject_end'))
            }
           
        })
    }
    const deleteuploadfile = () => {
        mutateAsync({id:-1}).then(res=>{
            res.code === 200? openNotificationWithIcon(0,res.message):openNotificationWithIcon(1,res.message)
        })
    }
    const deleteuploadzip = (phase) => {
        mutateAsynczip({ id: -1,phase }).then(res => {
            res.code === 200 ? openNotificationWithIcon(0, res.message) : openNotificationWithIcon(1, res.message)
        })
    }

    const judge = (name) => ['.zip', '.rar', '.tar', '.tar.gz', '.7z'].some(item => name.includes(item))
    return (
        !applyInfo || isFetching || applyInfoLoading || uploadzipLoading ? <Spin>loading</Spin> :
            <div id="stu_step_detail">
            <NewStep direction={'vertical'} 
                current={applyInfo && applyInfo.status<=6 && applyInfo.status>=-1?0: 
                    applyInfo && ((applyInfo.status<11 && applyInfo.status>6)||(applyInfo.middleApplicationUrl && !applyInfo.endApplicationUrl && applyInfo.status === -2))?1:
                        applyInfo && ((applyInfo.status <= 15 && applyInfo.status>=11) || (applyInfo.endApplicationUrl && applyInfo.status === -2))?2:3}>
                <Steps.Step title={<strong>{t('admin.firsttrial.step_title.0')}</strong>} description={
                    <>
                        <Des column={2}>
                            {applyInfo && (applyInfo.status === 0||applyInfo.status ===1 || applyInfo.status ===2) &&
                                <>
                                    <Descriptions.Item label={''} >
                                        <Space direction={'vertical'} size={10}>
                                            <a onClick={() => downloadTemplate(token,t('project.moban'))}><DownloadOutlined /> {t('project.application_model')}</a>
                                            <p><ExclamationCircleOutlined />  <span style={{ color: '#a7a5a5' }}>{t('project.upload_mes')}</span></p>
                                            <Upload onChange={({ file }) => file.status === 'done' && setCommit(true)} onRemove={() => deleteuploadzip('apply')} onPreview={(file) => !file.response && downloadApplication(applyInfo.id, 'application', token, applyInfo.applicationUrl.split('/').pop())}
                                                defaultFileList={applyInfo?.applicationUrl ? [
                                                    {
                                                        uid: '1',
                                                        name: applyInfo.applicationUrl ? applyInfo.applicationUrl.split("/").pop() : 'application.zip',
                                                        status: 'done',
                                                        url: applyInfo.applicationUrl
                                                    }
                                                ] : []} accept={'.zip,.rar,.tar,.tar.gz,.7z'} beforeUpload={file => {

                                                    if (!judge(file.name)) {
                                                        message.error(t('project.zip_upload_mes'));
                                                    }
                                                    if (file.size > 104857600) {
                                                        message.error(t('project.zip_upload_messize'));
                                                    }
                                                    return (judge(file.name) && file.size < 104857600) ? true : Upload.LIST_IGNORE
                                                }} maxCount={1} action={`/uploadZIP/${'studentApplication'}`}>
                                                <Button icon={<CloudUploadOutlined />}>{t('tutor.upload')}</Button>
                                            </Upload>
                                        
                                        </Space>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={''} >
                                        <Space direction={'vertical'}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}><Button disabled={!commit} loading={uploadzipLoading} onClick={() => uploadzip('apply')} type={'primary'}>{t('project.upload_btn')}</Button><div style={{ color: 'red', marginLeft: '2rem' }}>{t('project.upload_btn_mes')}</div></div>
                                            {applyInfo.firstApproveCommitTime && applyInfo.status === 0 && <p><ExclamationCircleOutlined /> <span style={{ color: '#a7a5a5' }}>{t('project.firstapply_mes.0') + applyInfo.firstApproveCommitTime + t('project.firstapply_mes.1')}</span></p>}
        
                                            </Space>
                                    </Descriptions.Item>
                                </>
                            }
                            {applyInfo.applicationUrl && (applyInfo.status >= 3 || applyInfo.status === -1 || applyInfo.status === -2) && <Descriptions.Item label={t('admin.firsttrial.first.5')} >
                                    <a  onClick={()=>downloadApplication(applyInfo.id,'application',token,applyInfo.applicationUrl.split('/').pop())}>{applyInfo.applicationUrl.split('/').pop()}
                                    </a>
                                </Descriptions.Item>}
                            
                            {(applyInfo.status >= 3 || applyInfo.isMatched === 1) && <Descriptions.Item label={''} ><div id={'mid.first_teacher_approve'} style={{ color: '#52c41a' }}> <CheckCircleTwoTone twoToneColor="#52c41a" /> {t('admin.firsttrial.first_teacher_approve')}</div></Descriptions.Item>}
                                {applyInfo.firstTeacherApprover && <Descriptions.Item label={t('admin.firsttrial.first.0')}>{raesDecrypt(applyInfo.firstTeacherApprover)}</Descriptions.Item>}
                            {applyInfo.firstTeacherApproverTime && <Descriptions.Item label={t('admin.firsttrial.first.1')}>{applyInfo.firstTeacherApproverTime}</Descriptions.Item>}
                                {applyInfo.status === 1 && <Descriptions.Item label={''} ><p><span style={{ color: 'red' }}>{t('project.waitsort')}</span></p></Descriptions.Item>}
                            {applyInfo.summerFirstApprovePublicTime && applyInfo.status <= 4 && applyInfo.status > 1 && <Descriptions.Item label={''} ><p><span style={{ color: '#a7a5a5' }}>{t('project.firstpublic_mes.0') + applyInfo.summerFirstApprovePublicTime + t('project.firstpublic_mes.1')}</span></p></Descriptions.Item>}
                                {(applyInfo && applyInfo.status === 5 || applyInfo && applyInfo.status >= 7 || applyInfo && applyInfo.firstSummerIsApproved === 1) && applyInfo.gitUrl && <Descriptions.Item label={''} ><a href={applyInfo.gitUrl} target="_blank"><span>{t('admin.firsttrial.gitword')}</span></a></Descriptions.Item>}
                        </Des>
                        {(applyInfo.status>4 || applyInfo.status === -2 || applyInfo.status === -1) && 
                            <>
                                <Divider dashed />
                                <Des column={2}>
                                    {applyInfo.firstSummerApprover && <Descriptions.Item label={t('admin.firsttrial.first.2')}>{applyInfo.firstSummerApprover}</Descriptions.Item>}
                                    {applyInfo.firstSummerIsApproved && <Descriptions.Item label={''}><div id={'mid.firstSummerIsApproved'} style={{color:applyInfo.firstSummerIsApproved ===1?'#52c41a':'red'}}>
                                        {applyInfo.firstSummerIsApproved ===1? <>
                                        <CheckCircleTwoTone twoToneColor="#52c41a" /> {t('admin.firsttrial.first.6')}</>:
                                        <><CloseCircleTwoTone twoToneColor="red" />{t('admin.firsttrial.first.7')}</>}
                                        </div></Descriptions.Item>}
                                    {applyInfo.firstSummerApproverTime && <Descriptions.Item label={t('admin.firsttrial.first.3')}>{applyInfo.firstSummerApproverTime}</Descriptions.Item>}
                                    {applyInfo.firstSummerComment && <Descriptions.Item label={t('admin.firsttrial.first.4')}>{applyInfo.firstSummerComment}</Descriptions.Item>}
                                    {applyInfo.status === -1 && <Descriptions.Item label={''}><p><span style={{ color: 'red' }}>{t('project.outReject')}</span></p></Descriptions.Item>}
                                </Des>
                                {applyInfo.status === -2 && !applyInfo.endApplicationUrl && !applyInfo.middleApplicationUrl && <Descriptions.Item label={''}><p><span style={{ color: 'red' }}>{t('project.expiredReject')}</span></p></Descriptions.Item>}
                            </>
                            }
                    </>
                } />
                    
                {
                        (applyInfo.status === -2 && !applyInfo.middleApplicationUrl) || applyInfo.status === -1 ? null :
                        <Steps.Step title={<strong>{t('admin.firsttrial.step_title.1')}</strong>} description={
                                <>
                                    {
                                applyInfo && (applyInfo.status === 5 || applyInfo.status === 7) &&
                                <Des column={2}>
                                    <Descriptions.Item label={''} >
                                        <Space direction={'vertical'} size={10}>
                                            <a onClick={() => downloadApplication(4, undefined, token, t('project.rarmoban'))}>
                                                <DownloadOutlined /> {t('project.mid_model')}
                                            </a>
                                            <Upload onRemove={() => deleteuploadzip('mid')} defaultFileList={applyInfo.middleApplicationUrl ? [
                                                {
                                                    uid: '1',
                                                    name: applyInfo.middleApplicationUrl ? applyInfo.middleApplicationUrl.split("/").pop() : 'midreport.zip',
                                                    status: 'done',
                                                    url: applyInfo.middleApplicationUrl
                                                }
                                            ] : []} onChange={({ file }) => file.status === 'done' && setCommit(true)} accept={'.zip,.rar,.tar,.tar.gz,.7z'} onPreview={(file) => !file.response && downloadApplication(applyInfo.id, 'mid', token, applyInfo.middleApplicationUrl.split('/').pop())} beforeUpload={file => {
                                                if (!judge(file.name)) {
                                                    message.error(t('project.zip_upload_mes'));
                                                }
                                                if (file.size > 104857600) {
                                                    message.error(t('project.zip_upload_messize'));
                                                }
                                                return (judge(file.name) && file.size < 104857600) ? true : Upload.LIST_IGNORE
                                            }} maxCount={1} action={`/uploadReport/${'studentReportMid'}`}>
                                                <Button icon={<CloudUploadOutlined />}>{t('tutor.upload')}</Button>
                                            </Upload>
                                        </Space>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={''} >
                                        <Space direction={'vertical'}>
                                            <Button disabled={!commit} loading={uploadzipLoading} onClick={() => uploadzip('mid')} type={'primary'}>{t('project.upload_btn')}</Button>
                                            {applyInfo.studentMiddleCommitTime && <p><span style={{ color: '#a7a5a5' }}>{t('project.midresport_mes.0') + applyInfo.studentMiddleCommitTime + t('project.midresport_mes.1')}</span></p>}
                                        </Space>
                                    </Descriptions.Item>
                                </Des>}
            
                                {applyInfo && (applyInfo.status >= 8 || applyInfo.status === -2) ?
                                    <>
                                        <Des column={2}>
                                            {applyInfo.middleApplicationUrl && <Descriptions.Item label={t('admin.firsttrial.mid.6')} ><a onClick={() => downloadApplication(applyInfo.id, 'mid', token, applyInfo.middleApplicationUrl.split('/').pop())}>{applyInfo.middleApplicationUrl.split('/').pop()}</a></Descriptions.Item>}
                                            
                                            {/* {applyInfo.teacherMiddleApproveExpiredTime && <Descriptions.Item label={t('tutor.midenddate')}>{applyInfo.teacherMiddleApproveExpiredTime}</Descriptions.Item>} */}
                                            {applyInfo.middleTeacherIsApproved && <Descriptions.Item label={''} ><div id={'mid.middleTeacherIsApproved'} style={{ color: applyInfo.middleTeacherIsApproved === 1 ? '#52c41a' : 'red' }}>
                                                {
                                                    applyInfo.middleTeacherIsApproved === 1 ?
                                                        <><CheckCircleTwoTone twoToneColor="#52c41a" /> {t('admin.firsttrial.mid_teacher_approve')}</> :
                                                        <><CloseCircleTwoTone twoToneColor="red" /> {t('admin.firsttrial.mid_teacher_reject')}</>
                                                }
                                            </div></Descriptions.Item>}
                                                {applyInfo.middleTeacherApprover && <Descriptions.Item label={t('admin.firsttrial.mid.0')}>{raesDecrypt(applyInfo.middleTeacherApprover)}</Descriptions.Item>}
                                            {applyInfo.middleTeacherApproverTime && <Descriptions.Item label={t('admin.firsttrial.mid.1')}>{applyInfo.middleTeacherApproverTime}</Descriptions.Item>}
                                            {applyInfo.middleTeacherComment && <Descriptions.Item label={t('admin.firsttrial.mid.2')}>{applyInfo.middleTeacherComment}</Descriptions.Item>}
                                            {(applyInfo.summerMiddleApprovePublicTime && applyInfo.status === 9) && <Descriptions.Item label={''}><p style={{ color: '#a7a5a5' }}><InfoCircleOutlined /><span>{t('project.midtutor_pubmes.0') + applyInfo.summerMiddleApprovePublicTime + t('project.midtutor_pubmes.1')}</span></p></Descriptions.Item>}
                                            </Des>
                                        {applyInfo.summerMiddleApprovePublicTime && <Divider dashed />}
                                        {applyInfo.summerMiddleApprovePublicTime && <Des column={2}>
                                            {applyInfo.middleSummerApprover && <Descriptions.Item label={t('admin.firsttrial.mid.3')}>{applyInfo.middleSummerApprover}</Descriptions.Item>}
                                            {applyInfo.middleSummerIsApproved && <Descriptions.Item label={''}><div id={'mid.middleSummerIsApproved'} style={{ color: applyInfo.middleSummerIsApproved === 1 ? '#52c41a' : 'red' }}>
                                                {applyInfo.middleSummerIsApproved === 1 ? <><CheckCircleTwoTone twoToneColor="#52c41a" /> {t('admin.firsttrial.mid.7')}</> :
                                                    <><CloseCircleTwoTone twoToneColor="red" />{t('admin.firsttrial.mid.8')}</>}
                                            </div></Descriptions.Item>}
                                            {applyInfo.middleSummerApproverTime && <Descriptions.Item label={t('admin.firsttrial.mid.4')}>{applyInfo.middleSummerApproverTime}</Descriptions.Item>}
                                            {applyInfo.middleSummerComment && <Descriptions.Item label={t('admin.firsttrial.mid.5')}>{applyInfo.middleSummerComment}</Descriptions.Item>}
                                        
                                        </Des>}
                                        {applyInfo.status === -2 && !applyInfo.endApplicationUrl && <Descriptions.Item label={''}><p><span style={{ color: 'red' }}>{t('project.expiredReject')}</span></p></Descriptions.Item>}
                                    </> : <Des />
                                    }
                                    {(applyInfo.summerMiddleApprovePublicTime && applyInfo.status === 11) &&
                                        <>
                                            <Divider dashed />
                                            <Des column={2}>
                                                <Descriptions.Item label={''} >
                                                    <Space direction={'vertical'} size={20}>
                                                        <span><a onClick={() => downloadApplication(1, undefined, token, t('admin.firsttrial.pdfname2'))}>
                                                            {t('tutor.downloadpdf')}
                                                        </a>{t('tutor.despdf')}</span>
                                                        <Upload onChange={({ file }) => file.status === 'done' && setCommit(true)} onRemove={() => deleteuploadfile()}
                                                            defaultFileList={applyInfo?.studentMidAgreement ? [
                                                                {
                                                                    uid: '1',
                                                                    name: applyInfo.studentMidAgreement ? applyInfo.studentMidAgreement.split("/").pop() : 'studentMidAgreement.pdf',
                                                                    status: 'done'
                                                                }
                                                            ] : []} accept={'.pdf'} onPreview={() => null} beforeUpload={file => {
                                                                if (!file.type.includes('/pdf')) {
                                                                    message.error(t('tutor.pdf_upload_mes'));
                                                                }
                                                                return file.type.includes('/pdf') ? true : Upload.LIST_IGNORE
                                                            }} maxCount={1} action={`/uploadPdf/${'studentAgreement'}`}>
                                                            <Button icon={<CloudUploadOutlined />}>{t('tutor.upload')}</Button>
                                                    </Upload>
                                                    </Space>
                                                </Descriptions.Item>
                                                <Descriptions.Item label={''} >
                                                    <Space direction='vertical'>
                                                        <Button disabled={!commit} loading={uploadLoading} onClick={() => uploadfile(applyInfo.id)} type={'primary'}>{t('tutor.uploadpdf')}</Button>
                                                    <div style={{color:'red'}}>{t('admin.project.agreement_mes')}</div>
                                                    </Space>
                                                </Descriptions.Item>
                                            </Des>
                                        </>
                                    }
                                    {(applyInfo.summerMiddleApprovePublicTime && applyInfo.status === 11 && applyInfo.studentMidAgreement) &&
                                        <>
                                            <Divider dashed />
                                            <Des column={2} style={{ minHeight: '2.5rem' }}>
                                                <Descriptions.Item label={''} >
                                                    <a onClick={() => editBank()}><span>{t('admin.firsttrial.bankinfo')}</span></a>
                                                </Descriptions.Item>
                                                <Descriptions.Item label={''} ><a onClick={() => downloadApplication(3, undefined, token, t('admin.firsttrial.pdfname'))}><span>{t('admin.firsttrial.bankpdf')}</span></a></Descriptions.Item>
                                            </Des>
                                        </>
                                    }
                            
                                </>
                                
                        } />
                }
                {
                        (applyInfo.status === -2 && !applyInfo.endApplicationUrl) || applyInfo.status === -1 ? null :
                        <Steps.Step title={<strong>{t('admin.firsttrial.step_title.3')}</strong>} description={
                            <>{
                                    applyInfo && (applyInfo.status === 11 || applyInfo.status === 12) && (!applyInfo.summerMiddleApprovePublicTime || (applyInfo.summerMiddleApprovePublicTime && applyInfo.studentMidAgreement) ) &&
                                <Des column={2}>
                                    <Descriptions.Item label={''} >
                                        <Space direction={'vertical'} size={10}>
                                            <a onClick={() => downloadApplication(4, undefined, token, t('project.rarmoban'))}>
                                                <DownloadOutlined /> {t('project.mid_model')}
                                            </a>
                                            <Button disabled={!commit} loading={uploadzipLoading} onClick={() => uploadzip('end')} type={'primary'}>{t('project.upload_btn')}</Button>
                                            {applyInfo.studentEndCommitTime && <p><span style={{ color: '#a7a5a5' }}>{t('project.midresport_mes.0') + applyInfo.studentEndCommitTime + t('project.midresport_mes.1')}</span></p>}
                                        </Space>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={''} >
                                        <Space direction={'vertical'}>
                                            <Upload onChange={({ file }) => file.status === 'done' && setCommit(true)} onRemove={() => deleteuploadzip('end')} defaultFileList={applyInfo.endApplicationUrl ? [
                                                {
                                                    uid: '1',
                                                    name: applyInfo?.endApplicationUrl ? applyInfo.endApplicationUrl.split("/").pop() : 'endreport.zip',
                                                    status: 'done',
                                                    url: applyInfo?.endApplicationUrl
                                                }
                                            ] : []} accept={'.zip,.rar,.tar,.tar.gz,.7z'} onPreview={(file) => !file.response && downloadApplication(applyInfo.id, 'end', token, applyInfo.endApplicationUrl.split('/').pop())} beforeUpload={file => {
                                                if (!judge(file.name)) {
                                                    message.error(t('project.zip_upload_mes'));
                                                }
                                                if (file.size > 104857600) {
                                                    message.error(t('project.zip_upload_messize'));
                                                }
                                                return (judge(file.name) && file.size < 104857600) ? true : Upload.LIST_IGNORE
                                            }} maxCount={1} action={`/uploadReport/${'studentReportEnd'}`}>
                                                <Button icon={<CloudUploadOutlined />}>{t('tutor.upload')}</Button>
                                                    </Upload>
                                                    
                                        </Space>
                                    </Descriptions.Item>
                                </Des>}
                                {applyInfo && (applyInfo.status > 12 || applyInfo.status === -2) ?
                                    <>
                                        <Des column={2}>
                                            {applyInfo.endApplicationUrl && <Descriptions.Item label={t('admin.firsttrial.end.6')} ><a onClick={() => downloadApplication(applyInfo.id, 'end', token, applyInfo.endApplicationUrl.split('/').pop())}>{applyInfo.endApplicationUrl.split('/').pop()}</a></Descriptions.Item>}
                                            {applyInfo.endTeacherIsApproved && <Descriptions.Item label={''} ><div id={'mid.endTeacherIsApproved'} style={{ color: applyInfo.endTeacherIsApproved === 1 ? '#52c41a' : 'red' }}>
                                                {
                                                    applyInfo.endTeacherIsApproved === 1 ?
                                                        <><CheckCircleTwoTone twoToneColor="#52c41a" /> {t('admin.firsttrial.end_teacher_approve')}</> :
                                                        <><CloseCircleTwoTone twoToneColor="red" /> {t('admin.firsttrial.end_teacher_reject')}</>
                                                }
                                            </div></Descriptions.Item>}
                                                {applyInfo.endTeacherApprover && <Descriptions.Item label={t('admin.firsttrial.end.0')}>{raesDecrypt(applyInfo.endTeacherApprover)}</Descriptions.Item>}
                                            {applyInfo.endTeacherApproverTime && <Descriptions.Item label={t('admin.firsttrial.end.1')}>{applyInfo.endTeacherApproverTime}</Descriptions.Item>}
                                            {applyInfo.endTeacherComment && <Descriptions.Item label={t('admin.firsttrial.end.2')}>{applyInfo.endTeacherComment}</Descriptions.Item>}
                                           
                                        </Des>
                                        {applyInfo.endSummerApprover && <Divider dashed />}
                                        <Des column={2}>
                                            {applyInfo.endSummerApprover && <Descriptions.Item label={t('admin.firsttrial.end.3')}>{applyInfo.endSummerApprover}</Descriptions.Item>}
                                            {applyInfo.endSummerIsApproved && <Descriptions.Item label={''}><div id={'mid.endSummerIsApproved'} style={{ color: applyInfo.endSummerIsApproved === 1 ? '#52c41a' : 'red' }}>
                                                {applyInfo.endSummerIsApproved === 1 ? <><CheckCircleTwoTone twoToneColor="#52c41a" /> {t('admin.firsttrial.end.7')}</> :
                                                    <><CloseCircleTwoTone twoToneColor="red" />{t('admin.firsttrial.end.8')}</>}
                                            </div></Descriptions.Item>}
                                            {applyInfo.endSummerApproverTime && <Descriptions.Item label={t('admin.firsttrial.end.4')}>{applyInfo.endSummerApproverTime}</Descriptions.Item>}
                                            {applyInfo.endSummerComment && <Descriptions.Item label={t('admin.firsttrial.end.5')}>{applyInfo.endSummerComment}</Descriptions.Item>}
                                           
                                            </Des>
                                            {applyInfo.status == -2 && <Descriptions.Item label={''}><p><span style={{ color: 'red' }}>{t('project.expiredReject')}</span></p></Descriptions.Item>}
                                        </> : <Des />
                                    }
                                    {applyInfo.status === 16 &&
                                        <>
                                            <Divider dashed />
                                            <Des column={2}>
                                                <Descriptions.Item label={''} >
                                                    <Space direction={'vertical'} size={20}>
                                                        <span><a onClick={() => downloadApplication(1, undefined, token, t('admin.firsttrial.pdfname2'))}>
                                                            {t('tutor.downloadpdf')}
                                                        </a>{t('tutor.despdf')}</span>
                                                        <Upload onChange={({ file }) => file.status === 'done' && setCommit(true)} onRemove={() => deleteuploadfile()}
                                                            defaultFileList={applyInfo?.studentAgreement ? [
                                                                {
                                                                    uid: '1',
                                                                    name: applyInfo.studentAgreement ? applyInfo.studentAgreement.split("/").pop() : 'studentAgreement.pdf',
                                                                    status: 'done'
                                                                }
                                                            ] : []} accept={'.pdf'} onPreview={() => null} beforeUpload={file => {
                                                                if (!file.type.includes('/pdf')) {
                                                                    message.error(t('tutor.pdf_upload_mes'));
                                                                }
                                                                return file.type.includes('/pdf') ? true : Upload.LIST_IGNORE
                                                            }} maxCount={1} action={`/uploadPdf/${'studentAgreement'}`}>
                                                            <Button icon={<CloudUploadOutlined />}>{t('tutor.upload')}</Button>
                                                        </Upload>
                                                    </Space>
                                                </Descriptions.Item>
                                            <Descriptions.Item label={''} >
                                                <Space direction='vertical'>
                                                    <Button disabled={!commit} loading={uploadLoading} onClick={() => uploadfile(applyInfo.id)} type={'primary'}>{t('tutor.uploadpdf')}</Button>
                                                    <div style={{ color: 'red' }}>{t('admin.project.agreement_mes')}</div>
                                                    </Space>
                                            </Descriptions.Item>
                                            </Des>
                                        </>
                                    }
                                    {(applyInfo.status === 16 && applyInfo.studentAgreement && !applyInfo.summerMiddleApprovePublicTime)&&
                                        <>
                                            <Divider dashed />
                                            <Des column={2} style={{ minHeight: '2.5rem' }}>
                                                <Descriptions.Item label={''} >
                                                    <a onClick={() => editBank()}><span>{t('admin.firsttrial.bankinfo')}</span></a>
                                                </Descriptions.Item>
                                                <Descriptions.Item label={''} ><a onClick={() => downloadApplication(3, undefined, token, t('admin.firsttrial.pdfname'))}><span>{t('admin.firsttrial.bankpdf')}</span></a></Descriptions.Item>
                                            </Des>
                                        </>
                                    }
                            </>
                        } />
                }
                {
                    applyInfo.status === -2 || applyInfo.status === -1 ? null :
                    <Steps.Step title={<strong>{t('admin.firsttrial.step_title.4')}</strong>} description={
                        <Des column={1}>
                            {applyInfo && applyInfo.status === 16 && <Descriptions.Item label={''}>{t('admin.firsttrial.bonus')}</Descriptions.Item>}
                        </Des>
                    } />
                }
            </NewStep>
            <ComModal destroyOnClose={true} visible={projectModal} close={closeBank} title={t('tutor.editbank_modal')} width={'100rem'} footer={null} children={<Bankinfo close={closeBank} studentId={applyInfo.studentId} />} />
        </div>        
    )
}

const NewStep = styled(Steps)`
    padding:3rem 8rem;
`

const Des = styled(Descriptions)`
    min-height: 8rem;
    margin:2rem 0 ;
`



