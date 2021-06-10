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
 import ReactEChartsCore from 'echarts-for-react/lib/core';
 import * as echarts from 'echarts/core';
 import {
    CanvasRenderer,
    // SVGRenderer,
  } from 'echarts/renderers';
  import {
    // LineChart,
    BarChart,
    // PieChart
  } from 'echarts/charts';
  import {
    LegendPlainComponent,
    GridComponent,
    DataZoomInsideComponent,
    ToolboxComponent,
    TooltipComponent,
    DataZoomSliderComponent,
    TitleComponent,
  } from 'echarts/components';
import option from '../../data/dataresult.json'

echarts.use(
    [LegendPlainComponent,TitleComponent,DataZoomInsideComponent,DataZoomSliderComponent,ToolboxComponent,TooltipComponent,GridComponent,BarChart, CanvasRenderer]
);

function Data(){
    const [options,setOptions] = useState(option)
    console.log(options.pro_data.bar_one.option)
    return(         
        <div className="datas">
            <picture className="datas_header">  
            <source srcSet="../../img/index/banner3.png" media="(min-width: 800px)" />  
            <source srcSet="medium.jpg" media="(min-width: 600px)" />  
            <img srcSet="small.jpg" />  
        </picture> 
        <div className = "datas_content_show">

            {/* 项目数据 */}
            <div className = "pro_data">
                <div className = "pro_data_title">
                    {option.pro_data.name}
                </div>
                <div className = "pro_data_bar1">
                    <ReactEChartsCore
                        echarts={echarts}
                        option={options.pro_data.bar_one.option}
                        notMerge={false}
                        lazyUpdate={false}
                        />
                </div>
                <div className="pro_data_divide"></div>
                <div className = "pro_data_bar2title">
                    {option.pro_data.bar_two.title}
                </div>
                <div className = "pro_data_bar2">
                    <ReactEChartsCore
                        echarts={echarts}
                        option={options.pro_data.bar_two.option}
                        />
                </div>
            </div>

             {/* 学生数据 */}
             <div className ='stu_data'>
                <div className = "stu_data_title">
                        {option.stu_data.name}
                </div>
                <div className = "stu_data_des">
                    {
                        option.stu_data && option.stu_data.stu_data_des.map((ele,index) => {
                            return (
                                <div key={index} className = "stu_data_desItem">
                                    <div className = "stu_data_desInfo">
                                        <div className = 'stu_data_desItem_key'>
                                            {Reflect.ownKeys(ele)[0]}
                                        </div>
                                        <div className = 'stu_data_desItem_val'>
                                            {ele[Reflect.ownKeys(ele)[0]]}
                                            <span className = "stu_data_unit">{index == 1? '次':'数'}</span> 
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }                
                </div>
                <div className = "stu_data_bar2_title">
                    {option.stu_data.bar_two.title}
                </div>
                <div className = "stu_data_bar2">
                    <ReactEChartsCore
                        echarts={echarts}
                        option={options.stu_data.bar_two.option}
                    />
                </div>
             </div>

             {/* 组织数据 */}
             <div className = "org_data">
                <div className = "org_data_title">
                    {option.org_data.name}
                </div>
                <div className = "org_data_des">
                    {
                        option.org_data && option.org_data.org_data_des.map((ele,index) => {
                            return (
                                <div key={index} className = "org_data_desItem">
                                    <div className = "org_data_desInfo">
                                        <div className = 'org_data_desItem_key'>
                                            {Reflect.ownKeys(ele)[0]}
                                        </div>
                                        <div className = 'org_data_desItem_val'>
                                            {ele[Reflect.ownKeys(ele)[0]] + '个'}
                                            {/* <span className = "org_data_unit">{'个'}</span>  */}
                                        </div>
                                    </div>
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
 
 const mapStateToProps = (state)=>{
     return {
         chiFlag:state.chiFlag
     }
  }
 
 
 export default connect(mapStateToProps)(Data)