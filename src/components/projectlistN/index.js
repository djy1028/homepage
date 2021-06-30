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
import pinyin from 'pinyin';
import _ from 'lodash'
import './index.less';
import { connect } from 'react-redux';
import { Input } from 'antd';
import proData from '../../data/proList.json';
import projectlist from '../../data/projectlist.json';
import {  Pagination } from 'antd';
import { getSelectM,getSelectLang,getSelectDToChi,getLangDToChi,getTagSelect} from './util.js'
import {getSplit,gohash,getSupportLanguage,gourl,goenroll} from "../../util/url.js";
// import studata from '../../data/stunum.json'
import download from "../../img/download.png";
import pdf from './list.pdf'

const { Search } = Input;


class ProjectlistN extends React.Component{
    constructor(props){
       super(props)
       this.state ={   
           page:1,
           pagesize:100,
           datall: proData,        // 显示的project所有数据
           searchdatastock:[],      
           datastock:proData,      // project 所有数据
           projectlistdata:[],     // 单页显示的project数据
           degreeselect:"all",
           langSelect: "all",           //0,1,2
           tagSelect:"all",
           indexname:"",
           tipflag:true
           
       }
       this.itemRender = this.itemRender.bind(this)
    }

    componentDidMount(){         
        this.getData()   
    }

    getPageData(page){
        this.setState({
            page:page,
            projectlistdata:this.state.datall.slice(this.state.pagesize*(page-1),this.state.pagesize*page),       
        })  
    }

    filterItem(value){  
        this.setState({ 
            degreeselect:"all" ,
            langSelect: "all"  ,
            tagSelect:"all"        
        })
        if(value){
            var showdataTemp = []
            const valuel = value.toLowerCase()
            this.state.datastock.map((item)=>{           
                if(item.name.toLowerCase().includes(valuel)||
                item.tech_tag.toLowerCase().includes(valuel)||
                item.domain_tag.toLowerCase().includes(valuel)||
                item.orgname.toLowerCase().includes(valuel)||(item.selectedStudentList&&item.selectedStudentList.join(" ").includes(valuel))||
                item.label.includes(valuel)){
                    showdataTemp.push(item)
                }
                return 0;
            })           
            this.setState({
                datall:showdataTemp,
                searchdatastock:showdataTemp,
                page:1,
                
            })
        }else{
           
            this.setState({
                datall:this.state.datastock,  
                searchdatastock:[], 
                degreeselect:"all"           
            })

        }       
        setTimeout(()=>{
            this.getPageData(1)
        },100)
        
        
        return 0;
    }


    getData(){
        //处理中选项目按学生姓名排序
        let oriPro = this.state.datall
        oriPro.forEach((item)=>{
            if(item.selectedStudentList[0] != "-"){
                item["FL"] = item.selectedStudentList.map((itemPY)=>{
                    return pinyin(itemPY.substr(0,1), {style: pinyin.STYLE_FIRST_LETTER}).flat()[0]
                }).sort()[0]

               
            }
            else{
                item["FL"] = 'zzz'
            }
            item.selectedStudentList = item.selectedStudentList.sort(
                (param1, param2)=> param1.localeCompare(param2,"zh")
            )
        })
        let sortDatall = _.orderBy(oriPro,["FL"],["asc"])
      
        console.log(sortDatall)
        this.setState({
            datall:sortDatall,
            projectlist:sortDatall,
            projectlistdata:sortDatall.slice(0,this.state.pagesize)
        })

        // this.setState({
        //     projectlistdata:this.state.datall.slice(0,this.state.pagesize),
        // })
        
    }

    itemRender(current, type, originalElement) {
        if(this.props.chiFlag === "chi"){
            if (type === 'prev') {
                return <a>上一页</a>;
            }
            if (type === 'next') {
            return <a>下一页</a>;
            }

        }else{
            if (type === 'prev') {
                return <a>Previous</a>;
              }
              if (type === 'next') {
                return <a>Next</a>;
              }
        }
        
        return originalElement;
      }

    onChange = page => {
        this.getPageData(page)
    };

    gohashlink(orgtitle,proid){
        let url = "/org/orgdetail/"+orgtitle
        if(proid){
            url += "/proid"+proid
        }
        gohash(url)
        this.props.setOrgTabFlag("orglist")
    }


