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
import {data} from './data.js'
import { connect } from 'react-redux'
class Index extends React.Component{
    constructor(props){
       super(props)  
       this.state ={
        data,
        showdata:data[props.chiFlag],   
        url:"https://isrc.iscas.ac.cn/summer2020/",
       }
    }
    gourl(url){
        window.open(url)
    }

    render(){    
        let showdata = this.state.data[this.props.homepage.chiFlag]
        return(         
            <div className={["index", this.props.chiFlag].join(" ")}>
               
                <div className="indexBanner">
                   <div className="content1200 indexBannerWrapper">
                        <div className="indexText"></div>
                        <div className="indexButton">
                            <span className="indexButtonText" onClick={()=>{this.gourl(this.state.url)}}>{showdata.banner.textone}</span>
                        </div>
                   </div>
                </div>
                <div className="indexOne">
                    <div className="content1200">
                    <div className="indexOneTitle">
                    <span className="indexOneTitleText">{showdata.indexOne.title}</span>
                    </div>
                    <div className="indexOneList">
                        {
                            showdata.time.map((item,index)=>{
                                return (
                                    <div className={["indexOneListLine", index%2 === 0 ? 'left':'right'].join(" ")}  key={index}>
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
                </div>

                <div className="indexTwo">
                    <div className="content1200">
                        <div className="indexOneTitle">
                    <span className="indexOneTitleText">{showdata.indexTwo.title}</span>
                        </div>
                        <div className="indexTwoWrapper">
                    <div className="indexTwoText">{showdata.indexTwo.text}</div>
                            <div className="indexTwoBlue mail">
                                <span>{showdata.indexTwo.text2} <a href="mailto:summer@iscas.ac.cn">summer@iscas.ac.cn</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         )
       
        
        
    }
}


const mapStateToProps = (state)=>state.homepage

export default connect(mapStateToProps)(Index)
