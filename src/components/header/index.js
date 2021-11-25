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
import data from './../../data/nav.json';
import {titleChange,gohash} from './../../util/url.js';
import { getToken, logout } from 'auth-provider';
import { submitLogout } from 'store/redux/userRedux';
class Header extends React.Component{
    constructor(props){
       super(props)
       this.state ={         
            chiFlag:"chi",
            data,
            // pageflag:"index",
            moblieListFlag:false,
            
       }
    }

   
    switchFlag(msg){
        msg === 'chi'?this.props.chiFlag_chi():this.props.chiFlag_en();
        this.setState({
            chiFlag:msg
        })     
    }

    headerlist(flag){
        this.setState({
            moblieListFlag:flag
        })
    }

    getLink(title){
        gohash("/"+title)
        this.headerlist(false)
    }

    goPage(linkurl){
        if (linkurl !== "dataall" || linkurl !== "loginall") {
          
            this.props.setPageFlag(linkurl == 'data' || linkurl === 'midtermdata' ? 'dataall' : linkurl.includes("Login") ? "loginall" : linkurl)
            gohash("/"+linkurl)
            if(linkurl === "org"){
                this.props.setOrgTabFlag("orglist")
            }
        }
    }

    parseQueryString(url) {
        var obj = {};
        var keyvalue = [];
        var key = "",
            value = "";
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        for (var i in paraString) {
            keyvalue = paraString[i].split("=");
            key = keyvalue[0];
            value = keyvalue[1];
            obj[key] = value;
        }
        return obj;
    }
    
    componentDidMount(){

        //1.0 浏览器语言不是中文的切换到英文版本展示
        if(window.navigator && window.navigator.language){
            if(window.navigator.language.toLocaleLowerCase() !== "zh-cn" && window.navigator.language.toLocaleLowerCase() !== "zh"){
                this.switchFlag('en')
            }
        }

       
       titleChange();

       //2.0 查看有无语言标志位
       const langc = this.parseQueryString(window.location.hash)
       if(langc.hasOwnProperty("lang")){
            this.switchFlag(langc["lang"])
       }

       //3.0 查看当前hash
        let hashu = window.location.hash && window.location.hash.split("?")[0].split("#/")[1].split("/")[0]
       
       this.props.setPageFlag(hashu||'homepage')

       setTimeout(()=>{
           let hashopl = window.location.hash.split("#/");         
           if(hashopl[1] === ""){
               window.history.replaceState('','',window.location.pathname)
           }
       },5) 

   }

    gosummer2020(){
       window.open("https://isrc.iscas.ac.cn/summer2020/")
    }
    gosummerbackend() {
        window.open("https://test-portal.summer-ospp.ac.cn/")
    }

