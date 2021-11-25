import React from 'react'
import {Card, Input, Form} from 'antd'
import { useTranslation } from 'react-i18next';

export const Approve = (props) => {
    const {t} = useTranslation()
    const { editingObj,lang,fromProject} = props
    const layout = {
        labelCol: { flex:'wrap',span: 11 },
        wrapperCol: { span: 12 },
    };

    return (
            <Card title={t((!lang || lang === 1) ? `admin.project.check_log` : lang === 2 ? `admin.project.check_log_en` : `admin.project.check_log_mix`)} type={'inner'} bodyStyle={{ textAlign: 'center' }}>
                <Form {...layout}>
                    {
                        fromProject && <Form.Item colon={false} label={<span style={{color:'#a1a1a1'}}>{t((!lang || lang === 1)?`admin.project.orgApprover`: lang ===2?`admin.project.orgApprover_en`:`admin.project.orgApprover_mix`)+"  :"}</span>}>
                                            <Input bordered={false} value={editingObj['orgApprover']}/>
                                        </Form.Item>
                    }
                    {
                        fromProject && <Form.Item colon={false} label={<span style={{color:'#a1a1a1'}}>{t((!lang || lang === 1)?`admin.project.orgApproveTime`: lang ===2?`admin.project.orgApproveTime_en`:`admin.project.orgApproveTime_mix`)+"  :"}</span>}>
                                            <Input bordered={false} value={editingObj['orgApproveTime']}/>
                                        </Form.Item>
                    }
                    {
                        fromProject && <Form.Item colon={false} label={<span style={{color:'#a1a1a1'}}>{t((!lang || lang === 1)?`admin.project.orgComment`: lang ===2?`admin.project.orgComment_en`:`admin.project.orgComment_mix`)+"  :"}</span>}>
                                            <Input.TextArea autoSize bordered={false} value={editingObj['orgComment']}/>
                                        </Form.Item>
                    }
                    <Form.Item colon={false} label={<span style={{color:'#a1a1a1'}}>{t((!lang || lang === 1)?`admin.project.approver`: lang ===2?`admin.project.approver_en`:`admin.project.approver_mix`)+"  :"}</span>}>
                        <Input value={editingObj['approver']} bordered={false}/>
                    </Form.Item>
                    <Form.Item colon={false} label={<span style={{color:'#a1a1a1'}}>{t((!lang || lang === 1)?`admin.project.approveTime`: lang ===2?`admin.project.approveTime_en`:`admin.project.approveTime_mix`)+"  :"}</span>}>
                        <Input bordered={false} value={ editingObj['approveTime'] ?typeof(editingObj['approveTime']) === 'string'?editingObj['approveTime']:editingObj['approveTime'].format('YYYY-MM-DD HH:mm:ss'):''}/>
                    </Form.Item>
                    <Form.Item colon={false} label={<span style={{color:'#a1a1a1'}}>{t((!lang || lang === 1)?`admin.project.isApproved`: lang ===2?`admin.project.isApproved_en`:`admin.project.isApproved_mix`)+"  :"}</span>}>
                        <Input bordered={false} value={ fromProject?
                            (editingObj['isApproved'] === 0?t('admin.origanize.wait_check_org'): editingObj['isApproved'] ===1 ?t('admin.origanize.wait_check_adm'):editingObj['isApproved'] === 2?t('admin.origanize.passed'):editingObj['isApproved'] === -2?t('admin.origanize.reject'):t('admin.origanize.org_reject'))
                            :(editingObj['isApproved'] === -1?t('admin.origanize.rejected'):t('admin.origanize.passed'))}/>
                    </Form.Item>
                    <Form.Item colon={false} label={<span style={{color:'#a1a1a1'}}>{t((!lang || lang === 1)?`admin.project.approvedComment`: lang ===2?`admin.project.approvedComment_en`:`admin.project.approvedComment_mix`)+"  :"}</span>}>
                        <Input.TextArea autoSize bordered={false} value={editingObj['approvedComment']}/>
                    </Form.Item>
                </Form>
            </Card>
    ) 
}
