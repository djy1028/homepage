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
        const [Midtermdata,setMidtermdata] = useState([])
        const [searchdatastock,setSearchdatastock] = useState([])
        const [datastock,setDatastock] = useState(proData)
    
     useEffect(()=>{
        getData()   
     },[])
 
     const getPageData=(page)=>{
        setPage(page)
        setMidtermdata(datall.slice(pagesize*(page-1),pagesize*page))
     }
 
     const filterItem=(value)=>{  
      
         if(value){
            const showdataTemp = datastock.filter((item)=>item.name.includes(value))
            setDataall(showdataTemp)  
            setMidtermdata(showdataTemp.slice(pagesize*(page-1),pagesize*page))  
            setSearchdatastock(showdataTemp)  
            setPage(1)
         }else{

            setDataall(datastock)
            setMidtermdata(datastock.slice(pagesize*(page-1),pagesize*page))     
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
         setMidtermdata(sortDatall.slice(0,pagesize))
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
                    <div className = {props.chiFlag === 'chi'?"midtermtextchi":"midtermtexten"} >
                        {showdata.banner_text}
                    </div>
                </div>
            </div>       
            <div className="Midterm">
                <div className="ProjectListBanner ">
                    <Search                      
                            placeholder={showdata.searchPlaceholder}
                            allowClear
                            size="large"
                            onSearch={value =>filterItem(value)}
                        />
                </div> 
                <div className="MidtermWrapper">
                    <div className="content1200">
                        <div  className="MidtermPageState">
                            <div className="MidtermPage">
                                <span className="MidtermPageItemOne">{showdata.pronum[0]} {datalllength} {showdata.pronum[1]}</span>
                                <span className="MidtermPageItem">
                                    {showdata.pagenum[0]}{page} {showdata.pagenum[1]} 
                                    <span className="MidtermPageItemSum">{showdata.pagesum[0]} {Math.ceil(datalllength/pagesize)} {showdata.pagesum[1]}</span>
                                </span>
                            </div>
                    
                        </div>
                    </div>

                    <div className="content1200">
                    
                    <div className="Midterm">
                        <span className = 'sortDescription'>{showdata.sortDes}</span>
                        <div className="MidtermLine Header">
                            <span className="MidtermID ">{showdata.studentName}</span>
                            <span className="MidtermName">{showdata.projectName}</span>
                            <span className="MidtermCommunity">{showdata.projectCommunity}</span>
                            <span className="MidtermStudent">{showdata.communityTeacher}</span>
                            <span className="MidtermStudent">{showdata.midtermresult}</span>
                            <span className="MidtermOperation">
                                <span>{showdata.storage}</span>
                            </span>
                        </div>
                        {     
                            Midtermdata.map((item,index)=>{
                                return(
                                    <div className="MidtermLine Item" key={index}>
                                        <span className="MidtermID ">{item.name}</span>
                                        <span className="MidtermName" onClick={()=>{gohashlink(item.anchor,item.projectid)}}>
                                            {getSplit( item.projectname,props.chiFlag)}
                                        </span> 
                                        <span className="MidtermCommunity">
                                            {getSplit( item.communityname,props.chiFlag)}
                                        </span>
                                        <span className="MidtermStudent">{item.tutor}</span>
                                        <span className="MidtermStudent">{showdata.pass}</span>
                                        <span className="MidtermRes">
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
        chiFlag: state.homepage.chiFlag,
        studata:state.homepage.studata
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
