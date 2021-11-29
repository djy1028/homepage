import React from 'react'
import { Route, Routes} from 'react-router-dom' /* router所有api都用react-router-dom */
import { LayOut } from 'layout/layout'
import { ConfigProvider } from 'antd'
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment'
import { useTranslation } from 'react-i18next';
import { Bulletin } from './bulletin';
import { Info } from './infomation';
import { Project } from './project';
import { Modifypwd } from './modifypwd/index';

export const Student = () => {
    const { i18n } = useTranslation()
    moment.locale(i18n.language === 'en' ? 'en-us' : 'zh-cn');

    return  <ConfigProvider locale={i18n.language === 'en' ? enUS : zhCN} >
                <LayOut >
                    <Routes>
                        <Route path={`bulletin`} element={<Bulletin/>} />
                        <Route path={`myinfomation`} element={<Info/>} />
                        <Route path={`project`} element={<Project/>} />
                        <Route path={`modifypwd`} element={<Modifypwd />} />
                    </Routes>
                </LayOut>
            </ConfigProvider>
}