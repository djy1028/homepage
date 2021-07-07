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

class Howitworks extends React.Component{
    constructor(props){
       super(props)
       this.state ={
           data
       }
    }

 


    render(){
        let showdata = this.state.data[this.props.chiFlag]
        
        return(         
            <div className="Howitworks">
                <div className="HowitworksBanner">
                   <div className="HowitworksBannerContent content1200">
                       <div className="HowitworksBannerTitle">{showdata.title}</div>
                       <div className="HowitworksList" >
                           {
                               showdata.banner.map((item,index)=>{
                                   return (
                                    <div className="HowitworksListItem" key={index}>
                                            <div className="HowitworksListItemTitle">{item.title}</div>
                                            <div className="HowitworksListItemContent isPc">{item.text[0]}<br></br>{item.text[1]}</div>
                                            <div className="HowitworksListItemContent isMobile">{item.text[0]}{item.text[1]}</div>
                                    </div>
                                   )
                               })
                           }                       
                       </div>

                   </div>

               </div>
               <div className="HowitworksContent">
                   <div className="HowitworksContentWrapper content1200">
                        {
                            showdata.ls.map((item,index)=>{
                                return(
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
               <div className="content1200">
                    <div className="indexOneTitle">
                        <span className="indexOneTitleText">{showdata.ttile}</span>
                        <span className="indexOneTitletip">{showdata.tip}</span>
                        <div className="yellowRoll"></div>
                        <div className="pinkRoll"></div>
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
                    <div className = "indexCommittee">
                        <div className="HowitworksTimeTitle opensource">指导委员会委员</div>
                        <div className="HowitworksCommitteePinyin">*按委员姓名拼音排序</div>
                    </div>
                    <div className="HowitworksCommittee">
                        {
                            showdata.committee.map((item,index)=>{
                                return(
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
         )
       
        
        
    }
}

const mapStateToProps = (state)=>{
    
    return {
        chiFlag:state.chiFlag
    }
 }


export default connect(mapStateToProps)(Howitworks)