    logout() {
        const that = this
        logout().then(() => {
            window.history.replaceState('studentLogin', '', '/')
            that.props.setLogout()
            // queryClient.clear()
        })
    }

    

    
    render(){
        let showdata = this.state.data[this.state.chiFlag]
        let link = this.state.data.link
        let pageflagredux = this.props.pageflag
        console.log(pageflagredux)
        console.log(getToken())
        return(         
            <div className={["header", this.state.chiFlag].join(" ")}>
                <div className="content1200 headerContent">
                    <div className="osscHeaderLogo" onClick={()=>{this.goPage("homepage")}}></div>
                    <div className="headerList">
                    <div className="headerTabWrapper">
                        {
                            showdata.linkdata.map((ele,index)=>{
                                const linkurl = link[index]
                                return (
                                    <div key={index} className={[pageflagredux ===linkurl?"active":"" ,"headerWrapItem", linkurl].join(" ")}>
                                        <div 
                                            onClick={()=>{this.goPage(linkurl)}}
                                            className={[ this.state.chiFlag == "chi"?"headerTabItem":"headerTabItemEn","headerNav"].join(" ")}>
                                            <span>{ele.name}</span>
                                        </div> 
                                        {
                                            ele.content?
                                            <div className="osscListLine" style={{width:this.props.chiFlag === 'chi'?'calc(100% + 40px)':'calc(100% + 100px)'}}>
                                                {
                                                    ele.content.map((sitem,sindex)=>{
                                                        return(
                                                            <div className="osscListLineItem" style={{fontSize:this.props.chiFlag === 'chi'?'16px':'14px'}} key={sindex} onClick={()=>{this.goPage(sitem.title)}}>{sitem.name}</div>
                                                        )
                                                    })
                                                }
                                            </div>:""
                                        }                                       
                                    </div>
                                )
                            })
                        }
                        <div onClick={()=>{this.gosummer2020()}} className={[this.state.chiFlag == "chi"?"headerTabItem":"headerTabItemEn","headerNav"].join(" ")} key="summer2020">
                                        <span>{showdata.summer2020}</span>
                        </div> 
                    </div>
                    <div className="headerChiEn headerTabItem" >
                            <div className="headerChi" onClick={()=>{this.switchFlag('chi')}}>中文</div>
                            <div className="headerEn" onClick={()=>{this.switchFlag('en')}}>ENG</div>
                    </div>
                    {
                            // getToken() ?
                            // <div className={["active", "headerWrapItem", "logout"].join(" ")}>
                            //         <div className={[this.state.chiFlag == "chi" ? "headerTabItem" : "headerTabItemEn", "headerNav"].join(" ")}>
                            //             <span>{showdata.logout.name}</span>
                            //         </div>
                            //         {
                            //             showdata.logout.content ?
                            //                 <div className="osscListLine" style={{ width: this.props.chiFlag === 'chi' ? 'calc(100% + 40px)' : 'calc(100% + 100px)' }}>
                            //                     {
                            //                         showdata.logout.content.map((sitem, sindex) => {
                            //                             return (
                            //                                 <div className="osscListLineItem" style={{ fontSize: this.props.chiFlag === 'chi' ? '16px' : '14px' }} key={sindex} onClick={() => logout()}>{sitem.name}</div>
                            //                             )
                            //                         })
                            //                     }
                            //                 </div> : ""
                            //         }

                            // </div> :
                                <div className={[pageflagredux === 'loginall' ? "active" : "", "headerWrapItem", "loginall"].join(" ")}>
                                    <div onClick={() => { this.goPage('loginall') }}
                                        className={[this.state.chiFlag == "chi" ? "headerTabItem" : "headerTabItemEn", "headerNav"].join(" ")}>
                                        <span>{showdata.login.name}</span>
                                    </div>
                                    {
                                        showdata.login.content ?
                                            <div className="osscListLine" style={{ width: this.props.chiFlag === 'chi' ? 'calc(100% + 40px)' : 'calc(100% + 100px)' }}>
                                                {
                                                    showdata.login.content.map((sitem, sindex) => {
                                                        return (
                                                            <div className="osscListLineItem" style={{ fontSize: this.props.chiFlag === 'chi' ? '16px' : '14px' }} key={sindex} onClick={() => { sindex === 0 ? this.goPage(sitem.title) : this.gosummerbackend() }}>{sitem.name}</div>
                                                        )
                                                    })
                                                }
                                            </div> : ""
                                    }
                                </div>
                    
                    }
                    
                     
                    <div className="headerMobileIcon" onClick={() => this.headerlist(true)}>
                    </div>

                    </div>
                    <div className={["headerMobileList" ,this.state.moblieListFlag?"displayblock":""].join(" ")}>
                        <div className="headerClose" onClick={()=>this.headerlist(false)}></div>
                        {
                            showdata.linkdata.map((item,index)=>{
                                const linkurl = link[index]
                                return (                            
                                    <div key={index}
                                        onClick={()=>this.getLink(linkurl)}
                                        className={["osscListItem",linkurl].join(" ")}>                                
                                        <span> {item.content?null:item.name}</span> 
                                        {
                                            item.content && item.content.map((sitem,sindex)=>{
                                                return(
                                                    <div className={["osscListItem",linkurl].join(" ")}  key={sindex} onClick={(e)=>{e.stopPropagation();this.getLink(sitem.title)}}>{sitem.name}</div>
                                                )
                                            })
                                                
                                        }                                      
                                    </div>
                                )
                            })
                        }
                        <div
                            onClick={()=>this.gosummer2020()}
                            className={["osscListItem"].join(" ")}>                                
                            <span>{showdata.summer2020}</span>                
                        </div>
                    </div>
                </div>

            </div>
         )
       
        
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        chiFlag_chi:()=>{
            dispatch({
                type:'chiFlag_chi'
            })
        },
        chiFlag_en:()=>{
            dispatch({
                type:'chiFlag_en'
            })
        },
        setOrgTabFlag:(data)=>{
            dispatch({
                type:'setOrgTabFlag',
                payload:data
            })
        },
        setPageFlag:(data)=>{
            dispatch({
                type:'setPageFlag',
                payload:data
            })
        },
        setLogout: () => dispatch(submitLogout())
    }
}



const mapStateToProps = (state)=>{
    
    return {
        pageflag:state.homepage.pageflag,
       
    }
 }

export default connect(mapStateToProps,mapDispatchToProps)(Header)