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

 import React,{useState,useEffect} from 'react'
 import pinyin from 'pinyin';
 import _ from 'lodash'
 import './index.less';
 import { connect } from 'react-redux';
 import { Input } from 'antd';
//  import proData from '../../data/proList.json';
 import proData from '../../data/midtermdata.json';
 import midtermlist from '../../data/midterm.json';
 import {  Pagination } from 'antd';
 import {getSplit,gohash} from "../../util/url.js";
 
 const { Search } = Input;
 
 
 const Midtermdata = (props) =>{
        const [page,setPage] = useState(1)
        const [pagesize,setPagesize] = useState(100)
        const [datall,setDataall] = useState(proData)
        const [projectlistdata,setProjectlistdata] = useState([])
        const [searchdatastock,setSearchdatastock] = useState([])
        const [datastock,setDatastock] = useState(proData)
    
     useEffect(()=>{
        getData()   
     },[])
 
     const getPageData=(page)=>{
        setPage(page)
        setProjectlistdata(datall.slice(pagesize*(page-1),pagesize*page))
     }
 
     const filterItem=(value)=>{  
      
         if(value){
            const showdataTemp = datastock.filter((item)=>item.name.includes(value))
            setDataall(showdataTemp)  
            setProjectlistdata(showdataTemp.slice(pagesize*(page-1),pagesize*page))  
            setSearchdatastock(showdataTemp)  
            setPage(1)
         }else{

            setDataall(datastock)
            setProjectlistdata(datastock.slice(pagesize*(page-1),pagesize*page))     
            setSearchdatastock([])  
            setPage(1)
         }       
     }
 
 
     const getData=()=>{
         //处理中选项目按学生姓名排序
         let oriPro = datall
         oriPro.forEach((item)=>{
             item.selectedStudentList = [item.name]
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
         setDataall(sortDatall)
         setDatastock(sortDatall)
         setProjectlistdata(sortDatall.slice(0,pagesize))
     }
 
     const itemRender=(current, type, originalElement)=> {
         if(props.chiFlag === "chi"){
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
 
     const onChange = page => {
        getPageData(page)
     };
 
     const gohashlink=(orgtitle,proid)=>{
        let url = "/org/orgdetail/"+orgtitle
        if(proid){
            url += "/proid"+proid
        }
        gohash(url)
        props.setOrgTabFlag("orglist")
     }
 
 
    let showdata = midtermlist[props.chiFlag]
    let datalllength = datall.length
    return(
        <div className="midterm">   
            <div className="midtermheader"> 
                <div className ="midtermheader_des"> 
                    <div className = {props.chiFlag === 'chi'?"midtermtitlechi":"midtermtitleen"} >
                        {showdata.banner_title}
                    </div>
                    <div className = {props.chiFlag === 'chi'?"midtermtitlechi":"midtermtitleen"} >
                        {showdata.banner_text}
                    </div>
                </div>
            </div>       
            <div className="Projectlist">
                <div className="ProjectListBanner ">
                    <Search                      
                            placeholder={showdata.searchPlaceholder}
                            allowClear
                            size="large"
                            onSearch={value =>filterItem(value)}
                        />
                </div> 
                <div className="projectListWrapper">
                    <div className=" content1200">
                        <div  className="ProjectListPageState">
                            <div className="ProjectListPage">
                                <span className="ProjectListPageItemOne">{showdata.pronum[0]} {datalllength} {showdata.pronum[1]}</span>
                                <span className="ProjectListPageItem">
                                    {showdata.pagenum[0]}{page} {showdata.pagenum[1]} 
                                    <span className="ProjectListPageItemSum">{showdata.pagesum[0]} {Math.ceil(datalllength/pagesize)} {showdata.pagesum[1]}</span>
                                </span>
                            </div>
                    
                        </div>
                    </div>

                    <div className="ProjectListLCWrapper content1200">
                    
                    <div className="ProjectListLC">
                        <span className = 'sortDescription'>{showdata.sortDes}</span>
                        <div className="ProjectListLCLine Header">
                            <span className="ProjectListLCID ">{showdata.studentName}</span>
                            <span className="ProjectListLCName">{showdata.projectName}</span>
                            <span className="ProjectListLCCommunity">{showdata.projectCommunity}</span>
                            <span className="ProjectListLCStudent">{showdata.communityTeacher}</span>
                            <span className="ProjectListLCStudent">{showdata.midtermresult}</span>
                            <span className="ProjectListLCOperation">
                                <span>{showdata.storage}</span>
                            </span>
                        </div>
                        {     
                            projectlistdata.map((item,index)=>{
                                return(
                                    <div className="ProjectListLCLine Item" key={index}>
                                        <span className="ProjectListLCID ">{item.name}</span>
                                        {/* <span className="ProjectListLCName" onClick={()=>{gohashlink(item.anchor,item.label)}}>
                                            
                                            {getSplit( item.name,props.chiFlag)}
                                        </span> */}
                                        <span className="ProjectListLCName" onClick={()=>{gohashlink('',item.projectid)}}>
                                            
                                            {getSplit( item.projectname,props.chiFlag)}
                                        </span> 
                                        {/* <span className="ProjectListLCCommunity" onClick={()=>{gohashlink(item.anchor)}}>
                                            {getSplit( item.orgname,props.chiFlag)}
                                        </span> */}
                                        <span className="ProjectListLCCommunity" onClick={()=>{gohashlink(item.communityname)}}>
                                            {getSplit( item.communityname,props.chiFlag)}
                                        </span>
                                        <span className="ProjectListLCStudent">{item.tutor}</span>
                                        <span className="ProjectListLCStudent">{showdata.pass}</span>
                                       
                                        <span className="ProjectListRes">
                                            <span onClick={()=>window.open(item.repolink)}>{showdata.access}</span>
                                         
                                        </span>
                                    </div>
                                )

                            }) 
                        }
                    </div>
                    </div>
                    <div className=" content1200">
                        <Pagination 
                            current={page}
                            defaultPageSize ={pagesize} 
                            total={datalllength} 
                            itemRender={itemRender}
                            onChange={onChange}
                            showSizeChanger={false}
                        /> 
                    </div>
            </div>
            </div>
        </div>
    )

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
 
 export default connect(mapStateToProps,mapDispatchToProps)(Midtermdata)
