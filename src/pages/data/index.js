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

 import React,{useEffect,useRef} from 'react'
 import './worldmap'
 import './index.less';
 import { connect } from 'react-redux';
 import ReactEChartsCore from 'echarts-for-react/lib/core';
 import * as echarts from 'echarts/core';
 import {SVGRenderer} from 'echarts/renderers';
 import {BarChart} from 'echarts/charts';
 import {
    LegendPlainComponent,
    GridComponent,
    DataZoomInsideComponent,
    ToolboxComponent,
    TooltipComponent,
    DataZoomSliderComponent,
    VisualMapComponent,
    TitleComponent,
    GeoComponent
  } from 'echarts/components';
import option from '../../data/dataresult.json'  //活动数据页面配置集合
import MapOption from '../../components/mapdata/index' //地图配置
import {fontSize,calculateWidth,setPercentage,adaptive} from './utils.js'

echarts.use(
    [
        LegendPlainComponent,
        TitleComponent,
        DataZoomInsideComponent,
        DataZoomSliderComponent,
        ToolboxComponent,
        TooltipComponent,
        GridComponent,
        VisualMapComponent,
        GeoComponent,
        BarChart,
        SVGRenderer
    ]
);
//设置项目数据tooltip百分比的格式
option.en.pro_data.bar_one.option.tooltip.formatter = setPercentage
option.chi.pro_data.bar_one.option.tooltip.formatter = setPercentage


function Data(props){
    let showdata = option[props.chiFlag]
    const instance0 = useRef(null);
    const instance1 = useRef(null);
    const instance2 = useRef(null);
    const instance3 = useRef(null);
    const instance4 = useRef(null);

    useEffect(()=>{      
        //监听resize事件，字体、宽度随屏幕大小自适应
        window.addEventListener(
            "resize",adaptive(instance0,instance1,instance2,instance3,instance4,true,props.chiFlag),false
        );
    },[])

    useEffect(()=>{
        adaptive(instance0,instance1,instance2,instance3,instance4,false,props.chiFlag)
    },[props.chiFlag])

    

    return(         
        <div className="datas">
            <div className="datas_header"> 
                <div className ="datas_header_des"> 
                    <div className = "datas_title">
                        {showdata.banner_title}
                    </div>
                    <div className = "datas_text">
                        {showdata.banner_text}
                    </div>
                </div>
            </div> 
            <div className = "datas_content_show content1200">
                {/* 项目数据 */}
                <div className = "pro_data">
                    <div className = "pro_data_title">
                        {showdata.pro_data.name}
                    </div>
                    <div className = "pro_data_bar1">
                        <ReactEChartsCore
                            echarts={echarts}
                            option={showdata.pro_data.bar_one.option}
                            ref={instance0}
                         
                            />
                    </div>
                    <div className="pro_data_divide"></div>
                    <div className = "pro_data_bar2title">
                        {showdata.pro_data.bar_two.title}
                    </div>
                    <div className = "pro_data_bar2">
                        <ReactEChartsCore
                            echarts={echarts}
                            option={showdata.pro_data.bar_two.option}
                            ref={instance1}
                            opts={{renderer: 'svg'}}
                            />
                    </div>
                    <div className="pro_data_divide"></div>
                    <div className = "pro_data_bar3title">
                        {showdata.pro_data.bar_three.title}
                    </div>
                    <div className = "pro_data_bar3">
                        <ReactEChartsCore
                            echarts={echarts}
                            option={showdata.pro_data.bar_three.option}
                            ref={instance2}
                            />
                    </div>
                </div>

                {/* 学生数据 */}
                <div className ='stu_data'>
                    <div className = "stu_data_title">
                            {showdata.stu_data.name}
                    </div>
                    <div className = "stu_data_des">
                        {
                            showdata.stu_data && showdata.stu_data.stu_data_des.map((ele,index) => {
                                return (
                                    <div key={index} className = "stu_data_desItem">
                                        <div className = "stu_data_desInfo">
                                            <div className = 'stu_data_desItem_key'>
                                                {Reflect.ownKeys(ele)[0]}
                                            </div>
                                            {
                                                <div className = 'stu_data_desItem_val'>
                                                    {ele[Reflect.ownKeys(ele)[0]]}
                                                    {props.chiFlag == 'chi' && ele[Reflect.ownKeys(ele)[0]]?<span className = "stu_data_unit">{index == 1? '次':'名'}</span>:''} 
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }                
                    </div>
                    <div className = "stu_data_bar2_title">
                        {showdata.stu_data.bar_two.title}
                    </div>
                    <div className = "stu_data_bar2">
                        <ReactEChartsCore
                            echarts={echarts}
                            option={showdata.stu_data.bar_two.option}
                            ref={instance3}
                            opts={{renderer: 'svg'}}
                        />
                    </div>
                </div>

                {/* 组织数据 */}
                <div className = "org_data">
                    <div className = "org_data_title">
                        {showdata.org_data.name}
                    </div>
                    <div className = "org_data_des">
                        {
                            showdata.org_data && showdata.org_data.org_data_des.map((ele,index) => {
                                return (
                                    <div key={index} className = "org_data_desItem">
                                        <div className = "org_data_desInfo">
                                            <div className = "org_data_desItem_key">
                                                {Reflect.ownKeys(ele)[0]}
                                            </div>
                                            <div className = "org_data_desItem_val">
                                                {ele[Reflect.ownKeys(ele)[0]]}{props.chiFlag == 'chi'?'个':''}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }                
                    </div>
                    <div className = "org_data_bar1_title">
                        {showdata.org_data.bar_one.title}
                    </div>
                    <div className = "org_data_bar1">
                        <div className = "org_map">
                            <ReactEChartsCore
                                echarts={echarts}
                                option={MapOption(props.chiFlag)}
                                ref={instance4}
                            />
                        </div>
                        <div className = "org_map_des">
                            {
                                showdata.org_data.bar_one.bar_des.map((item,index)=>{
                                    return <div className = "org_map_desItem" key={index}>{Reflect.ownKeys(item)[0]+ " "+ item[Reflect.ownKeys(item)[0]]} {props.chiFlag=="chi"?"所":""}</div>
                                })
                            }
                        </div>
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