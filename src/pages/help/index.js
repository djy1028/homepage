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
import data from "./../../data/help.json";

class Help extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data,
            lf: ">>"
        }
    }
    goLink(url) {
        window.open(url)
    }

    render() {
        let showdata = this.state.data[this.props.chiFlag]
        return (
            <div className="Help">
                <div className="HelpBanner" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}'/img/contact/bannerC.png')` }}>
                    <div className="HelpBannerText">
                        <div>帮助</div>
                        <div>Help</div>
                    </div>
                </div>
                <div className="HelpResourceLink content1200">
                    <div className="helptitle resourcelink">
                        <div className="helpLinkBg indexOneTitle">
                            <span>{showdata.ressourcelink.name}</span>
                        </div>
                        <div className="helpBlueTextLine">
                            {
                                showdata.list.map((item, index) => {
                                    return (
                                        <div
                                            className="helpBlueText"
                                            key={index}
                                            onClick={() => this.goLink("https://summer.iscas.ac.cn/help" + item[1])}>
                                            <span className="underline">{item[0]}</span>
                                            {this.state.lf}
                                        </div>

                                    )
                                })
                            }
                            {/* <div className="helpBlueText One" onClick={()=>this.goLink(showdata.kilink)}><span className="underline">{showdata.ressourcelink.keyissue}</span>{this.state.lf}</div>
                            <div className="helpBlueText" onClick={()=>this.goLink(showdata.link)}><span className="underline">{showdata.ressourcelink.community}</span>{this.state.lf}</div> */}
                        </div>

                    </div>
                    {
                        this.props.chiFlag === "chi" ?
                            <>
                                <div className="helptitle">
                                    <div className="helpContactBg indexOneTitle">
                                        <span>{showdata.contact.name}</span>
                                    </div>
                                    <div className="helpcontact">
                                        <div className="helpEmail mail">
                                            <span className="emaillogo"></span>
                                            <span className="helpemailtext">{showdata.contact.email}:<a href="mailto:summer@iscas.ac.cn">summer@iscas.ac.cn</a></span>
                                        </div>
                                        <div className="helpEmail maillist">
                                            <span className="emaillogo maillist"></span>
                                            <span className="helpemailtext">{showdata.contact.maillist}:<a href="mailto:summer-ospp@googlegroups.com">summer-ospp@googlegroups.com</a></span>
                                        </div>

                                    </div>
                                </div>
                                <div className="helpTwoCode">
                                    <div className="helpTwoCodeItem"><img src={process.env.PUBLIC_URL + "/img/contact/1.png"}></img></div>
                                    <div className="helpTwoCodeItem"><img src={process.env.PUBLIC_URL + "/img/contact/2.png"}></img></div>
                                    <div className="helpTwoCodeItem"><img src={process.env.PUBLIC_URL + "/img/contact/3.png"}></img></div>
                                </div>
                            </>
                            :
                            <div>
                                <div className="helptitle eng">
                                    <div className="helpContactBg indexOneTitle">
                                        <span>{showdata.contact.name}</span>
                                    </div>
                                    <div className="helpcontact">
                                        <div className="helpEmail mail">
                                            <span className="emaillogo"></span>
                                            <span className="helpemailtext">{showdata.contact.email}:<a href="mailto:summer@iscas.ac.cn">summer@iscas.ac.cn</a></span>
                                        </div>
                                        <div className="helpECListWrapper">
                                            <div className="helpECList">
                                                {
                                                    showdata.contact.emailcontent
                                                }
                                            </div>
                                        </div>
                                        <div className="helpEmail maillist">
                                            <span className="emaillogo maillist"></span>
                                            <span className="helpemailtext">{showdata.contact.maillist}:<a href="mailto:summer-ospp@googlegroups.com">summer-ospp@googlegroups.com</a></span>
                                        </div>
                                        <div className="helpECListWrapper maillist">
                                            {
                                                showdata.contact.maillistctx.map((item, index) => {
                                                    return <div className="helpECList" key={index}><span className="helpEClline" dangerouslySetInnerHTML={{ __html: item }}></span></div>
                                                })
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className="helpTwoCode">
                                    <div className="helpTwoCodeItem"><img src={process.env.PUBLIC_URL + "/img/contact/1en.png"}></img></div>
                                    <div className="helpTwoCodeItem"><img src={process.env.PUBLIC_URL + "/img/contact/2en.png"}></img></div>
                                    <div className="helpTwoCodeItem"><img src={process.env.PUBLIC_URL + "/img/contact/3en.png"}></img></div>
                                </div>

                            </div>
                    }



                </div>
            </div>
        )



    }
}

const mapStateToProps = (state) => {

    return {
        chiFlag: state.homepage.chiFlag
    }
}


export default connect(mapStateToProps)(Help)