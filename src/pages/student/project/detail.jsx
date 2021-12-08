import styled from '@emotion/styled';
import React from 'react'
import { Button, Descriptions, Divider, message, Space, Spin, Steps, Upload } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, CloudUploadOutlined, DownloadOutlined, ExclamationCircleOutlined}  from '@ant-design/icons'
import { downloadApplication, downloadTemplate, getToken } from 'auth-provider';
import { openNotificationWithIcon } from 'components/com-notify';
import { useTranslation } from 'react-i18next';
import { useBankModal, useStuProgramModal, useStuProQueryKey } from 'utils/project';
import { useStuproupload, useStuprozipupload } from 'utils/student';
import { Bankinfo } from './bankinfo';
import { ComModal } from 'components/com-modal';

export const Detail = ()=>{
    const {t} = useTranslation()
    const token = getToken()
    const { applyInfo, applyInfoLoading, isFetching } = useStuProgramModal()
    const { close } = useStuProgramModal()
    const { projectModal, editBank,closeBank } = useBankModal()
    const { mutateAsync, isLoading: uploadLoading } = useStuproupload(useStuProQueryKey())
    const { mutateAsync: mutateAsynczip,isLoading: uploadzipLoading } = useStuprozipupload(useStuProQueryKey())
    const uploadfile = ()=>{
        mutateAsync({id:applyInfo.id}).then(res=>{
            res.code === 200? openNotificationWithIcon(0,res.message):openNotificationWithIcon(1,res.message)
        })
    }
    const uploadzip = (phase) => {
        mutateAsynczip({ id: applyInfo.id,phase:phase }).then(res => {
            if (res.code === 200) {
                openNotificationWithIcon(0, res.message)
                close()
            }
            else {
                openNotificationWithIcon(1, res.message)
            }
        })
    }
    const deleteuploadfile = ()=>{
        mutateAsync({id:-1}).then(res=>{
            res.code === 200? openNotificationWithIcon(0,res.message):openNotificationWithIcon(1,res.message)
        })
    }
    const deleteuploadzip = (phase) => {
        mutateAsynczip({ id: -1,phase }).then(res => {
            res.code === 200 ? openNotificationWithIcon(0, res.message) : openNotificationWithIcon(1, res.message)
        })
    }
    return (
        !applyInfo || isFetching || applyInfoLoading ? <Spin>loading</Spin> :
        <>
        <NewStep direction={'vertical'} 
            current={applyInfo && applyInfo.status<=6 && applyInfo.status !== 5?0: 
                applyInfo && applyInfo.status<11?1:
       
                applyInfo && applyInfo.status<=15?2:3}>
            <Steps.Step title={<strong>{t('admin.firsttrial.step_title.0')}</strong>} description={
                <>
                    <Des column={2}>
                        {applyInfo && applyInfo.status === 0 &&
                            <>
                                <Descriptions.Item label={''} >
                                    <Space direction={'vertical'} size={10}>
                                        <a onClick={() => downloadTemplate(token,t('project.moban'))}>
                                            <DownloadOutlined /> {t('project.application_model')}
                                        </a>
                                        <p style={{color:'red'}}>{t('project.upload_btn_mes')}</p>
                                            <Button loading={uploadzipLoading} onClick={() => uploadzip('apply')} type={'primary'}>{t('project.upload_btn')}</Button>
                                    </Space>
                                </Descriptions.Item>
                                    <Descriptions.Item label={''} >
                                        <Space direction={'vertical'}>
                                            <p><ExclamationCircleOutlined />  <span style={{ color:'#a7a5a5'}}>{ t('project.upload_mes')}</span></p>
                                            <Upload onRemove={() => deleteuploadzip('apply')} defaultFileList={applyInfo?.teacherAgreement ? [
                                                {
                                                    uid: '1',
                                                    name: applyInfo?.teacherAgreement,
                                                    status: 'done'
                                                }
                                            ] : []} accept={'.zip'} onPreview={() => null} beforeUpload={file => {
                                                if (!file.type.includes('zip')) {
                                                    message.error(t('project.zip_upload_mes'));
                                                }
                                                return file.type.includes('zip') ? true : Upload.LIST_IGNORE
                                            }} maxCount={1} action={`/uploadZIP/${'studentApplication'}`}>
                                                <Button icon={<CloudUploadOutlined />}>{t('tutor.upload')}</Button>
                                            </Upload>
                                        </Space>
                                
                                </Descriptions.Item>
                            </>
                        }
                        {applyInfo.applicationUrl && <Descriptions.Item label={t('admin.firsttrial.first.5')} >
                            <a  onClick={()=>downloadApplication(applyInfo.id,'application',token,applyInfo.applicationUrl.split('/').pop())}>{applyInfo.applicationUrl.split('/').pop()}
                            </a>
                        </Descriptions.Item>}
                        {applyInfo.status >= 3 && <Descriptions.Item label={''} ><div id={'mid.first_teacher_approve'} style={{ color: '#52c41a' }}> <CheckCircleTwoTone twoToneColor="#52c41a" /> {t('admin.firsttrial.first_teacher_approve')}</div></Descriptions.Item>}
                        {applyInfo.firstTeacherApprover && <Descriptions.Item label={t('admin.firsttrial.first.0')}>{applyInfo.firstTeacherApprover}</Descriptions.Item>}
                        {applyInfo.firstTeacherApproverTime && <Descriptions.Item label={t('admin.firsttrial.first.1')}>{applyInfo.firstTeacherApproverTime}</Descriptions.Item>}
                        {(applyInfo && applyInfo.status === 5 ||applyInfo && applyInfo.status>=7) &&<Descriptions.Item label={''} ><a href={t('admin.firsttrial.giturl')} target="_blank"><span>{t('admin.firsttrial.gitword')}</span></a></Descriptions.Item>}
                    </Des>
                    {applyInfo.status>4 && 
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
                            </Des>
                        </>
                    }
                    {applyInfo && applyInfo.status >= 11 &&
                        <>
                            <Divider dashed />
                            <Des column={2} style={{minHeight:'2.5rem'} }>
                                <Descriptions.Item label={''} >
                                <a onClick={ ()=>editBank() }><span>{t('admin.firsttrial.bankinfo')}</span></a>
                                </Descriptions.Item>
                                <Descriptions.Item label={''} ><a onClick={() => downloadApplication(3, undefined, token, t('admin.firsttrial.pdfname'))}><span>{t('admin.firsttrial.bankpdf')}</span></a></Descriptions.Item>
                            </Des>
                        </>
                    }
                    {applyInfo && applyInfo.status >= 13 &&
                        <>
                            <Divider dashed />
                            <Des column={2}>
                                <Descriptions.Item label={''} >
                                    <Space direction={'vertical'} size={20}>
                                    <span><a  onClick={()=>downloadApplication(1,undefined,token,t('admin.firsttrial.pdfname2'))}>
                                        {t('tutor.downloadpdf')}
                                    </a>{t('tutor.despdf')}</span>
                                        <Button loading={uploadLoading} onClick={()=>uploadfile(applyInfo.id)} type={'primary'}>{t('tutor.uploadpdf')}</Button>
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label={''} >
                                    <Upload onRemove={()=>deleteuploadfile()} defaultFileList={applyInfo?.teacherAgreement?[
                                        {
                                            uid: '1',
                                            name: applyInfo?.teacherAgreement,
                                            status: 'done'
                                        }
                                    ]:[]}  accept={'.pdf'} onPreview={()=>null} beforeUpload={file => {
                                                if (!file.type.includes('/pdf')) {
                                                    message.error(t('tutor.pdf_upload_mes'));
                                                }
                                                return file.type.includes('/pdf') ? true : Upload.LIST_IGNORE}} maxCount={1} action={`/uploadPdf/${'studentAgreement'}`}>
                                        <Button  icon={<CloudUploadOutlined />}>{t('tutor.upload')}</Button>
                                    </Upload>
                                </Descriptions.Item>
                            </Des>
                        </>
                    }
                </>
            } />
            <Steps.Step title={<strong>{t('admin.firsttrial.step_title.1')}</strong>} description={
                <>{
                    applyInfo && applyInfo.status === 5 &&
                    <Des column={2}>
                        <Descriptions.Item label={''} >
                            <Space direction={'vertical'} size={10}>
                                <a onClick={() => downloadApplication(4,undefined,token, t('project.rarmoban'))}>
                                    <DownloadOutlined /> {t('project.mid_model')}
                                </a>
                                <Button loading={uploadzipLoading} onClick={() => uploadzip('mid')} type={'primary'}>{t('project.upload_btn')}</Button>
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label={''} >
                            <Space direction={'vertical'}>
                                <Upload onRemove={() => deleteuploadzip('mid')} defaultFileList={applyInfo?.teacherAgreement ? [
                                    {
                                        uid: '1',
                                        name: applyInfo?.teacherAgreement,
                                        status: 'done'
                                    }
                                        ] : []} onPreview={() => null} accept={'.zip'} onPreview={() => null} beforeUpload={file => {
                                            if (!file.type.includes('zip')) {
                                                message.error(t('project.zip_upload_mes'));
                                            }
                                            return file.type.includes('zip') ? true : Upload.LIST_IGNORE
                                        }} maxCount={1} action={`/uploadReport/${'studentReportMid'}`}>
                                    <Button icon={<CloudUploadOutlined />}>{t('tutor.upload')}</Button>
                                </Upload>
                            </Space>

                        </Descriptions.Item>
                    </Des>}
            
                {applyInfo && applyInfo.status >= 7 ?
                    <>
                        <Des column={2}>
                            {applyInfo.middleApplicationUrl && <Descriptions.Item label={t('admin.firsttrial.mid.6')} ><a onClick={() => downloadApplication(applyInfo.id, 'mid', token, applyInfo.middleApplicationUrl.split('/').pop())}>{applyInfo.middleApplicationUrl.split('/').pop()}</a></Descriptions.Item>}
                            {applyInfo.teacherMiddleApproveExpiredTime && <Descriptions.Item label={t('tutor.midenddate')}>{applyInfo.teacherMiddleApproveExpiredTime}</Descriptions.Item>}
                            {applyInfo.middleTeacherIsApproved && <Descriptions.Item label={''} ><div id={'mid.middleTeacherIsApproved'} style={{ color: applyInfo.middleTeacherIsApproved === 1 ? '#52c41a' : 'red' }}>
                                {
                                    applyInfo.middleTeacherIsApproved === 1 ?
                                        <><CheckCircleTwoTone twoToneColor="#52c41a" /> {t('admin.firsttrial.mid_teacher_approve')}</> :
                                        <><CloseCircleTwoTone twoToneColor="red" /> {t('admin.firsttrial.mid_teacher_reject')}</>
                                }
                            </div></Descriptions.Item>}
                            {applyInfo.middleTeacherApprover && <Descriptions.Item label={t('admin.firsttrial.mid.0')}>{applyInfo.middleTeacherApprover}</Descriptions.Item>}
                            {applyInfo.middleTeacherApproverTime && <Descriptions.Item label={t('admin.firsttrial.mid.1')}>{applyInfo.middleTeacherApproverTime}</Descriptions.Item>}
                            {applyInfo.middleTeacherComment && <Descriptions.Item label={t('admin.firsttrial.mid.2')}>{applyInfo.middleTeacherComment}</Descriptions.Item>}
                        </Des>
                        <Divider dashed />
                        <Des column={2}>
                            {applyInfo.middleSummerApprover && <Descriptions.Item label={t('admin.firsttrial.mid.3')}>{applyInfo.middleSummerApprover}</Descriptions.Item>}
                            {applyInfo.middleSummerIsApproved && <Descriptions.Item label={''}><div id={'mid.middleSummerIsApproved'} style={{ color: applyInfo.middleSummerIsApproved === 1 ? '#52c41a' : 'red' }}>
                                {applyInfo.middleSummerIsApproved === 1 ? <><CheckCircleTwoTone twoToneColor="#52c41a" /> {t('admin.firsttrial.mid.7')}</> :
                                    <><CloseCircleTwoTone twoToneColor="red" />{t('admin.firsttrial.mid.8')}</>}
                            </div></Descriptions.Item>}
                            {applyInfo.middleSummerApproverTime && <Descriptions.Item label={t('admin.firsttrial.mid.4')}>{applyInfo.middleSummerApproverTime}</Descriptions.Item>}
                            {applyInfo.middleSummerComment && <Descriptions.Item label={t('admin.firsttrial.mid.5')}>{applyInfo.middleSummerComment}</Descriptions.Item>}
                        </Des>
                    </> : <Des />
                }</>
            } />
            <Steps.Step title={<strong>{t('admin.firsttrial.step_title.3')}</strong>} description={
                <>{
                    applyInfo && applyInfo.status === 11 &&
                    <Des column={2}>
                        <Descriptions.Item label={''} >
                            <Space direction={'vertical'} size={10}>
                                <a onClick={() => downloadApplication(4,undefined,token, t('project.rarmoban'))}>
                                    <DownloadOutlined /> {t('project.mid_model')}
                                </a>
                                <Button loading={uploadzipLoading} onClick={() => uploadzip('end')} type={'primary'}>{t('project.upload_btn')}</Button>
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label={''} >
                            <Space direction={'vertical'}>
                                <Upload onRemove={() => deleteuploadzip('end')} defaultFileList={applyInfo?.teacherAgreement ? [
                                    {
                                        uid: '1',
                                        name: applyInfo?.teacherAgreement,
                                        status: 'done'
                                    }
                                        ] : []} onPreview={() => null} accept={'.zip'} onPreview={() => null} beforeUpload={file => {
                                            if (!file.type.includes('zip')) {
                                                message.error(t('project.zip_upload_mes'));
                                            }
                                            return file.type.includes('zip') ? true : Upload.LIST_IGNORE
                                        }} maxCount={1} action={`/uploadReport/${'studentReportEnd'}`}>
                                    <Button icon={<CloudUploadOutlined />}>{t('tutor.upload')}</Button>
                                </Upload>
                            </Space>

                        </Descriptions.Item>
                    </Des>}
                 {applyInfo && applyInfo.status>=12 ?
                 <>
                     <Des column={2}>
                         {applyInfo.endApplicationUrl && <Descriptions.Item label={t('admin.firsttrial.end.6')} ><a  onClick={()=>downloadApplication(applyInfo.id,'end',token,applyInfo.endApplicationUrl.split('/').pop())}>{applyInfo.endApplicationUrl.split('/').pop()}</a></Descriptions.Item>}
                         {applyInfo.teacherEndApproveExpiredTime && <Descriptions.Item label={t('tutor.finalenddate')}>{applyInfo.teacherEndApproveExpiredTime}</Descriptions.Item>}
                         {applyInfo.endTeacherIsApproved &&<Descriptions.Item label={''} ><div id={'mid.endTeacherIsApproved'} style={{color:applyInfo.endTeacherIsApproved ===1?'#52c41a':'red'}}> 
                             {
                                applyInfo.endTeacherIsApproved ===1 ?
                                    <><CheckCircleTwoTone twoToneColor="#52c41a" /> {t('admin.firsttrial.end_teacher_approve')}</>:
                                    <><CloseCircleTwoTone twoToneColor="red" /> {t('admin.firsttrial.end_teacher_reject')}</>
                             }
                             </div></Descriptions.Item>}
                         {applyInfo.endTeacherApprover && <Descriptions.Item label={t('admin.firsttrial.end.0')}>{applyInfo.endTeacherApprover}</Descriptions.Item>}
                         {applyInfo.endTeacherApproverTime && <Descriptions.Item label={t('admin.firsttrial.end.1')}>{applyInfo.endTeacherApproverTime}</Descriptions.Item>}
                         {applyInfo.endTeacherComment && <Descriptions.Item label={t('admin.firsttrial.end.2')}>{applyInfo.endTeacherComment}</Descriptions.Item>}
                     </Des>
                     {applyInfo.endSummerApprover && <Divider dashed />}
                     <Des column={2}>
                         {applyInfo.endSummerApprover && <Descriptions.Item label={t('admin.firsttrial.end.3')}>{applyInfo.endSummerApprover}</Descriptions.Item>}
                         {applyInfo.endSummerIsApproved && <Descriptions.Item label={''}><div id={'mid.endSummerIsApproved'} style={{color:applyInfo.endSummerIsApproved ===1?'#52c41a':'red'}}>
                             {applyInfo.endSummerIsApproved ===1? <><CheckCircleTwoTone twoToneColor="#52c41a" /> {t('admin.firsttrial.end.7')}</>:
                             <><CloseCircleTwoTone twoToneColor="red" />{t('admin.firsttrial.end.8')}</>}
                             </div></Descriptions.Item>}
                         {applyInfo.endSummerApproverTime && <Descriptions.Item label={t('admin.firsttrial.end.4')}>{applyInfo.endSummerApproverTime}</Descriptions.Item>}
                         {applyInfo.endSummerComment && <Descriptions.Item label={t('admin.firsttrial.end.5')}>{applyInfo.endSummerComment}</Descriptions.Item>}
                     </Des>
                 </>:<Des />}
                 </>
            }/>
            <Steps.Step title={<strong>{t('admin.firsttrial.step_title.4')}</strong>} description={
                <Des column={1}>
                    {applyInfo && applyInfo.status ===16 && <Descriptions.Item label={''}>{t('admin.firsttrial.bonus')}</Descriptions.Item>}
                </Des>
            }/>
            </NewStep>
                <ComModal destroyOnClose={true} visible={projectModal} close={closeBank} title={t('tutor.editbank_modal')} width={'100rem'} footer={null} children={<Bankinfo close={closeBank} studentId={applyInfo.studentId} />} />
        </>        
    )
}

const NewStep = styled(Steps)`
    padding:3rem 8rem;
`

const Des = styled(Descriptions)`
    min-height: 8rem;
    margin:2rem 0 ;
`



