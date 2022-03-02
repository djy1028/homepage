import styled from '@emotion/styled'
import { Typography, Form, Spin, Button, Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { checkSetPriority } from 'auth-provider'
import { openNotificationWithIcon } from 'components/com-notify'
import { CommonSelect } from 'components/com-select'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetPriority, useStuProQueryKey, useUpdateStuPriority } from 'utils/project'

export const SortStu = (props) => {
    const { searchparam,token } = props;
    const [reset, setReset] = useState(false)
    const [showBtn, setShowBtn] = useState(false)
    const { Text, Title } = Typography
    const [form] = useForm()
    const { t,i18n } = useTranslation()
    const { data: list, isLoading,refetch } = useSetPriority({ ...searchparam})
    const { mutateAsync, isLoading: mutateLoading } = useUpdateStuPriority(useStuProQueryKey())


    const onFinish = (fieldsValue) => {
        Object.keys(fieldsValue).map((item) => {
            if (!fieldsValue[item]) {
                fieldsValue[item] = ''
            }
        })
        if (Object.values(fieldsValue).some(item => item)) {
            mutateAsync(fieldsValue).then((res) => {
                if (res.code === 200) {
                    openNotificationWithIcon(0, res.message)
                    refetch().then(rsp => {
                        setReset(false)
                    })
                }
                else {
                    openNotificationWithIcon(1, res.message)
                }
            })
        }
        else {
            Modal.warning({
                title: t('project.mes_alert'),
                content: (
                    <p>{t('project.noemptyitem')}</p>
                )
            });
        }
        
    }

    useEffect(() => { 
        checkSetPriority(token, { activityId: searchparam.activityId, status: 'first' }).then(rsp => setShowBtn(rsp.res))
    },[])

    return isLoading ? <Spin>loading...</Spin> :
            (list.rows && list.rows.length > 0) ?
            <Contain>
                <Title level={3}>{t('project.sortstutitle')}</Title>
                <Text mark>{t('project.substu_title1')}</Text>
                <Form style={{ width: '65%', padding: '2rem 0' }} form={form} scrollToFirstError={true} name="teacherpriority" onFinish={onFinish}  >
                    {
                        (list.rows && list.rows?.length > 0) && list.rows.map((item) =>
                            <Form.Item key={item.id} initialValue={item.studentPriority} preserve={false} label={
                                <div title={(i18n.language !== 'zh' && item.programNameEN) ? item.programNameEN : item.programName}
                                    style={{ maxWidth: '22rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    {(i18n.language !== 'zh' && item.programNameEN) ? item.programNameEN : item.programName}
                                </div>} name={item.id} labelCol={{ offset: reset ? 0 : 8 }}  >
                                {
                                    reset ?
                                        <CommonSelect width={'100%'} options={list.rows.map((item, index) => ({ id: index + 1, name: index + 1 }))} />
                                        : <div id={'program.studentPriority'} >
                                            {item.studentPriority ? item.studentPriority : <span style={{ color: 'red' }}>{t('tutor.nosort')}</span>}
                                        </div>
                                }
                            </Form.Item>)
                    }
                    {

                        (list.rows && list.rows?.length > 0 && showBtn) && <Form.Item wrapperCol={{ offset: 8 }} >
                            {!reset ? <Button type="link" onClick={() => setReset(true)}>
                                {t('tutor.reset_btn')}
                            </Button> :
                                <Button loading={mutateLoading} type="primary" htmlType="submit">
                                    {t('project.sortstu')}
                                </Button>
                            }
                        </Form.Item>
                    }
                </Form>
            </Contain> :
            <Contain><strong>{t('project.no_program')}</strong></Contain>
    }

const Contain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`