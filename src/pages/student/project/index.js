import { Popconfirm, Space, Tooltip, Button, Modal } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import { ComModal } from 'components/com-modal'
import { ComTable } from 'components/com-table'
import { Main } from 'components/main'
import { SearchContainer } from 'components/search-container'
import React from 'react'
import { useDebounce } from 'utils'
import { useDeleteProgram, useStuPrograms, useStuProSearchParms, useStuProgramModal, useStuProQueryKey, useActivitys } from 'utils/project'
import styled from '@emotion/styled'
import { ComDrawer } from 'components/com-drawer'
import { useTranslation } from 'react-i18next'
import { Check } from './check'
import { Checkpro } from './checkpro'
import { Detail as ActivityDetail } from './activitydetail'
import { Detail } from './detail'
import { FormOutlined } from '@ant-design/icons'
import { SortStu } from './sortStu'
import { CommonSelect } from 'components/com-select'
import { checkSetPriority } from 'auth-provider'
import { useSelector } from 'react-redux'

export const Project = () => {
    const { t } = useTranslation()
    const token = useSelector(state => state.user)?.token
    const [searchparam, setParam] = useStuProSearchParms()
    const { isLoading, data: list, refetch } = useStuPrograms(useDebounce(searchparam, 500))
    const { inquiryOrg, projectModalOpen, close, inquiryOrgId, inquiryPro, inquiryApply, DrawerOpen, inquiryActivity, inquiryActivityId,
        updateSort, stuPriority } = useStuProgramModal()
    const { data: options1 } = useActivitys({ pageSize: 10000, pageNum: 1, activityName: "", activityPage: "" })
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
                {
                    record.status >= 1 ? null :
                        <Popconfirm placement={'topLeft'} title={t('project.delcomfirm')} onConfirm={() => deleteProgram({ ids: record.id }).then(() => close())}
                            onVisibleChange={(vis) => !vis}>
                            <Alink>{t('project.delete')}</Alink>
                        </Popconfirm>
                }
            </Space>
        }
    ]
    const setPriority = () => {
        // if (searchparam.activityId) {
        //     checkSetPriority(token, { activityId: searchparam.activityId, status: 'first' }).then(rsp => {
        //         if (!rsp.res) {
        //             Modal.info({
        //                 title: t('project.mes_alert'),
        //                 content: (
        //                     <p>{t('project.alert_msgs.0') + rsp.FirstApproveCommitTime + t('project.alert_msgs.1')}</p>
        //                 )
        //             });
        //         }
        //         else {
        //updateSort()
        //         }
        //     })
        // }
        // else {
        //     Modal.info({
        //         title: t('project.mes_alert'),
        //         content: (
        //             <p>{t('project.noactivity')}</p>
        //         )
        //     });
        // }

    }
    return (
        <Main>
            <SearchContainer name={'btn_tutor_program'}>
                <FormItem label={t('project.columns_title.1')} style={{ marginBottom: "1rem" }}>
                    <CommonSelect defaultOptionName={t('project.activity_default')} value={Number(searchparam.activityId)}
                        options={options1?.rows.map((item) => ({ name: item.activityName, id: item.activityId }))} width={'25rem'}
                        onChange={e => setParam({ ...searchparam, activityId: Boolean(e) ? e : '', pageNum: undefined, pageSize: undefined })} />
                </FormItem>
            </SearchContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 1rem', alignItems: 'center' }}>
                <div style={{ marginBottom: '1rem' }} id={'pro_apply_num'}><span>{t('project.restNum.0')}</span><span style={{ color: '#ff0000' }}>{list && list.rows ? list.rows.length >= 3 ? 0 : (3 - list.rows.length) : ''}</span> {searchparam.activityId && <span>{t('project.restNum.1')}</span>}</div>
                <Button onClick={updateSort} style={{ marginBottom: '1rem', color: '#fff', background: '#0052cc', border: 'none' }}><FormOutlined />{t('project.apply_title')}</Button>
            </div>
            <ComTable loading={isLoading || deleteLoading} dataSource={list?.rows} columns={colums} rowSelection={undefined} scroll={{ y: 'calc(100vh - 34rem)', x: '120rem' }}
                list={list} setParam={setParam} searchparam={searchparam} />
            <ComModal visible={projectModalOpen} destroyOnClose={stuPriority ? true : false} close={close} title={t(inquiryOrgId ? 'project.orgdetail' : stuPriority ? 'project.program_sort' : inquiryActivityId ? 'project.activitydetail' : 'project.prodetail')} width={'70vw'} footer={null}
                children={inquiryOrgId ? <Check /> : inquiryActivityId ? <ActivityDetail /> : stuPriority ? <SortStu searchparam={searchparam} /> : <Checkpro />} />
            {DrawerOpen && <ComDrawer close={close} visible={DrawerOpen} child={<Detail refetch={refetch} />} title={t('project.studentApply')} />}
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


