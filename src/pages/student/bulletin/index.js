import React, { useState, useEffect } from 'react'
import { Main } from 'components/main';
import { useStudents } from 'utils/student';
import BraftEditor, { ControlType } from 'braft-editor'
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd'
import 'braft-editor/dist/index.css'

export const Bulletin = () => {
    const { i18n } = useTranslation()
    const { data, isLoading } = useStudents()
    const [preview, setPreview] = useState(BraftEditor.createEditorState(''))

    useEffect(() => {
        (data && data.notice) && setPreview(BraftEditor.createEditorState(data.notice.noticeContent))
    }, [data])
    return (isLoading ? <Spin>loading...</Spin> : <Main>
        <BraftEditor
            language={i18n.language === 'zh' ? 'zh' : 'en'}
            readOnly
            contentStyle={{ width: '100%', height: 'auto', maxHeight: '71vh', overflow: 'auto' }}

            controls={[]}
            value={preview}
        />
    </Main>
    )
}
