import { Popconfirm, Space, Input, Tooltip } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import { ComModal } from 'components/com-modal'
import { ComTable } from 'components/com-table'
import { Main } from 'components/main'
import { SearchContainer } from 'components/search-container'
import React from 'react'
import { useDebounce } from 'utils'
import { useDeleteProgram, useStuPrograms, useStuProSearchParms, useStuProgramModal, useStuProQueryKey } from 'utils/project'
import styled from '@emotion/styled'
import { ComDrawer } from 'components/com-drawer'
import { useTranslation } from 'react-i18next'
import { clearSpace } from 'utils/pattern'
import { Check } from './check'
import { Checkpro } from './checkpro'
import { Detail as ActivityDetail } from './activitydetail'
import { Detail } from './detail'

export const Project = () => {
    const { t } = useTranslation()
    const [searchparam, setParam] = useStuProSearchParms()
    const { isLoading, data: list } = useStuPrograms(useDebounce(searchparam, 500))
    const { inquiryOrg, projectModalOpen, close, inquiryOrgId, inquiryPro, inquiryApply, DrawerOpen, inquiryActivity, inquiryActivityId } = useStuProgramModal()
    const { mutateAsync: deleteProgram, isLoading: deleteLoading } = useDeleteProgram(useStuProQueryKey())
    const colums = [
        {
            title: t('project.columns_title.0'),
            dataIndex: 'programName',
            ellipsis: {
                showTitle: false,
            },
            render: (value, record) => <Tooltip overlayStyle={{ maxWidth: '50rem' }} placement="topLeft" title={value}><a style={{ color: '#0d86ff' }} onClick={() => inquiryPro(record.orgProgramId)}>{value}</a></Tooltip>
        },
        {
            title: t('project.columns_title.1'),
            dataIndex: 'activityName',
            ellipsis: {
                showTitle: false,
            },
            render: (value, record) => <Tooltip overlayStyle={{ maxWidth: '50rem' }} placement="topLeft" title={value}><a style={{ color: '#0d86ff' }} onClick={() => inquiryActivity(record.activityId)}>{value}</a></Tooltip>
        },
        {
            title: t('project.columns_title.2'),
            dataIndex: 'orgName',
            ellipsis: {
                showTitle: false,
            },
            render: (value, record) => <Tooltip overlayStyle={{ maxWidth: '50rem' }} placement="topLeft" title={value}><a style={{ color: '#0d86ff' }} onClick={() => inquiryOrg(record.orgId)}>{value}</a></Tooltip>
        },
        {
            title: t('project.columns_title.3'),
            dataIndex: 'status',
            render: (value) => value === 0 ? <span style={{ color: '#fe0000' }}>{t('tutor.noapply')}</span> : value ? <span style={{ color: '#fe0000' }}> {t(`project.status.${value}`)}</span> : ''
        },
        {
            title: t('project.columns_title.4'),
            dataIndex: 'teacherPriority',
            width: '12rem',
            render: (value, record) => (record.status >= 5 && record.status !== 6) ? value : '-'
        },
        {
            title: t('project.columns_title.5'),
            dataIndex: 'createTime',
            width: '18rem'
        },
        {
            title: t('project.columns_title.6'),
            width: '18rem',
            render: (value, record) => <Space size={4}>
                <Acheck onClick={() => inquiryApply(record.id)} >{t('project.check')}</Acheck>
                <Popconfirm placement={'topLeft'} title={t('project.delcomfirm')} onConfirm={() => deleteProgram({ orgProgramId: record.orgProgramId }).then(() => close())}
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
            <div style={{ marginBottom: '1rem' }} id={'pro_apply_num'}><span>{t('project.restNum.0')}</span><span style={{ color: '#ff0000' }}>{list && list.rows ? list.rows.length >= 3 ? 0 : (3 - list.rows.length) : ''}</span><span>{t('project.restNum.1')}</span></div>
            <ComTable loading={isLoading || deleteLoading} dataSource={list?.rows} columns={colums} rowSelection={undefined} scroll={{ x: '120rem' }}
                list={list} setParam={setParam} searchparam={searchparam} />
            <ComModal visible={projectModalOpen} close={close} title={t(inquiryOrgId ? 'project.orgdetail' : inquiryActivityId ? 'project.activitydetail' : 'project.prodetail')} width={'70vw'} footer={null}
                children={inquiryOrgId ? <Check /> : inquiryActivityId ? <ActivityDetail /> : <Checkpro />} />
            {DrawerOpen && <ComDrawer close={close} visible={DrawerOpen} child={<Detail />} title={t('project.studentApply')} />}
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