    filterTag(tag,flag){ 
        // 1.0 获取选择标签的值
        let {degreeselect,langSelect,tagSelect} = this.state
        degreeselect = flag === "degree" ? tag : degreeselect
        langSelect = flag === "lang" ? tag : langSelect
        tagSelect = flag === "tech" ? tag : tagSelect
        // 2.0 定义筛选出的数据数组
        let filterdata = [] 
        // 3.0 确定搜索的数组源
        let showdatastock = "datastock"
        if(this.state.searchdatastock.length>0){
            showdatastock = "searchdatastock"
        }
            
       
        if( degreeselect=== "all" && langSelect === "all"&& tagSelect === "all"){
            this.setState({
                datall:this.state[showdatastock],              
            })
        }else{
            
            const degree = getSelectDToChi(degreeselect)
            const langnum = getLangDToChi(langSelect)
            let tiaojian=[]
            if(degreeselect !== "all"){
                tiaojian.push("item.difficulty === degree")
            }
            if(langSelect!== "all"){
                tiaojian.push("[langnum,0].indexOf(item.spl)>-1")
            }
         
            if(tagSelect!=="all"){
               
                tagSelect = tagSelect.toLocaleLowerCase()+" "
                tiaojian.push("(item.tech_tag.toLocaleLowerCase()+' '+item.domain_tag.toLocaleLowerCase()).includes(tagSelect)")
            }
           

            filterdata = this.state[showdatastock].filter(item => {     
               
                const tech = (item.tech_tag.toLocaleLowerCase()+item.domain_tag.toLocaleLowerCase()).includes(tagSelect)
                      
               return eval(tiaojian.join("&&"))
                
            });
               
            this.setState({
                datall:filterdata,              
            })
        }
        

        setTimeout(()=>{
            this.getPageData(1)
        },100)
    }
    setDegree(tag){
        const tagen = getSelectM(tag)
        this.setState({
            degreeselect:tagen
        })
        this.filterTag(tagen,"degree")
    }

    setLang(item){
        
        const langtag = getSelectLang(item)
        this.setState({
            langSelect:langtag
        })
        this.filterTag(langtag,"lang")
    }

