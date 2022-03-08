import React from 'react'
import {Card, Input, Form} from 'antd'
import { useTranslation } from 'react-i18next';

export const Approve = (props) => {
    const {t,i18n} = useTranslation()
    const { editingObj,lang,fromProject} = props
    const layout = {
        labelCol: { flex:'wrap',span: 11 },
        wrapperCol: { span: 12 },
    };

    return (
            <Card title={t(((lang===0 &&i18n.language==='zh')  || lang === 1) ? `admin.project.check_log` : `admin.project.check_log_en`)} type={'inner'} bodyStyle={{ textAlign: 'center' }}>
                <Form {...layout}>
                    {
                    fromProject && <Form.Item colon={false} label={<span style={{ color: '#a1a1a1' }}>{t(((lang === 0 && i18n.language === 'zh') || lang === 1)?`admin.project.orgApprover`:`admin.project.orgApprover_en`)+"  :"}</span>}>
                                            <Input bordered={false} value={editingObj['orgApprover']}/>
                                        </Form.Item>
                    }
                    {
                    fromProject && <Form.Item colon={false} label={<span style={{ color: '#a1a1a1' }}>{t(((lang === 0 && i18n.language === 'zh') || lang === 1)?`admin.project.orgApproveTime`: `admin.project.orgApproveTime_en`)+"  :"}</span>}>
                                            <Input bordered={false} value={editingObj['orgApproveTime']}/>
                                        </Form.Item>
                    }
                    {
                    fromProject && <Form.Item colon={false} label={<span style={{ color: '#a1a1a1' }}>{t(((lang === 0 && i18n.language === 'zh') || lang === 1)?`admin.project.orgComment`: `admin.project.orgComment_en`)+"  :"}</span>}>
                                            <Input.TextArea autoSize bordered={false} value={editingObj['orgComment']}/>
                                        </Form.Item>
                    }
                <Form.Item colon={false} label={<span style={{ color: '#a1a1a1' }}>{t(((lang === 0 && i18n.language === 'zh') || lang === 1)?`admin.project.approver`:`admin.project.approver_en`)+"  :"}</span>}>
                        <Input value={editingObj['approver']} bordered={false}/>
                    </Form.Item>
                <Form.Item colon={false} label={<span style={{ color: '#a1a1a1' }}>{t(((lang === 0 && i18n.language === 'zh') || lang === 1)?`admin.project.approveTime`: `admin.project.approveTime_en`)+"  :"}</span>}>
                        <Input bordered={false} value={ editingObj['approveTime'] ?typeof(editingObj['approveTime']) === 'string'?editingObj['approveTime']:editingObj['approveTime'].format('YYYY-MM-DD HH:mm:ss'):''}/>
                    </Form.Item>
                <Form.Item colon={false} label={<span style={{ color: '#a1a1a1' }}>{t(((lang === 0 && i18n.language === 'zh') || lang === 1)?`admin.project.isApproved`:`admin.project.isApproved_en`)+"  :"}</span>}>
                        <Input bordered={false} value={ fromProject?
                            (editingObj['isApproved'] === 0?t('admin.origanize.wait_check_org'): editingObj['isApproved'] ===1 ?t('admin.origanize.wait_check_adm'):editingObj['isApproved'] === 2?t('admin.origanize.passed'):editingObj['isApproved'] === -2?t('admin.origanize.reject'):t('admin.origanize.org_reject'))
                            :(editingObj['isApproved'] === -1?t('admin.origanize.rejected'):t('admin.origanize.passed'))}/>
                    </Form.Item>
                <Form.Item colon={false} label={<span style={{ color: '#a1a1a1' }}>{t(((lang === 0 && i18n.language === 'zh') || lang === 1)?`admin.project.approvedComment`: `admin.project.approvedComment_en`)+"  :"}</span>}>
                        <Input.TextArea autoSize bordered={false} value={editingObj['approvedComment']}/>
                    </Form.Item>
                </Form>
            </Card>
    ) 
}
