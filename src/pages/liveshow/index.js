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
import LiveModal from '../../components/livemodal/index.js'
import data from '../../data/liveshow.json';
import showdata from '../../data/liveshowdata.json';
import Wrapper from 'wrapper';

export default class Liveshow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabSelect: 0,
        }
    }

    setTab(keyindex) {
        this.setState({
            tabSelect: keyindex
        })
    }




    render() {
        const { tablist } = data;
        const tabheader = Object.keys(tablist)
        return (
            <Wrapper>
                <div className="Liveshow">
                    <div className="LiveshowBanner" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/liveshow/banner.png)` }}>
                        <div className="LiveshowBannerTitle">{showdata.bannertitle}</div>
                        <div className="LiveshowBannerorg">{showdata.org}</div>
                        <div className="LiveshowBannerText">
                            {showdata.text}
                            <br className="mobiledisplaynone" />
                            {showdata.text2}
                        </div>

                    </div>
                    <div className="LiveShowWrapper">
                        <div className="LiveShowTabHeader">
                            {
                                tabheader.map((item, index) => {
                                    return (
                                        <span
                                            onClick={() => { this.setTab(index) }}
                                            key={index}
                                            className={["LiveShowTabHeaderItem", this.state.tabSelect === index ? 'active' : ""].join(" ")}>
                                            {item}
                                        </span>
                                    )
                                })
                            }

                        </div>
                        <div className="LiveShowContent content1200">
                            {
                                tabheader.map((item, index) => {
                                    return (
                                        <div
                                            className={["LiveModalWrapper", this.state.tabSelect === index ? "show" : ""].join(" ")}
                                            key={index}>
                                            {
                                                tablist[item].map((sitem, sindex) => {
                                                    return (
                                                        <LiveModal
                                                            key={sindex}
                                                            item={sitem} />
                                                    )
                                                })
                                            }
                                        </div>
                                    )

                                })
                            }


                        </div>

                    </div>

                </div>
            </Wrapper>

        )



    }
}

