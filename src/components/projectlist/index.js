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
import { Input, Space } from 'antd';
import data from '../../data/orglist2021.json';
import projectlist from '../../data/projectlist.json';
import ProjectModal from '../projectModal/index.js';
import { Pagination } from 'antd';
const { Search } = Input;

class Projectlist extends React.Component{
    constructor(props){
       super(props)
       this.state ={
           showdata:[],
           page:1,
           pagesize:10,
           datall: this.getData(),
           datastock:[],
        
       }
    }

   

    filterItem(value){
       
        if(value){
            var showdataTemp = []
            this.state.datall.map((item)=>{
                if(item.label.toString().includes(value)||
                item.name.toLocaleLowerCase().includes(value)||
                item.description.toLocaleLowerCase().includes(value)){
                    showdataTemp.push(item)
                }
                return 0;
            })
            
            this.setState({
                datall:showdataTemp,
                page:1,
                
            })
        }else{
           
            this.setState({
                datall:this.state.datastock,
                pagenow:1,
                
            })

        }
        
        
        setTimeout(()=>{
            this.getPageData(1)
        },100)
        
        
        return 0;
    }

    componentDidMount(){       
        this.getPageData(1)
        this.setState({
            datastock:this.state.datall
        })
    }

    getPageData(page){
        this.setState({
            showdata:this.state.datall.slice(this.state.pagesize*(page-1),this.state.pagesize*page),      
        })     
    }

    getData(){
        var prodata = []
        data.map((item)=>{
            let _arr = []         
            item.project_list.map((items) => {           
                _arr.push(Object.assign({},items,{orgtitle: item.title}))            
            })
            prodata = prodata.concat(_arr)         
        })
       
        return prodata
    }

    itemRender(current, type, originalElement) {
        if (type === 'prev') {
          return <a>上一页</a>;
        }
        if (type === 'next') {
          return <a>下一页</a>;
        }
        return originalElement;
      }

    onChange = page => {
        this.setState({
            page: page,
            showdata:this.state.datall.slice(this.state.pagesize*(page-1),this.state.pagesize*page)
        });
    };



 


    render(){
        let showdata = projectlist[this.props.chiFlag]
        return(         
            <div className="Projectlist">
               <div className="ProjectListBanner">
                <Search
                        
                        placeholder={showdata.searchPlaceholder}
                        allowClear
                        size="large"
                        onSearch={value => this.filterItem(value)}
                    />
                    <div className="ProjectListRank">
                        {/* <span className="ProjectListRankItem ">{showdata.order[0]}</span> */}
                        <span className="ProjectListRankItem">{showdata.order[1]}</span>
                    </div>           
               </div> 
               <div className="ProjectListPageState">
                    <div className="ProjectListPage">
                        <span className="ProjectListPageItemOne">{showdata.pronum[0]}{this.state.datall.length}{showdata.pronum[1]}</span>
                        <span className="ProjectListPageItem">
                            {showdata.pagenum[0]}{this.state.page}{showdata.pagenum[1]} 
                            <span className="ProjectListPageItemGap">/ </span>
                            <span className="ProjectListPageItemSum">{showdata.pagesum[0]}{Math.ceil(this.state.datall.length/this.state.pagesize)}{showdata.pagesum[1]}</span>
                        </span>
                    </div>
                    <div className="ProjectListApplyState">{showdata.applyState[0]}</div>
                </div>
               <div className="projectListWrapper">
                   {
                       this.state.showdata.map((item,index)=>{
                           return (
                                <ProjectModal showdata={showdata} item={item} key={index}/>
                           )
                       })
                   }
               </div>
               <Pagination 
                defaultCurrent={this.state.page} 
                defaultPageSize ={this.state.pagesize} 
                total={this.state.datall.length} 
                itemRender={this.itemRender}
                onChange={this.onChange}
                showSizeChanger={false}
                />
               

            </div>
         )
       
        
        
    }
}

const mapStateToProps = (state)=>{

    return {
       chiFlag:state.homepage.chiFlag
   }
 }

export default connect(mapStateToProps)(Projectlist)