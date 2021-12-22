import React from 'react'
import { Main } from 'components/main';
import { useStudents } from 'utils/student';
import BraftEditor from 'braft-editor'
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd'
export const Bulletin = () => {
    const { i18n } = useTranslation()
    const { data, isLoading } = useStudents()
    console.log(data && data.notice && data.notice.noticeContent)
    return (isLoading ? <Spin>loading...</Spin> : <Main>
        <BraftEditor
            language={i18n.language === 'zh' ? 'zh' : 'en'}
            contentStyle={{ width: '100%', height: 'auto', maxHeight: '72vh', overflow: 'auto' }}
            controls={[]}
            value={BraftEditor.createEditorState(data.notice.noticeContent ? data.notice?.noticeContent : '')}
            readOnly />
    </Main>
    )
}
