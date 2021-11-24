/**
 * Copyright (c) 2020 Intelligent Software Research Center of ISCAS
 * Summer 2020 Homepage is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

 import React , { Suspense }from 'react';
import { HashRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
 import Wrapper from './wrapper.js';
 import HomePage from './pages/homepage/index.js';
 import Help from './pages/help/index.js';
 import Howitworks from './pages/howitworks/index.js';
 import Data from './pages/data/index.js'
 import Midtermdata from './pages/midterm/index.js'
 import Apply from './pages/apply/index.js';
 import Org from './pages/org/index.js';
 import OrgDetail from './components/orgdetail/index.js';
import Liveshow from './pages/liveshow/index.js';
import ProjectDetail from './components/projectDetail/index.js';
import SpinLoading  from './components/spin/index.js';
import { LoginApp } from 'pages/login';
import { Student } from 'pages/student';
import { getToken } from 'auth-provider.js';
const Orglist = React.lazy(() => import('./components/orglist/index.js'));
const ProjectlistN = React.lazy(() => import('./components/projectlistN/index.js'));

export const IRouter = () => {
    return (
        <Wrapper>
            <Router >
                 <Routes>
                    <Route path="/homepage" element={<HomePage />} ></Route>
                    <Route path="/help" element={<Help />} ></Route>
                    <Route path="/org/*" element={<Org/>}></Route>
                    <Route path="/howitworks" element={<Howitworks />} ></Route>
                    <Route path="/data" element={<Data />} ></Route>
                    <Route path="/midtermdata" element={<Midtermdata />} ></Route>
                    <Route path="/apply" element={<Apply />} ></Route>
                    <Route path="/liveshow" element={<Liveshow />} ></Route>
                    <Route path="/studentLogin" element={<LoginApp />}></Route>
                    <Route path="/student/*" element={<Student />}></Route>
                    <Route path="/" element={<HomePage />} />
                </Routes>
                {/* {getToken() && <Navigate to={"/student"} />} */}
            </Router>
        </Wrapper>
         )
     
 }