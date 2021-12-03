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
import data from "./../../data/apply.json"

class Apply extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data
        }
    }




    render() {
        let showdata = this.state.data[this.props.chiFlag]
        return (
            <div className="Apply">
                <div className="ApplyBanner">
                    <div className="HowitworksBannerContent content1200">

                        <div className="HowitworksList" >
                            {
                                showdata.banner.map((item, index) => {
                                    return (
                                        <div className="HowitworksListItem" key={index}>
                                            <div className="ApplyBannerListItemTitle">{item.title}</div>
                                            <div className="HowitworksListItemContent" dangerouslySetInnerHTML={{ __html: item.text }}></div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>

                </div>
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
        )



    }
}

const mapStateToProps = (state) => {

    return {
        chiFlag: state.homepage.chiFlag
    }
}


export default connect(mapStateToProps)(Apply)