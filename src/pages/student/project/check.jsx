import { Card, Descriptions, Image, Input, Result, Space, Spin,Form } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useStuProgramModal } from 'utils/project'
export const Check = () =>{
    const {t} = useTranslation()
    const { orgInfo,orgInfoLoading } = useStuProgramModal()
    const layout = {
        labelCol: { flex:'wrap',span: 11 },
        wrapperCol: { span: 12 },
    }
    const data = ['orgName','orgCode','orgType','orgWebsite','orgLogo',
                    'developerEmailList','publicPhone','publicEmail','areaTagName','techTagName','orgProfile','orgIntroduction']
    return orgInfoLoading?<Spin>loading</Spin>:
            <div id={'infomation.check'}>
                <Space direction="vertical"  style={{width:'100%'}}>
                    <Descriptions bordered >
                        {
                            orgInfo && data.map((item,index)=> 
                                <Descriptions.Item span={item === 'orgProfile' || item === 'orgIntroduction' || item === 'techTagName'?3:1} key={index} label={t(`admin.origanize.detail_title_check.${index}`)}>
                                {  
                                    item === 'orgType'?t(`admin.origanize.namesel.${orgInfo[item]-1}`) :
                                    item === 'areaTagName' && orgInfo['areaText']?orgInfo['areaTagName']?orgInfo['areaTagName']+', '+orgInfo['areaText']:orgInfo['areaText']:
                                    item === 'areaTagName' && !orgInfo['areaText']?orgInfo['areaTagName']:
                                    item === 'techTagName' && orgInfo['techText']?orgInfo['techTagName']?orgInfo['techTagName']+', '+orgInfo['techText']:orgInfo['techText']:
                                    item === 'techTagName' && !orgInfo['techText']?orgInfo['techTagName']:
                                    item==='orgLogo'?
                                    <Image  width={'6rem'} height={'3rem'} src={orgInfo['orgLogo'][0].url} alt={''}/>:
                                    (item==='orgProfile'||item ==='orgIntroduction')?<Input.TextArea readOnly bordered={false} value={orgInfo[item]}/>:
                                    orgInfo[item]
                                }
                            </Descriptions.Item>)
                        }    
                    </Descriptions>
                    {orgInfo && <Card title={t(`project.info.check_status`)} type={'inner'}  bodyStyle={{textAlign:'center'}}>
                        {orgInfo['isApproved'] !==0?
                        <Form {...layout}>
                            <Form.Item colon={false} label={<span style={{color:'#a1a1a1'}}>{t(`admin.origanize.approver`)+"  :"}</span>}>
                                <Input value={orgInfo['approver']} bordered={false}/>
                            </Form.Item>
                            {orgInfo['approveTime'] && <Form.Item colon={false} label={<span style={{color:'#a1a1a1'}}>{t(`admin.origanize.approveTime`)+"  :"}</span>}>
                                <Input bordered={false} value={ orgInfo['approveTime'] ?typeof(orgInfo['approveTime']) === 'string'?orgInfo['approveTime']:orgInfo['approveTime'].format('YYYY-MM-DD HH:mm:ss'):''}/>
                            </Form.Item>}
                            <Form.Item colon={false} label={<span style={{color:'#a1a1a1'}}>{t(`admin.origanize.isApproved`)+"  :"}</span>}>
                                <Input bordered={false} value={ orgInfo['isApproved'] === -1?t('admin.origanize.rejected'):t('admin.origanize.passed')}/>
                            </Form.Item>
                            <Form.Item colon={false} label={<span style={{color:'#a1a1a1'}}>{t(`admin.origanize.approvedComment`)+"  :"}</span>}>
                                <Input bordered={false} value={orgInfo['approvedComment']}/>
                            </Form.Item>
                        </Form>
                        :
                        <Result
                            icon={<img src={process.env.PUBLIC_URL+"/approving.png"} width="80rem" style={{position:'absolute',left:'15%'}} alt='' />}
                            title={t('project.info.readyapprove')}
                            subTitle={t('project.info.readyapprove_sub')}
                        />
                        }
                    </Card>}
                </Space>
            </div>
}
