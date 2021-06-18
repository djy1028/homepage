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
import {getSplit,getSupportLanguage,gohash,gourl} from "../../util/url.js";
// import studata from '../../data/stunum.json'
class ProjectModal extends React.Component{
    constructor(props){
       super(props)
    }
 

    getDegree(degree){
        return {
            "高":"org2",
            "中":"org1",
            "低":"org0"
        }[degree]||'org0'
    }

    getDegreeBy(degree){
        if(this.props.chiFlag === "chi"){
            return degree
        }
        return {
            "高":"High",
            "中":"Medium",
            "低":"Low"
        }[degree]||"Low"
    }



    goLink(link){
        window.open(link)
    }

    goHash(){
        this.props.setProDetail(this.props.item)
        gourl("/#/org/prodetail/"+this.props.item.label)
    }

    render(){
        // let showdata = this.props.showdata
        // let item = this.props.item
        const {showdata,item,prourl,studata} = this.props
        return(         
            <div id={item.label} className={["projectListItem",this.getDegree(item.difficulty)].join(" ")} >
                <div className="projectListItemLeft">
                    <div className="orgProjectTitleBar">                
                        <div className="orgProjectTitle">
                            {getSplit(item.name,this.props.chiFlag)}                      
                        </div>
                        <div className="orgProjectLine">
                            <div className={this.getDegreeBy(item.difficulty)=="High"?"orgProjectIdHigh":"orgProjectId"}>{showdata.projectID} {item.label}</div>
                            {
                                item.wiki?
                                <div className="orgProjectWiki">
                                    <a href={item.wiki} target="_blank" rel="noopener noreferrer">{showdata.proStore}</a>
                                </div> :""
                            }                                          
                        </div>
                                                
                        <div className="orgProjectBottomLeft">
                            <div>{showdata.proStudents}{"王*云"}</div>
                            <div>{showdata.proDi}{this.getDegreeBy(item.difficulty)}</div>
                            <div>{showdata.lang}{getSupportLanguage(item.spl)}</div>
                            <div>{showdata.orgstunum}{studata[item.proid.toString()]||0}</div>
                            {/* 功能暂未上线 */}
                            {/* <div>{showdata.proSelectStu}{item.student_name}</div> */}
                            {/* <div className="orgProjectName">{item.orgtitle}</div> */}
                        </div>
                    </div>

                </div>
                <div className="projectListItemRight">
                    <div 
                        className="orgProjectDes"
                        dangerouslySetInnerHTML={{ __html: getSplit(item.description,this.props.chiFlag) }}>
                        
                        </div>
                    <div className="proCardUL">
                        <ul className="projectListItemRightUl">
                            <li>{showdata.proMentor}{item.mentor}</li>
                            <li>{showdata.proMentorContact}<a href={"mailto:"+item.contact}>{item.contact}</a></li>
                        </ul>
                        <div className="proCardULButton">
                            <div className="orgProjectButton" onClick={()=>{this.goHash()}}>{showdata.proDetail}</div>                        
                            {
                                item.link?
                                <div className=" orgProjectButton" onClick={()=>{this.goLink(item.link)}}>{showdata.proCommuDe}</div>:
                                prourl?
                                <div className=" orgProjectButton" onClick={()=>{this.goLink(prourl)}}>{showdata.proCommuDe}</div>:""

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
       chiFlag:state.chiFlag,
       studata:state.studata
   }
 }

 const mapDispatchToProps = dispatch => {
    return {
        setProDetail:(data)=>{
            dispatch({
                type:'setProDetail',
                payload:data
            })
        }
    }
}
 
 export default connect(mapStateToProps,mapDispatchToProps)(ProjectModal)
 