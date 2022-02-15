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
import { connect } from 'react-redux'

class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: {
                chi: '版权所有 @开源软件供应链点亮计划-暑期2022 活动组委会',
                en: 'Copyright @Open Source Promotion Plan - Summer 2022 Organizing Committee.'
            }

        }
    }

    goLink(url) {
        window.open(url)
    }




    render() {
        let showtext = this.state.text[this.props.chiFlag]
        return (
            <div className="footer">
                <div className="content1200">

                    <div className="footerWrapper">
                        <span className="footerNumber" onClick={() => { this.goLink('https://beian.miit.gov.cn') }}>京ICP备05046678号-1</span>
                        <span>   {showtext}</span> </div>
                </div>

            </div>
        )



    }
}

const mapStateToProps = (state) => {

    return state.homepage
}

export default connect(mapStateToProps)(Footer)