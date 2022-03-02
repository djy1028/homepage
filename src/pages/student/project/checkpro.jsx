import React, { useEffect, useState } from 'react'
import { Descriptions, Space, Spin,Input } from 'antd'
import BraftEditor from 'braft-editor'
import { raesDecrypt, useTechSel } from 'utils'
import { useTranslation } from 'react-i18next'
import { useStuProgramModal } from 'utils/project'
import { Approve } from 'components/approve'

export const Checkpro = () =>{
    const {t,i18n} = useTranslation()
    const { proInfo, proInfoLoading } = useStuProgramModal()
    const [Lang,setLang] = useState(1)
    useEffect(()=>{
        if(proInfo){
            setLang(proInfo.supportLanguage)
        }
    },[proInfo])
   
    return (proInfoLoading?<Spin>loading...</Spin>:
        proInfo?
            <Space style={{ width: '100%' }} direction={'vertical'}>
                <Descriptions bordered >
                    <Descriptions.Item label={t(Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? 'admin.project.columns_detail_title.1' : 'admin.project.columns_detail_title_en.1')}>
                        {
                            Lang === 0 && i18n.language !== 'zh' ? proInfo.programNameEN : proInfo.programName
                        }
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label={t(Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? 'admin.project.columns_detail_title.11' : 'admin.project.columns_detail_title_en.11')}>{
                        t(Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? 'admin.project.supportlang' : 'admin.project.supportlang_en', { returnObjects: true })[proInfo.supportLanguage]
                    }</Descriptions.Item>
                    <Descriptions.Item label={t(Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? 'admin.project.columns_detail_title.2' : 'admin.project.columns_detail_title_en.2')} >
                        {proInfo.programCode}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label={t(Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? 'admin.project.columns_detail_title.12' : 'admin.project.columns_detail_title_en.12')}>{
                        (proInfo.teachers && proInfo.teachers.mainTeachers && proInfo.teachers.mainTeachers.length > 0) && (raesDecrypt(proInfo.teachers.mainTeachers[0].userName) + "<" + proInfo.teachers.mainTeachers[0].loginName + ">") 
                    }</Descriptions.Item>
                    <Descriptions.Item span={3} label={t(Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? 'admin.project.columns_detail_title.14' : 'admin.project.columns_detail_title_en.14')}>
                        {proInfo.difficulty}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label={t(Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? 'admin.project.columns_detail_title.15' : 'admin.project.columns_detail_title_en.15')}>
                        {
                            proInfo.techTagName ? proInfo.techTagName : ''
                        }
                        {
                            proInfo.techText ? proInfo.techTagName ? ',' + proInfo.techText : proInfo.techText : ''
                        }
                    </Descriptions.Item>

                    <Descriptions.Item span={3} label={t(Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? 'admin.project.columns_detail_title.16' : 'admin.project.columns_detail_title_en.16')}>
                        {
                            proInfo.areaTagName ? proInfo.areaTagName : ''
                        }
                        {
                            proInfo.areaText ? proInfo.areaTagName ? ',' + proInfo.areaText : proInfo.areaText : ''
                        }
                    </Descriptions.Item>

                    <Descriptions.Item span={3} label={t(Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? 'admin.project.columns_detail_title.17.0' : 'admin.project.columns_detail_title_en.17.0')}>
                        {

                            Lang === 1 || Lang === 2 || (Lang === 0 && i18n.language === 'zh') ?
                                proInfo.outputRequirement && proInfo.outputRequirement.length > 1 && proInfo.outputRequirement.map((item: any, index: number) => <ul key={index} style={{ width: '100%' }}>
                                    {
                                        item &&
                                        <>
                                            {item.title && <h4>{item.title}</h4>}
                                            {
                                                item.children && item.children.length > 0 && item.children?.map((ele: any, ind: number) => <li key={index + item.title}>
                                                    {ele}
                                                </li>)
                                            }
                                        </>
                                    }
                                </ul>
                                )
                                :
                                proInfo.outputRequirementEN && proInfo.outputRequirementEN.length > 1 && proInfo.outputRequirementEN.map((item: any, index: number) => <ul key={index} style={{ width: '100%' }}>
                                    {
                                        item &&
                                        <>
                                            {item.title && <h4>{item.title}</h4>}
                                            {
                                                item.children && item.children.length > 0 && item.children?.map((ele: any, ind: number) => <li key={index + item.title}>
                                                    {ele}
                                                </li>)
                                            }
                                        </>
                                    }
                                </ul>
                                )
                        }
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label={t(Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? 'admin.project.columns_detail_title.17.1' : 'admin.project.columns_detail_title_en.17.1')}>

                        {
                            Lang === 1 || Lang === 2 || (Lang === 0 && i18n.language === 'zh') ?
                                proInfo.techRequirement && proInfo.techRequirement.length > 1 && proInfo.techRequirement.map((item: any, index: number) => <ul key={index} style={{ width: '100%' }}>
                                    {
                                        item &&
                                        <>
                                            {item.title && <h4>{item.title}</h4>}
                                            {
                                                item.children && item.children.length > 0 && item.children?.map((ele: any, ind: number) => <li key={index + item.title}>
                                                    {ele}
                                                </li>)
                                            }
                                        </>
                                    }
                                </ul>
                                )
                                :
                                proInfo.techRequirementEN && proInfo.techRequirementEN.length > 1 && proInfo.techRequirementEN.map((item: any, index: number) => <ul key={index} style={{ width: '100%' }}>
                                    {
                                        item &&
                                        <>
                                            {item.title && <h4>{item.title}</h4>}
                                            {
                                                item.children && item.children.length > 0 && item.children?.map((ele: any, ind: number) => <li key={index + item.title}>
                                                    {ele}
                                                </li>)
                                            }
                                        </>
                                    }
                                </ul>
                                )
                        }
                    </Descriptions.Item>

                    {
                        proInfo.programDesc && <Descriptions.Item span={3} label={t(Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? 'admin.project.columns_detail_title.9' : 'admin.project.columns_detail_title_en.9')}>

                            <BraftEditor
                                language={Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? 'zh' : 'en'}
                                contentStyle={{ width: '100%', height: 'auto' }}
                                controls={[]}
                                value={BraftEditor.createEditorState((typeof (proInfo.programDesc) === 'string' && (Lang === 1 || (Lang === 0 && i18n.language === 'zh'))) ? proInfo.programDesc : proInfo.programDescEN)}
                                readOnly />
                        </Descriptions.Item>
                    }
                    <Descriptions.Item span={3} label={t(Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? 'admin.project.columns_detail_title.10' : 'admin.project.columns_detail_title_en.10')} >
                        <Input.TextArea autoSize bordered={false} readOnly value={Lang === 1 || (Lang === 0 && i18n.language === 'zh') ? proInfo.programRemark : proInfo.programRemarkEN} />
                    </Descriptions.Item>
                </Descriptions>
                <Approve fromProject={true} lang={ Lang } editingObj={proInfo} />
        </Space>:null)
                    
}

