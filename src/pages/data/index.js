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
 import './index.less';
 import { connect } from 'react-redux';

 
 function Data(){

    return(         
        <div className="datas">
            <picture className="datas_header">  
            <source srcSet="../../img/index/banner3.png" media="(min-width: 800px)" />  
            <source srcSet="medium.jpg" media="(min-width: 600px)" />  
            <img srcSet="small.jpg" />  
        </picture> 
        <div className="datas_content_show">
            
        </div> 

        </div>
    )
 }
 
 const mapStateToProps = (state)=>{
     return {
         chiFlag:state.chiFlag
     }
  }
 
 
 export default connect(mapStateToProps)(Data)