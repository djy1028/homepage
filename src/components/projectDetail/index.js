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

import React from 'react'
import './index.less';
import { connect } from 'react-redux';
import projectlist from '../../data/projectlist.json';
import { getSplit, getSupportLanguage, goenroll, gohash } from "../../util/url.js";
import data from '../../data/orglist2021.json';
import { http } from 'utils/http';
import { getToken } from 'auth-provider';
import { openNotificationWithIcon } from 'components/com-notify';
class ProjectDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPro: {
                "name": "MiniGUI 的 DRM 加速图形引擎",
                "remark": null,
                "difficulty": "中",
                "mentor": "薛淑明",
                "contact": "<xueshuming@minigui.org>",
                "uniont": null,
                "student_count": 0,
                "description": "DRM 已经成为 Linux 环境中新一代的现代图形支持框架。自 4.0 版本以来，MiniGUI 支持 DRM，但目前只提供了一个针对早期 Intel i915 芯片的加速图形引擎。该项目要求您为某个支持 DRM 且包含基础 2D 加速能力的 GPU 开发一个 MiniGUI 的 DRM 加速图形引擎。该 GPU 可以是 PC 显卡，也可以是嵌入式 SoC，如全志、瑞芯或者展讯的 SoC。",
                "label": "210260168",
                "link": "",
                "tech_tag": ["Linux", "C", "RTOS", "C++", "Docker", "MiniUGI，开源社区"],
                "domain_tag": ["OS"],
                "oR": ["符合 MiniGUI 5.0 DRM 引擎接口的加速引擎，可编译成动态库供 MiniGUI 在运行时动态装载。", "提供对显存管理、矩形填充、位块传输（Blitting）等的加速支持。", "在 https://github.com/FMSoftCN/hidrmdrivers 基础上完成开发工作。", "继承 hiDRMDriver 使用的 MIT 许可证。"],
                "tR": ["Linux 环境下的 C/C++ 编程", "MiniGUI、Mesa 等软件"],
                "orgID": 256,
                "spl": 1,
                "organchor": "hgbczxjt",
                "orgname": "合璧操作系统"
            },
            hasApplyed: false,
            canApply: true
        }
    }

    componentDidMount() {
        this.getActivity()
        let showprodata = this.props.prodetail
        //1.0 判断prodetail有无值
        if (Object.keys(this.props.prodetail).length === 0) {
            //2.0 获取projectid
            // console.log(this.props.history.location)
            // const proid = this.props.history.location.pathname.split("/org/prodetail/") 
            const proid = window.location.hash.split("/org/prodetail/")
            if (proid[1]) {
                //3.0 从数据中查找projectid
                for (let orgitem of data) {
                    const prolablelist = orgitem.project_list.map((pro) => { return pro.label })
                    // console.log(prolablelist)

                    const indexp = prolablelist.indexOf(proid[1])
                    if (indexp > -1) {
                        showprodata = orgitem.project_list[indexp]

                        break;
                    }
                }
                if (Object.keys(showprodata).length === 0) {
                    gohash("/org/orglist")
                }
            }
        }

        this.setState({
            showPro: showprodata
        })
    }

    /* 获取活动详情 */

    getActivity() {
        const that = this
        http('/public/isSignupAvailable', { data: '', token: getToken(), method: 'get' }).then(rsp => {
            that.setState({
                canApply: rsp.res
            })
        })
    }

    /* 学生申请项目 */
    applyProject(proid) {
        const that = this
        if (this.state.canApply) {
            http('/studentProgram/apply', { data: { orgProgramId: proid }, token: getToken(), method: 'post' }).then(res => {
                openNotificationWithIcon(0, res.message)
                that.setState({
                    hasApplyed: true
                })
            })
        }
        else {
            openNotificationWithIcon(1, '该项目申请时间已截止')
        }

    }

    getDegreeBy(degree) {
        if (this.props.chiFlag === "chi") {
            return degree
        }
        return {
            "高": "High",
            "中": "Medium",
            "低": "Low"
        }[degree] || "Low"
    }

    render() {
        let showdata = projectlist[this.props.chiFlag]
        let prodetail = this.state.showPro
        const { token } = this.props.user
        const { hasApplyed } = this.state
        return (
            <div className="ProjectDetail content1200">
                <div className="ProjectDetailNavLink">
                    <span className="orgListNavBarItem orgClick" onClick={() => { gohash('/org/orglist') }}>社区列表</span>
                    <span className="orgListNavBarItem orgClick" onClick={() => { gohash('/org/orgdetail/' + prodetail.organchor) }}> &gt; {getSplit(prodetail.orgname, this.props.chiFlag)}</span>
                    <span className="orgListNavBarItem orgGrey"> &gt; 项目详情</span>
                </div>
                <div className="ProjectDetailWrapper">
                    <div className="ProDeHeader">
                        <span
                            className="ProDeTitle"
                        >
                            {getSplit(prodetail.name, this.props.chiFlag)}</span>
                        <span className="ProDeID">
                            <span className="ProDeIDTitle">{showdata.projectNumber}：</span>
                            {prodetail.label}
                        </span>
                    </div>
                    <div className="ProjectDetailContent">
                        <div className="ProDeLine">

                            <div className="ProDeLineItem">
                                <span className="ProDeLineTitle ">{showdata.lang}</span>
                                {getSupportLanguage(prodetail.spl)}
                            </div>
                            <div className="ProDeLineItem">
                                <span className="ProDeLineTitle">{showdata.proM}</span>
                                {prodetail.mentor}{prodetail.contact}
                            </div>
                            {
                                prodetail.uniont ?
                                    <div className="ProDeLineItem">
                                        <span className="ProDeLineTitle">{showdata.proU}</span>
                                        {prodetail.uniont}
                                    </div> : ""

                            }
                            <div className="ProDeLineItem">
                                <span className="ProDeLineTitle">{showdata.proD}</span>
                                {this.getDegreeBy(prodetail.difficulty)}
                            </div>


                        </div>
                        <div className="ProDeTaLine ">
                            <div className="ProDeTagItem">
                                <span>{showdata.domain}</span>
                            </div>
                            <div className="OrgTipDomainTag ProDeTagContent">
                                {
                                    prodetail.domain_tag.map((tag, indext) => {
                                        return (
                                            <span className="Domain tagItem" key={indext}>{tag}</span>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className="ProDeTaLine ">
                            <div className="ProDeTagItem ">
                                <span>{showdata.tech}</span>
                            </div>
                            <div className="OrgTipTechTag ProDeTagContent">
                                {
                                    prodetail.tech_tag.map((tag, indext) => {
                                        return (
                                            <span className="Tech tagItem" key={indext}>{tag}</span>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className="ProDeTaLine ">
                            <div className="ProDeTagItem ">
                                <span>{showdata.desc}</span>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{ __html: getSplit(prodetail.description, this.props.chiFlag) }}
                                className="ProDeTag ">

                            </div>

                        </div>
                        {
                            prodetail.remark ?
                                <div className="ProDeTaLine ">
                                    <div className="ProDeTagItem ">
                                        <span>{showdata.remark}</span>
                                    </div>
                                    <div className="ProDeTag ">
                                        {prodetail.remark}
                                    </div>
                                </div> : ""

                        }


                    </div>
                    <div className="ProjectDetailContent">
                        <div className="ProDeRe">
                            <span className="ProDeReLeft"></span>
                            {showdata.outre}
                            <span className="ProDeReRight"></span>
                        </div>
                        <div className="ProDeReCon">
                            {
                                prodetail.oR.map((item, index) => {
                                    return (
                                        <div className="ProDeReItem" key={index}>
                                            {getSplit(item, this.props.chiFlag)}
                                        </div>
                                    )
                                })

                            }

                        </div>
                        <div className="ProDeRe">
                            <span className="ProDeReLeft"></span>
                            {showdata.techre}
                            <span className="ProDeReRight"></span>
                        </div>
                        <div className="ProDeReCon">
                            {
                                prodetail.tR.map((item, index) => {
                                    return (
                                        <div className="ProDeReItem" key={index}>
                                            {getSplit(item, this.props.chiFlag)}
                                        </div>
                                    )
                                })

                            }

                        </div>
                        {token ? hasApplyed ? <div className="OrgTipButton" style={{ background: '#55585a' }} >
                            {showdata.operationbutton[2]}
                        </div> :
                            <div
                                className="OrgTipButton"
                                onClick={() => {
                                    this.applyProject(prodetail.proid)
                                    // goenroll(prodetail.proid, this.props.chiFlag)
                                }}>
                                {showdata.operationbutton[1]}
                            </div> : null
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        chiFlag: state.homepage.chiFlag,
        prodetail: state.homepage.prodetail,
        proalldata: state.homepage.proalldata,
        user: state.user
    }
}


export default connect(mapStateToProps)(ProjectDetail)