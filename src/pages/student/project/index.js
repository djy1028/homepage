import { Button, Popconfirm, Space,Input } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import { ComModal } from 'components/com-modal'
import { ComTable } from 'components/com-table'
import { Main } from 'components/main'
import { SearchContainer } from 'components/search-container'
import React from 'react'
import { useDebounce } from 'utils'
// import { Detail as ActivityDetail } from 'authenticated-app/pages/admin/activity/detail'
import { useDeleteProgram, useStuPrograms, useStuProSearchParms, useStuProgramModal, useStuProQueryKey  } from 'utils/project'
import styled from '@emotion/styled'
// import { useActivityModal } from 'utils/organization/activelist'
// import { useMentorModal } from 'utils/organization/mentor'
// import { Check } from 'authenticated-app/pages/org/program/check'
// import { Alink, EditTable } from 'authenticated-app/pages/admin/activity'
// import { PlusOutlined } from '@ant-design/icons'
// import { Program } from 'authenticated-app/pages/org/activelist/program'
// import { Applicant } from 'authenticated-app/pages/org/program/applicant'
// import { ComDrawer } from 'components/com-drawer'
import { useTranslation } from 'react-i18next'
import { clearSpace } from 'utils/pattern'
import { Check } from './check'
import { Checkpro } from './checkpro'

export const Project = () => {
    const { t } = useTranslation()
    const [searchparam, setParam] = useStuProSearchParms()
    const { isLoading, data: list } = useStuPrograms(useDebounce(searchparam, 500))
    const { inquiryOrg, projectModalOpen, close, inquiryOrgId,inquiryPro } = useStuProgramModal()
    // const inquiryApplicant = (id: number, status: number, stuactiveId: number) => InquiryApplicant(id, status, stuactiveId, searchparam)
    const { mutateAsync: deleteProgram, isLoading: deleteLoading } = useDeleteProgram(useStuProQueryKey())
    const colums = [
        {
            title: t('project.columns_title.0'),
            dataIndex: 'programName',

            render: (value, record) => <a style={{ color: '#0d86ff'}} onClick={() => inquiryPro(record.orgProgramId)}>{value}</a>
        },
        {
            title: t('project.columns_title.1'),
            dataIndex: 'activityName',
            // render: (value, record) => <a onClick={() => inquiryActivity(record.activityId)}>{value}</a>
        },
        {
            title: t('project.columns_title.2'),
            dataIndex: 'orgName',
            render: (value, record) => <a style={{ color: '#0d86ff' }} onClick={() => inquiryOrg(record.orgId)}>{value}</a>
        },
        {
            title: t('project.columns_title.3'),
            dataIndex: 'status',
            render: (value) => value === 0 ? <span style={{ color: '#fe0000' }}>{t('tutor.noapply')}</span> : value ? <span style={{ color: '#fe0000' }}> {t(`project.status.${value}`)}</span> : ''
        },
        {
            title: t('project.columns_title.4'),
            dataIndex: 'teacherPriority',
            width:'12rem'
        },
       
        {
            title: t('project.columns_title.5'),
            dataIndex: 'createTime'
        },
        {
            title: t('project.columns_title.6'),
            render: (value, record) => <Space size={4}>
                <Acheck >{t('project.check')}</Acheck>
                <Popconfirm placement={ 'topLeft'} title={t('project.delcomfirm')} onConfirm={() => deleteProgram({ orgProgramId: record.orgProgramId }).then(() => close())}
                    onVisibleChange={(vis) => !vis}>
                    <Alink>{t('project.delete')}</Alink>
                </Popconfirm>
            </Space>
        }
    ]

    return (
        <Main>
            <SearchContainer name={'btn_tutor_program'}>
                <FormItem label={t('project.columns_title.1')}>
                    <Input placeholder={t('project.name_placeholder')} allowClear value={searchparam.activityName}
                        onChange={e => setParam({ ...searchparam, activityName: clearSpace(e.target.value), pageNum: undefined, pageSize: undefined })} />
                </FormItem>
            </SearchContainer>
            <ComTable loading={isLoading || deleteLoading} dataSource={list?.rows} columns={colums} rowSelection={undefined}
                list={list} setParam={setParam} searchparam={searchparam} />
            <ComModal visible={projectModalOpen} close={close} title={t(inquiryOrgId ? 'project.orgdetail' : 'project.prodetail')} width={'120rem'} footer={null}
                children={inquiryOrgId?<Check />:<Checkpro/>} />
            {/* {(activeDrawerOpen || Boolean(myProgramId) || DrawerOpen) && <ComDrawer close={Boolean(myProgramId) ? closeStu : DrawerOpen ? close2 : close} visible={activeDrawerOpen || Boolean(myProgramId) || DrawerOpen} child={Boolean(myProgramId) ? <Applicant /> : <Program />} title={t(Boolean(myProgramId) ? 'tutor.findapp' : 'tutor.publishpro')} />} */}
        </Main>
    )
}

export const Alink = styled.a`
    border: solid 1px #0d86ff;
    color:#0d86ff;
    border-radius: 4px;
    padding: 2px 4px;
    height: 2.4rem;
`
const Acheck = styled.span`
    color:#fff;
    border-radius: 4px;
    padding: 3px;
    height: 2.4rem;
    background-color: #0d86ff;
    &:hover{
        cursor: pointer;
    }

`