    setTag(item){
        const techtag = getTagSelect(item)
        this.setState({
            tagSelect:techtag
        })
        this.filterTag(techtag,"tech")
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

    setIndexPopOver(indexname){
        let indexl = indexname
        if(this.state.indexname === indexl){
            indexl = ""
        }
        this.setState({
            indexname:indexl
        })
    }

    setTipNone(){
        this.setState({
            tipflag:false
        })
    }

    goApply(){
        let url="https://portal.summer-ospp.ac.cn/summer/login?"
        if(this.props.chiFlag === "en"){
            gourl(`${url}lang=en_US`)
        }else{
            gourl(`${url}lang=zh_CN`)
        }
    }

    render(){
        let showdata = projectlist[this.props.chiFlag]
        let {projectlistdata,degreeselect,langSelect,datall,tagSelect} = this.state
        let datalllength = datall.length
        let {studata} = this.props
        return(         
            <div className="Projectlist">
               <div className="ProjectListBanner ">
                <Search                      
                        placeholder={showdata.searchPlaceholder}
                        allowClear
                        size="large"
                        onSearch={value => this.filterItem(value)}
                    />
                    {/* 功能未上线 */}
                    {/* <div className="ProjectListRank">
                        <span 
                            onClick={()=>{this.TabSelectOrder("community")}}
                            className={["ProjectListRankItem",this.state.orderSelect === "community"?"selectOrder":""].join(" ")}>
                                {showdata.order[0]}</span>
                        <span 
                            onClick={()=>{this.TabSelectOrder("proid")}}
                            className={["ProjectListRankItem",this.state.orderSelect === "proid"?"selectOrder":""].join(" ")}>
                                {showdata.order[1]}</span>
                    </div>            
                    */}
               </div> 
               <div className="projectListWrapper">
                    <div className=" content1200">
                        <div  className="ProjectListPageState">
                            <div className="ProjectListPage">
                                <span className="ProjectListPageItemOne">{showdata.pronum[0]} {datalllength} {showdata.pronum[1]}</span>
                                <span className="ProjectListPageItem">
                                    {showdata.pagenum[0]}{this.state.page} {showdata.pagenum[1]} 
                                    <span className="ProjectListPageItemSum">{showdata.pagesum[0]} {Math.ceil(datalllength/this.state.pagesize)} {showdata.pagesum[1]}</span>
                                </span>
                            </div>
                            <a className="ProjectListDownload" href={pdf} download="list.pdf">
                               {showdata.downloadTitle}
                                <img src={download} />
                            </a>
                        </div>
                        {/* <div className="ProjectListApplyState">{showdata.applyState[2]}</div> */}
                        <div className="ProjectListSelect">
                            <div className="ProjectListSelectItem Degree">
                                <span className="ProjectListSelectItemTitle" >{showdata.proDi}</span>
                                {
                                    showdata.prodegree.map((item,index)=>{
                                        return (
                                            <span 
                                            key={index} 
                                            onClick={()=>{this.setDegree(item)}}
                                            className={["ProjectListSelectItemContent",getSelectM(item) === degreeselect ? "ProjectListSelectTagDe":""].join(" ")}>
                                                {item}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                            <div className="ProjectListSelectItem Lang">
                                <span className="ProjectListSelectItemTitle" >{showdata.lang}</span>
                                {
                                    showdata.langtag.map((item,index)=>{
                                        return (
                                            <span 
                                            key={index} 
                                            onClick={()=>{this.setLang(item)}}
                                            className={["ProjectListSelectItemContent",getSelectLang(item) === langSelect ? "ProjectListSelectTagDe":""].join(" ")}>
                                                {item}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                            <div className="ProjectListSelectItem Tag">
                                <span className="ProjectListSelectItemTitle" >{showdata.tag}</span>
                                {
                                    showdata.taglist.map((item,index)=>{
                                        return (
                                            <span 
                                            key={index} 
                                            onClick={()=>{this.setTag(item)}}
                                            className={["ProjectListSelectItemContent",getTagSelect(item) === tagSelect ? "ProjectListSelectTagDe":""].join(" ")}>
                                                {item}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="ProjectListLCWrapper content1200">
                    
                    <div className="ProjectListLC">
                        <span className = 'sortDescription'>{showdata.sortDes}</span>
                        <div className="ProjectListLCLine Header">
                            <span className="ProjectListLCID ">{showdata.projectNumber}</span>
                            <span className="ProjectListLCName">{showdata.projectName}</span>
                            <span className="ProjectListLCCommunity">{showdata.projectCommunity}</span>
                            <span className="ProjectListLCLang">{showdata.language}</span>
                            <span className="ProjectListLCDegree">{showdata.proDegree}</span>
                            <span className="ProjectListLCNumber">{showdata.prostunum}</span>
                            <span className="ProjectListLCStudent">{showdata.selectedStudent}</span>
                            <span className="ProjectListLCOperation">
                                {/* <div className={["ProjectTip",this.state.tipflag && projectlistdata.length > 0?"":"displaynone"].join(" ")}>
                                    <div className="ProjectTipWeb" onClick={()=>this.goApply()}></div>
                                    <div className="ProjectTipWebClose" onClick={()=>{
                                        this.setTipNone()
                                    }}></div>
                                </div> */}
                                <span>{showdata.operation}</span>
                            </span>
                        </div>
                       
                        
                        {     
                            projectlistdata.map((item,index)=>{
                                return(
                                    <div className="ProjectListLCLine Item" key={index}>
                                        <span className="ProjectListLCID ">{item.label}</span>
                                        <span className="ProjectListLCName" onClick={()=>{this.gohashlink(item.anchor,item.label)}}>
                                            
                                            {getSplit( item.name,this.props.chiFlag)}
                                        </span>
                                        <span className="ProjectListLCCommunity" onClick={()=>{this.gohashlink(item.anchor)}}>
                                            {getSplit( item.orgname,this.props.chiFlag)}</span>
                                        <span className="ProjectListLCLang">{getSupportLanguage(item.spl)}</span>
                                        <span className="ProjectListLCDegree">{this.getDegreeBy(item.difficulty)}</span>
                                        <span className="ProjectListLCNumber">{studata[item.proid]||0}</span>
                                        <span className="ProjectListLCStudent">{item.selectedStudentList && item.selectedStudentList.join(" ")}</span>
                                        <span className="ProjectListLCOperation Item">
                                            <span className="PLOperationButton prodetail" onClick={()=>{this.gohashlink(item.anchor,item.label)}}>{showdata.operationbutton[0]}</span>                                           
                                            {/* <span 
                                            onClick={()=>{this.setIndexPopOver(index)}}
                                            className={["PLOperationButton","proapply",this.state.indexname === index?"show":""].join(" ")}>
                                                
                                                <span onClick={()=>{goenroll(item.proid,this.props.chiFlag)}}>{showdata.operationbutton[1]}</span>
                                                <span className="PLPopOver">
                                                    {showdata.popover[0]}<br/> 
                                                    {showdata.popover[1]}
                                                    <a href="https://portal.summer-ospp.ac.cn/summer/" target="_blank">
                                                        {showdata.popover[2]}
                                                    </a>
                                                </span>
                                            
                                            </span> */}
                                        </span>
                                    </div>
                                )

                            }) 
                        }
                    </div>
                    </div>
                    <div className=" content1200">
                    <Pagination 
                    current={this.state.page}
                    defaultPageSize ={this.state.pagesize} 
                    total={datalllength} 
                    itemRender={this.itemRender}
                    onChange={this.onChange}
                    showSizeChanger={false}
                    /> 

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
        setOrgTabFlag:(data)=>{
            dispatch({
                type:'setOrgTabFlag',
                payload:data
            })
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(ProjectlistN)