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
import data from '../../data/org.json';
import { connect } from 'react-redux';
import OrgTip from '../../components/OrgTip/index.js';
import {getSplit} from "../../util/url.js";
import { Input } from 'antd';
import orglist from "../../data/orglist2021.json";
import store from 'store';
const { Search } = Input;



class Orglist extends React.Component{
    constructor(props){
       super(props)
       this.state ={
           data,
           orgflag:"",
           showorglist:orglist,
           
       }

       this.closeModall  = this.closeModall.bind(this);    
    }



    openOrgModal(anchor){
        let flag = anchor;
        if(anchor === this.state.orgflag){
            flag=""
        }
        this.setState({
            orgflag:flag
        })
    }

    closeModall(){
        
        this.setState({
            orgflag:""
        })
    }

    filterItem(value){
       
        if(value){
            var showdataTemp = []
            value = value.toLocaleLowerCase()
            orglist.map((item)=>{
                
                if(item.title.toLocaleLowerCase().includes(value)||
                item.description.toLocaleLowerCase().includes(value)){
                    showdataTemp.push(item)
                }
                return 0;
            })
            
            this.setState({
                showorglist:showdataTemp
                
            })
        }else{
           
            this.setState({
                showorglist:orglist          
            })

        }            
        return 0;
    }
    render() {
        console.log(store.getState())
        let showdata = this.state.data[this.props.chiFlag]
        let showorglist = this.state.showorglist
        const lenorg = showorglist.length
        return(         
            <div className="Orglist  content1200">  
                <div className="OrglistSearch">  
                 <Search                      
                        placeholder={showdata.searchPlaceholder}
                        allowClear
                        size="large"
                        onSearch={value => this.filterItem(value)}
                    /></div>
                <div className="OrglistBanner">
                    <span className="OrglistBannerTotal">{showdata.total[0]}{lenorg}{showdata.total[1]}</span>
                    <span className="italic">{showdata.rank}</span>
                    
                </div>
                <div className="OrgListWrapper">
                    {                     
                        showorglist.map((item,index)=>{
                            //const iconUrl = require('./../../img/organisation/'+item.img).default;
                            return(
                                <div className="OrgListItem" key={index} >
                                    <div className="OrgListItemModal" onClick={()=>{this.openOrgModal(item.anchor)}}>
                                        <div className="OrgListItemModalImage" 
                                        style={{backgroundImage:`url(${process.env.PUBLIC_URL}/img/organisation/${item.img})`}}></div>
                                        <div className="OrgListItemModalTitle">
                                            {
                                                getSplit(item.title,this.props.chiFlag)
                                            }
                                        </div>
                                        <div className="OrgListItemModalDesc">
                                            {  getSplit(item.description,this.props.chiFlag)}
                                        </div>
                                    </div>
                                    <OrgTip 
                                        item={item} 
                                        showdata={showdata} 
                                        orgflag={this.state.orgflag} 
                                        closeModal={this.closeModall}
                                    />

                                </div>
                            )
                        })
                    }

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




export default connect(mapStateToProps)(Orglist)