import React, { Suspense } from 'react';
import './index.less';
import datas from './../../data/org.json';
import { gohash } from '../../util/url';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Routes, Route } from 'react-router-dom';
// import ProjectDetail from 'components/projectDetail/index.js';
// import OrgDetail from 'components/orgdetail/index.js';
// import SpinLoading from 'components/spin/index.js';
// import Orglist from 'components/orglist/index.js';
// import ProjectlistN from 'components/projectlistN/index.js';
import Wrapper from 'wrapper';

const Org = (props) => {
    const [data, setData] = useState(datas)
    const homepage = useSelector(state => state.homepage)
    const dispatch = useDispatch();
    const location = useLocation();
    const showdata = data[homepage.chiFlag]
    const tabflag = homepage.orgTabFlag
    useEffect(() => {
        var hashurl = location.pathname.split("/");
        let orgflag = "orglist"
        if (hashurl[2] === "projectlist") {
            orgflag = "projectlist"
        }
        if (homepage.orgTabFlag !== orgflag) {
            dispatch({
                type: 'setOrgTabFlag',
                payload: orgflag
            })
        }
    }, [])

    const handleClick = (hashurl) => {
        dispatch({
            type: 'setOrgTabFlag',
            payload: hashurl
        })
        gohash('/org/' + hashurl)
    }
    return (
        <Wrapper>
            <div className="Org">
                <div className="OrgBanner" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/organisation/banner1.png` }}>
                    <div className="OrgBannerTitle">{showdata.title}</div>
                    <div className="OrgTextOne" style={{ fontSize: homepage.chiFlag === 'chi' ? '2.4rem' : '2.2rem' }} dangerouslySetInnerHTML={{ __html: showdata.titlebannertext }}></div>
                    <div className="OrgTextBtn" style={{ width: homepage.chiFlag === 'chi' ? '20rem' : '30rem' }}><span>{showdata.titleBtntext}</span></div>
                </div>
                <div className="OrgTab">
                    {
                        showdata.tab.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleClick(item.hash)}
                                    className={["OrgTabItem activeItem", tabflag === item.hash ? "activeTab" : ""].join(" ")}> {item.name}</div>
                            )
                        })
                    }
                </div>
                <div className="OrgWrapper" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>

                    <span>敬请期待.../comming soon...</span>

                    {/* <Suspense maxDuration={500} fallback={<SpinLoading />}>
                        <Routes>
                            <Route path="orglist" element={<Orglist />}></Route>
                            <Route path="projectlist" element={<ProjectlistN />}></Route>
                            <Route path="orgdetail/:orgname" element={<OrgDetail />} ></Route>
                            <Route path="orgdetail/:orgname/:projectid" element={<OrgDetail />} ></Route>
                            <Route path="prodetail/:projectid" element={<ProjectDetail />} ></Route>
                            <Route path="" element={<Orglist />}></Route>
                        </Routes>
                    </Suspense> */}
                </div>

            </div>
        </Wrapper>

    )
}
export default Org
