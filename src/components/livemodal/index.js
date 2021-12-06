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
import { gourl } from "./../../util/url.js";
export default class LiveModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            liveurl: "https://live.bilibili.com/22221041",

        }
    }





    render() {
        const item = this.props.item
        return (
            <div className="LiveShowItem" >
                <div className="LiveShowItemHeader">

                    <img className="LiveShowItemHeaderImage" src={`${process.env.PUBLIC_URL}/img/liveshow/${item.profilelist[0].imgurl}`} />
                    <div className="LiveShowItemHeaderTitle">
                        <div className="LiveShowItemHeaderTitleOne">{this.props.item.title}</div>
                        {
                            this.props.item.url ?
                                <>
                                    <div
                                        className="LiveShowItemHeaderTitleTwo LiveShowItemOver">
                                        {this.props.item.time}
                                    </div>
                                    <div
                                        onClick={() => { gourl(this.props.item.url) }}
                                        className="LiveShowItemHeaderButton" >观看回放
                                    </div>
                                </>
                                :
                                <>
                                    <div className="LiveShowItemHeaderTitleTwo">{this.props.item.time} 20:00</div>
                                    <div
                                        onClick={() => { gourl(this.state.liveurl) }}
                                        className="LiveShowItemHeaderButton" >观看直播</div>
                                </>
                        }

                        {
                            this.props.item.ppt ?
                                <a
                                    download={this.props.item.pptname}
                                    href={'https://isrc.iscas.ac.cn/summer2020/downloads/' + this.props.item.ppt}
                                    className="LiveShowItemHeaderPPTX" >下载PPT</a> : ""
                        }

                    </div>

                    <div className="LiveShowItemHeaderTwoCode">
                        <img src={`${process.env.PUBLIC_URL}/img/liveshow/liveTwoCode.png`} alt="直播二维码" />
                        <span className="mobiledisplaynone">可扫码观看 </span>
                    </div>
                </div>
                {
                    this.props.item.profilelist.map((iteml, indexl) => {
                        return (
                            <div className="LiveShowItemProfile" key={indexl}>
                                <span className="LiveShowItemProfileName">{iteml.name}:</span><span className="LiveShowItemProfileContent">&nbsp;&nbsp;{iteml.profile}</span>
                            </div>
                        )
                    })
                }

                {
                    this.props.item.speechcontent ?
                        <div className="LiveShowItemProfile">
                            <span className="LiveShowItemProfileName">议题简介:</span>
                            <span className="LiveShowItemProfileContent">&nbsp;&nbsp;{this.props.item.speechcontent}</span>
                        </div>
                        :
                        ""
                }

            </div>

        )
    }
}

