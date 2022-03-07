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
import './indexhelp.less'
import { connect } from 'react-redux';
import data from "./../../data/apply.json"
import datahelp from "./../../data/help.json";
import Wrapper from 'wrapper';
class Apply extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data,
            showdatahep: datahelp
        }
    }
    goLink(url) {
        window.open(url)
    }



    render() {
        let showdata = this.state.data[this.props.chiFlag]
        let showdatahep = this.state.showdatahep[this.props.chiFlag]
        return (
            <Wrapper>
                <div className="Apply" style={{ background: '#f5f6fa' }}>
                    <img className="ApplyBanner" src={`${process.env.PUBLIC_URL}/img/apply/banner1.png`} />
                    <span className="ApplyBannerTitle">{showdata.title}</span>
                    <div className="ApplyRes content1200">
                        <div className="HowitworksList" >
                            {
                                showdata.re.map((item, index) => {
                                    return (
                                        <div className="HowitworksListItem" key={index}>
                                            <div className="ApplyListItemTitle">{item.title}</div>
                                            <div className="HowitworksListItemContent">
                                                {
                                                    item.text.map((sitem, sindex) => {
                                                        return (
                                                            <span key={sindex} dangerouslySetInnerHTML={{ __html: sitem }}></span>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="Help" style={{ background: '#f5f6fa' }}>
                    <div className="HelpResourceLink content1200">
                        <div className="helptitle resourcelink">
                            <div className="helpLinkBg indexOneTitle">
                                <span className="title-text" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/index/wraptitle.png)` }}>{showdatahep.ressourcelink.name}</span>
                            </div>
                            <div className="helpBlueTextLine">
                                {
                                    showdatahep.list.map((item, index) => {
                                        return (
                                            <div
                                                className="helpBlueText"

                                                key={index}
                                                onClick={() => this.goLink("https://summer.iscas.ac.cn/help" + item[1])}>

                                                <span className="underline">{item[0]}</span>
                                                {this.props.chiFlag === 'chi' && ">>"}
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Help">
                    <div className="HelpResourceLink content1200">
                        {
                            this.props.chiFlag === "chi" ?
                                <>
                                    <div className="helptitle">
                                        <div className="helpContactBg indexOneTitle">
                                            <span className="title-text" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/index/wraptitle.png)` }}>{showdatahep.contact.name}</span>
                                        </div>
                                        <div className="helpcontact">
                                            <div className="helpEmail mail">
                                                <span className="emaillogo"></span>
                                                <span className="helpemailtext">{showdatahep.contact.email}:<a href="mailto:summer@iscas.ac.cn">summer@iscas.ac.cn</a></span>
                                            </div>
                                            <div className="helpEmail maillist">
                                                <span className="emaillogo maillist"></span>
                                                <span className="helpemailtext">{showdatahep.contact.maillist}:<a href="mailto:summer-ospp@googlegroups.com">summer-ospp@googlegroups.com</a></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='emailhelp_mes'>
                                        {
                                            showdatahep.emailhelp.map((sitem, sindex) => <div className='email_list'>
                                                {
                                                    sitem.map((item, index) => (<div className='email_listItem' dangerouslySetInnerHTML={{ __html: item }}>

                                                    </div>))
                                                }
                                            </div>)
                                        }
                                    </div>
                                    <div className="helpTwoCode">
                                        <div className="helpTwoCodeItem"><img src={process.env.PUBLIC_URL + "/img/apply/2.png"}></img></div>
                                        <div className="helpTwoCodeItem"><img src={process.env.PUBLIC_URL + "/img/apply/3.png"}></img></div>
                                    </div>
                                </>
                                :
                                <div>
                                    <div className="helptitle eng">
                                        <div className="helpContactBg indexOneTitle">
                                            <span className="title-text" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/index/wraptitle.png)` }}>{showdatahep.contact.name}</span>
                                        </div>
                                        <div className="helpcontact">
                                            <div className="helpEmail mail">
                                                <span className="emaillogo"></span>
                                                <span className="helpemailtext">{showdatahep.contact.email}:<a href="mailto:summer@iscas.ac.cn">summer@iscas.ac.cn</a></span>
                                            </div>
                                            <div className="helpECListWrapper">
                                                <div className="helpECList">
                                                    {
                                                        showdatahep.contact.emailcontent
                                                    }
                                                </div>
                                            </div>
                                            <div className="helpEmail maillist">
                                                <span className="emaillogo maillist"></span>
                                                <span className="helpemailtext">{showdatahep.contact.maillist}:<a href="mailto:summer-ospp@googlegroups.com">summer-ospp@googlegroups.com</a></span>
                                            </div>
                                            <div className="helpECListWrapper maillist">
                                                {
                                                    showdatahep.contact.maillistctx.map((item, index) => {
                                                        return <div className="helpECList" key={index}><span className="helpEClline" dangerouslySetInnerHTML={{ __html: item }}></span></div>
                                                    })
                                                }
                                            </div>

                                        </div>
                                    </div>
                                    <div className="helpTwoCode">
                                        <div className="helpTwoCodeItem"><img src={process.env.PUBLIC_URL + "/img/apply/2en.png"}></img></div>
                                        <div className="helpTwoCodeItem"><img src={process.env.PUBLIC_URL + "/img/apply/3en.png"}></img></div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className="Help" style={{ background: '#f5f6fa' }}>
                    <div className="HelpResourceLink content1200">
                        <div className="copoperateLinkBg indexOneTitle">
                            <span className={this.props.chiFlag === "chi" ? "title-text" : "title-text title-text_en"} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/index/wraptitle.png)` }}>{showdatahep.cooperate.title}</span>
                        </div>
                        {
                            showdatahep.cooperate.content.map((item, index) => <div className='cooperateArea' key={index}>
                                <div className='cooperateTitle'>{item.title}</div>
                                <div className='cooperateContent' dangerouslySetInnerHTML={{ __html: item.description }}></div>
                            </div>
                            )
                        }
                    </div>
                </div>
            </Wrapper>

        )



    }
}

const mapStateToProps = (state) => {

    return {
        chiFlag: state.homepage.chiFlag
    }
}


export default connect(mapStateToProps)(Apply)