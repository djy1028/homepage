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
import data from '../../data/org.json';
import { connect } from 'react-redux';
import orglist from '../../data/orglist2021.json';
// import {withRouter} from 'react-router-dom';
import OrgTip from '../OrgTip/index.js';
import prolistjson from '../../data/projectlist.json';
import ProjectModal from '../projectModal/index.js';
import { Pagination } from 'antd';
import { gohash } from "../../util/url.js";
class OrgDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showdata: orglist[0],
            page: 1, // 当前页
            pagesize: 10, // 每页显示的个数
            showprojectlist: [],
            flagProid: "",
        }
    }

    scrollToAnchor(anchorName) {

        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);

            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
                // anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'});
                var elementPosition = anchorElement.getBoundingClientRect().top + window.scrollY - 100;

                window.scrollTo({
                    top: elementPosition,
                    behavior: "smooth"
                });
            }
        }
    }


    componentDidMount() {
        let showorg = this.props.orgdetail
        var hashurl = window.location.hash.split("/")[3].toString();
        // 1.0 判断redux里是否有数据
        if (hashurl !== showorg.anchor || Object.keys(showorg).length === 0) {
            // 2.0 若无，则从orglist里搜索
            for (let i = 0, len = orglist.length; i < len; i++) {
                let item = orglist[i]
                if (item.anchor === hashurl) {
                    showorg = item
                    break
                }
            }
        }
        //3.0 若无，返回首页
        if (!showorg) {
            gohash("/")
            return false
        }
        //4.0 判断projectid的位置
        const prolist = showorg.project_list
        const hash = window.location.hash.split("/")
        let prolabel = null
        if (hash.length === 5 && hash[4].slice(0, 5) === "proid") {
            prolabel = hash[4].slice(5, hash[4].split("?")[0].length)
        }

        //5.0 判断当前的project在哪一页
        let proindex = -1
        let pagepro = 1

        if (prolabel) {
            this.setState({
                flagProid: prolabel
            })
            for (var i = 0; i < prolist.length; i++) {
                if (prolist[i].label === prolabel) {

                    proindex = i + 1
                    break;
                }
            }
        }

        if (proindex >= 0) {
            pagepro = Math.ceil(proindex / this.state.pagesize)

        }


        this.setState({
            showdata: showorg,
            showprojectlist: showorg.project_list.slice(this.state.pagesize * (pagepro - 1), this.state.pagesize * pagepro),
            page: pagepro,

        })

        setTimeout(() => {
            if (prolabel) {
                this.scrollToAnchor(this.state.flagProid)

            }

        }, 500)


    }

    itemRender(current, type, originalElement) {
        if (type === 'prev') {
            return <a>上一页</a>;
        }
        if (type === 'next') {
            return <a>下一页</a>;
        }
        return originalElement;
    }

    onChange = page => {
        this.setState({
            page: page,
            showprojectlist: this.state.showdata.project_list.slice(this.state.pagesize * (page - 1), this.state.pagesize * page)
        });
    };




    render() {
        let { chiFlag } = this.props
        let showtext = data[chiFlag]
        let protext = prolistjson[chiFlag]
        let showorgdata = this.state.showdata
        const projectlist = showorgdata.project_list
        const projectlistlen = projectlist.length
        return (
            <div className="OrgDetail content1200">
                <div className="OrgDetailNavLink ">
                    <span className="orgListNavBarItem orgClick" onClick={() => { gohash("/org/orglist") }}>社区列表</span>
                    <span className="orgListNavBarItem orgGrey"> &gt; 社区详情</span>
                </div>
                <div className="OrgDetailWrapper">
                    <OrgTip
                        item={showorgdata}
                        showdata={showtext}
                        orgDetailflag="orgdetail"
                    />
                    <div className="OrgDetailState">
                        {
                            projectlistlen === 0 ?
                                "" :
                                <div className="ProjectListPage">
                                    <span className="ProjectListPageItemOne">{protext.pronum[0]} {projectlistlen} {protext.pronum[1]}</span>
                                </div>

                        }
                        {/* <div className="ProjectListApplyState">{protext.applyState[2]}</div> */}
                    </div>
                    <div className="projectListWrapper">
                        {
                            this.state.showprojectlist.map((item, index) => {
                                return (
                                    <ProjectModal
                                        showdata={protext}
                                        item={item}
                                        key={index}
                                        prourl={showorgdata.project_url} />
                                )
                            })
                        }
                    </div>

                    {
                        projectlistlen > this.state.pagesize ?
                            <Pagination
                                defaultCurrent={this.state.page}
                                defaultPageSize={this.state.pagesize}
                                total={projectlistlen}
                                itemRender={this.itemRender}
                                onChange={this.onChange}
                                showSizeChanger={false}
                            /> : ""

                    }
                </div>

            </div>
        )



    }
}

const mapStateToProps = (state) => {

    return {
        orgdetail: state.homepage.orgdetail,
        chiFlag: state.homepage.chiFlag
    }
}


export default connect(mapStateToProps)(OrgDetail)