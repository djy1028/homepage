import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom' /* router所有api都用react-router-dom */
import { LayOut } from 'layout/layout'
import { ConfigProvider, Spin } from 'antd'
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment'
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'utils';
import Wrapper from 'wrapper';

const Bulletin = lazy(() => import('./bulletin'))
const Info = lazy(() => import('./infomation'))
const Project = lazy(() => import('./project'))
const Modifypwd = lazy(() => import('./modifypwd/index'))

const Student = () => {
    const { t, i18n } = useTranslation()
    moment.locale(i18n.language === 'en' ? 'en-us' : 'zh-cn');
    useDocumentTitle(t('student.side_head_title'))
    return <Wrapper>
        <ConfigProvider locale={i18n.language === 'en' ? enUS : zhCN} >
            <LayOut >
                <Suspense fallback={<Spin />}>
                    <Routes>
                        <Route path={`bulletin`} element={<Bulletin />} />
                        <Route path={`myinfomation`} element={<Info />} />
                        <Route path={`project`} element={<Project />} />
                        <Route path={`modifypwd`} element={<Modifypwd />} />
                    </Routes>
                </Suspense>
            </LayOut>
        </ConfigProvider>
    </Wrapper>
}

export default Student