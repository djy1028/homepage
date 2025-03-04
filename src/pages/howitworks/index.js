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
import data from "./../../data/howitworks.json"
import Wrapper from 'wrapper';
class Howitworks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data
        }
    }

    render() {
        let showdata = this.state.data[this.props.chiFlag]

        return (
            <Wrapper>
                <div className="Howitworks">
                    <img className="HowitworksBanner" style={{ minHeight: this.props.chiFlag === 'en' ? '150px' : 0 }} src={`${process.env.PUBLIC_URL}/img/howitworks/banner.png`} />
                    <span className="HowitworksBannerTitle">{showdata.title}</span>
                    <div className='HowitworksBannerList'>
                        {
                            showdata.banner.map((item, index) => {
                                return (
                                    <div className="HowitworksListItem" key={index}>
                                        <span>{item.title + '：'}</span><span>{item.text[0] + (item.text[1] ? item.text[1] : '')}</span>
                                    </div>
                                )
                            })
                        }
                    </div>


                    <div className="HowitworksContent">
                        <div className="HowitworksContentWrapper content1200">
                            {
                                showdata.ls.map((item, index) => {
                                    return (
                                        <div className="HowitworksContentItem" key={index}>
                                            <div className="HowitworksContentTitle">{item.title}</div>
                                            <div className="HowitworksContentContent">{item.text}</div>
                                        </div>
                                    )
                                })
                            }

                        </div>


                    </div>
                    <div className="indexOne">
                        <div className="contentFull">
                            <div className="indexOneTitle">
                                <span className="indexOneTitleText">{showdata.ttile}</span>
                                <span className="indexOneTitletip">{showdata.tip}</span>
                            </div>
                            <div className="indexOneList">
                                {
                                    showdata.time.map((item, index) => {
                                        return (
                                            <div className={["indexOneListLine", index % 2 === 0 ? 'left' : 'right'].join(" ")} key={index}>
                                                <div className="indexOneListItem" >
                                                    <div className="indexOneListItemTitle">{item.title}</div>
                                                    <div className="indexOneListItemTime">{item.time}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>

                        <div className="content1200">
                            <div className="indexCommittee">
                                <div className="HowitworksTimeTitle opensource">指导委员会委员</div>
                                <div className="HowitworksCommitteePinyin">*按委员姓名拼音排序</div>
                            </div>
                            <div className="HowitworksCommittee">
                                {
                                    showdata.committee.map((item, index) => {
                                        return (
                                            <div className="HowitworksCommitteeItem" key={index}>
                                                <div className="HowitworksCommitteeItemUniversity">{item.university}</div>
                                                <div className="HowitworksCommitteeItemName">{item.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
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


export default connect(mapStateToProps)(Howitworks)