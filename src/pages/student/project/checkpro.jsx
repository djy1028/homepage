import React, { useEffect, useState } from 'react'
import { Descriptions, Space, Spin } from 'antd'
import BraftEditor from 'braft-editor'
import { raesDecrypt, useFormSel } from 'utils'
import { useTranslation } from 'react-i18next'
import { useStuProgramModal } from 'utils/project'
import { Approve } from 'components/approve'


export const Checkpro = () =>{
    const {t} = useTranslation()
    const { proInfo, proInfoLoading } = useStuProgramModal()
    const [Lang,setLang] = useState(1)
    const optionTech = useFormSel(t('admin.origanize.techarea',{returnObjects: true }),40)
    const optionArea = useFormSel(t('admin.origanize.areasel',{returnObjects: true }),68)
    const diffHeader =  (proInfo && proInfo.supportLanguage === 1)||Lang === 1?'admin.project.diff':
    (proInfo && proInfo.supportLanguage === 2)||Lang === 2?'admin.project.diff_en':'admin.project.diffmix'

    useEffect(()=>{
        if(proInfo){
            setLang(proInfo.supportLanguage)
        }
    },[proInfo])
   
    return (proInfoLoading?<Spin>loading...</Spin>:
        proInfo?
        <Space style={{width:'100%'}} direction={'vertical'}><Descriptions bordered  >
                    <Descriptions.Item  label={t(Lang === 1 || Lang === 0?'admin.project.columns_detail_title.1':'admin.project.columns_detail_title_en.1')}>
                        {
                            Lang !== 0?proInfo.programName: proInfo.programName && proInfo.programName.split('【')[1] ? proInfo.programName.split('【')[1].substr(0,proInfo.programName.split('【')[1].length-1):''
                        }
                    </Descriptions.Item>
                    {
                        Lang === 0 &&   <Descriptions.Item  label={t('admin.project.columns_detail_title_en.1')}>
                                            {
                                                proInfo.programName?proInfo.programName.split('【')[0]:''
                                            }
                                        </Descriptions.Item>
                    }
                    <Descriptions.Item span={2} label={t(Lang === 1?'admin.project.columns_detail_title.11':Lang === 2?'admin.project.columns_detail_title_en.11':'admin.project.columns_detail_title_mix.11')}>{
                        t(Lang === 1?'admin.project.supportlang':Lang === 2?'admin.project.supportlang_en':'admin.project.supportlang_mix',{returnObjects:true})[proInfo.supportLanguage]
                    }</Descriptions.Item>
                    <Descriptions.Item label={t(Lang === 1?'admin.project.columns_detail_title.2': Lang === 2?'admin.project.columns_detail_title_en.2':'admin.project.columns_detail_title_mix.2')} >
                        {proInfo.programCode}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label={t(Lang === 1?'admin.project.columns_detail_title.12':Lang === 2?'admin.project.columns_detail_title_en.12':'admin.project.columns_detail_title_mix.12')}>{
                    proInfo.teachers && proInfo.teachers.mainTeachers && proInfo.teachers.mainTeachers.length > 0 && raesDecrypt(proInfo.teachers.mainTeachers[0].userName) + "<" + proInfo.teachers.mainTeachers[0].email + ">"
                    }</Descriptions.Item>
                     <Descriptions.Item label={t(Lang === 1?'admin.project.columns_detail_title.14':Lang === 2?'admin.project.columns_detail_title_en.14':'admin.project.columns_detail_title_mix.14')}>
                        {t(`${diffHeader}`,{returnObjects: true })[proInfo.difficulty]}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label={t(Lang === 1?'admin.project.columns_detail_title.13':Lang === 2?'admin.project.columns_detail_title_en.13':'admin.project.columns_detail_title_mix.13')}>
                    {proInfo.teachers && proInfo.teachers.unionTeachers && proInfo.teachers.unionTeachers.length > 0 && proInfo.teachers.unionTeachers?.map((item) => <span key={item.loginName}>{raesDecrypt(item.userName) + "<" + item.loginName + ">"+"  "}</span>)}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label={t(Lang === 1?'admin.project.columns_detail_title.15':Lang === 2?'admin.project.columns_detail_title_en.15':'admin.project.columns_detail_title_mix.15')}>
                        {
                            optionTech.filter((item)=>proInfo.techTag?.includes(item.id)).map(ele=><span key={ele.id}>{ele.name} </span>)
                        }
                        {
                            proInfo.techText?proInfo.techText:''
                        }
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label={t(Lang === 1?'admin.project.columns_detail_title.16':Lang === 2?'admin.project.columns_detail_title_en.16':'admin.project.columns_detail_title_mix.16')}>
                        {
                            optionArea.filter((item)=>proInfo.areaTag?.includes(item.id)).map(ele=><span key={ele.id}>{ele.name} </span>)
                        }
                        {
                            proInfo.areaText?proInfo.areaText:''
                        }
                    </Descriptions.Item>

                    <Descriptions.Item span={3} label={ t(Lang === 1?'admin.project.columns_detail_title.17.0':Lang === 2?'admin.project.columns_detail_title_en.17.0':'admin.project.columns_detail_title_mix.17.0')}>
                    {
                            [1,2,3,4,5,6,7,8].map((item,index)=> proInfo[`outputRequirement${index+1}`] && <ul key={index} style={{width:'100%'}}>
                                    {
                                         proInfo[`outputRequirement${index+1}`].includes('title')?
                                      
                                            <>
                                                <h4>{(index+1) + '. ' + JSON.parse(proInfo[`outputRequirement${index+1}`])?.title?JSON.parse(proInfo[`outputRequirement${index+1}`]).title:proInfo[`outputRequirement${index+1}`]}</h4>
                                                {
                                                proInfo[`outputRequirement${index+1}`] && JSON.parse(proInfo[`outputRequirement${index+1}`]).children?.map((ele:any,ind:number)=><li>
                                                        {ele}
                                                    </li>)
                                                }
                                            </>:
                                            proInfo[`outputRequirement${index+1}`]

                                    } 
                                    </ul>
                            )
                        }
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label={ t(Lang === 1?'admin.project.columns_detail_title.17.1':Lang === 2?'admin.project.columns_detail_title_en.17.1':'admin.project.columns_detail_title_mix.17.1')}>
                        {
                            [1,2,3,4,5,6,7,8].map((item,index)=> proInfo[`techRequirement${index+1}`] && <ul key={item+index} style={{width:'100%'}}>
                                    {
                                         proInfo[`techRequirement${index+1}`].includes('title')?
                                            <>
                                            <h4>{(index+1) + '. ' + JSON.parse(proInfo[`techRequirement${index+1}`]).title?JSON.parse(proInfo[`techRequirement${index+1}`]).title:proInfo[`techRequirement${index+1}`]}</h4>
                                                {
                                                    JSON.parse(proInfo[`techRequirement${index+1}`]).children?.map((ele,ind)=><li key={ele}>
                                                        {ele}
                                                    </li>)
                                                }
                                          
                                            </>:proInfo[`techRequirement${index+1}`]
                                    }   
                                    </ul>
                            
                            )
                        }
                    </Descriptions.Item>

                    {
                        proInfo.programDesc && <Descriptions.Item  span={3} label={t(Lang === 1 || Lang === 0?'admin.project.columns_detail_title.9':'admin.project.columns_detail_title_en.9')}>
                            
                                <BraftEditor 
                                language={Lang ===2?'en':'zh'}
                                contentStyle={{ width: '100%', height: 'auto',overflow:'auto' }}
                                controls={[]} value = {BraftEditor.createEditorState(Lang !== 0?proInfo.programDesc:typeof(proInfo.programDescmix) === 'string' && proInfo.programDesc.split('【')[1]? proInfo.programDesc.split('【')[1].substr(0,proInfo.programDesc.split('【')[1].length-1):'')}  
                                readOnly/>
                        </Descriptions.Item>
                    }
                    {
                        (Lang === 0 && proInfo.programDesc)  && <Descriptions.Item span={3} label={t('admin.project.columns_detail_title_en.9')}>
                            
                                <BraftEditor
                                language={'en'}
                                contentStyle={{ width: '100%', height: 'auto' }}
                                controls={[]} value = {BraftEditor.createEditorState(proInfo.programDesc && typeof(proInfo.programDescmix) === 'string'?proInfo.programDesc.split('【')[0]:'')}  readOnly/>
                            
                        </Descriptions.Item>
                    }

                    <Descriptions.Item span={3} label={t(Lang === 1 || Lang === 0?'admin.project.columns_detail_title.10':'admin.project.columns_detail_title_en.10')} >
                       {
                           Lang !==0?proInfo.programRemark:proInfo.programRemark && proInfo.programRemark.split('【')[1] ? proInfo.programRemark.split('【')[1].substr(0,proInfo.programRemark.split('【')[1].length-1):''
                       }
                    </Descriptions.Item>

                    {Lang ===0 &&<Descriptions.Item span={3} label={t('admin.project.columns_detail_title_en.10')}>
                      {
                          proInfo.programRemark?proInfo.programRemark.split('【')[0]:''
                      }
                    </Descriptions.Item>}
            </Descriptions>
                <Approve fromProject={true} lang={ Lang } editingObj={proInfo} />
        </Space>:null)
                    
}

