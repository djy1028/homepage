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
import {getSplit,gohash, gourl} from "../../util/url.js";


class OrgTip extends React.Component{
    constructor(props){
       super(props)
       this.state ={      
       }
       this.goOrgDetail = this.goOrgDetail.bind(this)
    }

    goOrgDetail(){
        this.props.setOrgDetail(this.props.item)
        gohash("/org/orgdetail/"+this.props.item.anchor)
    }

   
    render(){
        const {closeModal,orgflag,orgDetailflag} =this.props;
        return(         
            <div className={["OrgListItemTip",orgDetailflag,orgflag === this.props.item.anchor?"show":"hide"].join(" ")}>
                <div className="triangle"></div>
                <div className="OrgTipItemContent">
                    <div className="OrgTipClose" onClick={closeModal}></div>
                    <div className="OrgTipTitle">{getSplit(this.props.item.title,this.props.chiFlag)}</div>
                    <div className="OrgTipFullDesc"
                    dangerouslySetInnerHTML={{ __html: getSplit(this.props.item.full_des,this.props.chiFlag) }}
                    >
                    </div>
                    <div className="Orgdivider"></div>
                    <div className="OrgTipWebSiteUrl OrgTipArr">
                        {this.props.showdata.websiteurl}
                        <a href={this.props.item.url}  target="_blank" rel="noopener noreferrer">
                            {this.props.item.url}
                        </a>
                    </div>
                    {
                        this.props.item.mail_list?
                        <div className="OrgTipMailList OrgTipArr">
                            {this.props.showdata.maillist}
                            {
                                this.props.item.mail_list.split(" ").map((item,index)=>{
                                    return (
                                        <a href={"mailto:"+item} key={index} target="_blank" rel="noopener noreferrer">
                                            {item}
                                        </a>

                                    )
                                })
                            }
                            
                        </div>:""

                    }
                    
                    <div className="OrgTipMail OrgTipArr">
                        {this.props.showdata.email}
                        <a href={"mailto:"+this.props.item.email}  target="_blank" rel="noopener noreferrer">
                            {this.props.item.email}
                        </a>
                    </div>
                    {
                        this.props.item.project_url ?
                        <div className="OrgTipsummer2021pro OrgTipArr">
                            {this.props.showdata.summer2021pro}
                            <a href={this.props.item.project_url}  target="_blank" rel="noopener noreferrer">
                                {this.props.item.project_url}
                            </a>
                        </div>:""

                    }
                    
                    <div className="OrgTipDomain OrgTipArr">{this.props.showdata.domain}</div>
                    <div className="OrgTipDomainTag">
                        {
                            this.props.item.domain_tag.map((tag,indext)=>{
                                return (
                                    <span className="Domain tagItem" key={indext}>{tag}</span>
                                )
                            })
                        }
                    </div>
                    <div className="OrgTipDomain OrgTipArr">{this.props.showdata.tech}</div>
                    <div className="OrgTipTechTag">
                        {
                            this.props.item.tech_tag.map((tag,indext)=>{
                                return (
                                    <span className="Tech tagItem" key={indext}>{tag}</span>
                                )
                            })
                        }
                    </div>
                    {
                        this.props.item.video?
                        <div className="OrgTipArr OrgTipVideo">
                           {
                                this.props.item.userId !== 132? <span>{this.props.showdata.video}</span>:
                                this.props.chiFlag === "chi"?<span>openEuler项目任务视频讲解合集 </span>: <span>openEuler project introduction video list  </span>
                               
                           }
                            &nbsp;
                           
                            <span className="OrgTipVideoButton" onClick={()=>{gourl(this.props.item.video)}}></span>
                        </div>:""

                    }
                    
                    <div className="OrgTipButton" 
                    onClick={()=>{this.goOrgDetail()}}
                    >{this.props.showdata.button}</div>

                </div>
                
            </div>
         )
       
        
        
    }
}

const mapStateToProps = (state)=>{

     return {
        chiFlag:state.homepage.chiFlag
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        setOrgDetail:(data)=>{
            dispatch({
                type:'setOrgDetail',
                payload:data
            })
        },
    }
}
 
 export default connect(mapStateToProps,mapDispatchToProps)(OrgTip)