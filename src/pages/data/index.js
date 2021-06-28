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
 import {CanvasRenderer,SVGRenderer} from 'echarts/renderers';
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
  

//自适应字体
function fontSize(res){
    let docEl = document.documentElement,
        clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1920);
    let result = 16;
    if(res * fontSize>=16){
        result = 16
    }
    else if(res * fontSize <= 12){
        result = 12
    }

    else {
        result = res * fontSize
    }

    return result;
}
//自适应宽度
function calculateWidth(wid){
    let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
    if (!clientWidth) return;
    let result = clientWidth * (wid / 1920);
    return result
}


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

const setPercentage = function (params) {
    let html
    switch(params[0].name){
        case "上线数" || "Total Projects":
            html= params[0].name+":"+877+ " 总占比:100%"+"<br>";
            break
        case "被申请数" || " Applied Projects":
            html=params[0].name+":"+798+ " 总占比:91%"+"<br>";
            break
        case "中选数" || "Selected Projects ":
            html=params[0].name+":"+470+ " 总占比:55%"+"<br>";
            break
        case "中期通过数（敬请期待）" || "Pass Mid-term Evaluation(Stay Tuned)":
            html="中期通过数"+":"+ 0 + " 总占比:0%"+"<br>";
            break
        case "结项数（敬请期待）" || "Pass Final-term Evaluation(Stay Tuned)":
                html="结项数"+":"+ 0 + " 总占比:0%"+"<br>";
                break
    }
   
    for(let i=0;i<params.length-3;i++){
      html+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+params[i].color+';"></span>'
    //   if(params[i].seriesName=="总占比"||params[i].seriesName=="The total percentage"){
    //     html+=params[i].seriesName+":"+params[i].value+"%<br>";
    //   }else 
      if(params[i].seriesName.length !=0){
        switch(params[i].name){
            case "上线数" || "Total Projects":
                html+=params[i].seriesName+":"+params[i].value+ "  占比:"+ (params[i].value/877*100).toFixed(2)+ "%" + "<br>";
                break
            case "被申请数" || " Applied Projects":
                html+=params[i].seriesName+":"+params[i].value+ "  占比:"+ (params[i].value/798*100).toFixed(2)+ "%"+ "<br>";
                break
            case "中选数" || "Selected Projects ":
                html+=params[i].seriesName+":"+params[i].value+ "  占比:"+ (params[i].value/470*100).toFixed(2)+ "%" + "<br>";
                break
            case "中期通过数（敬请期待）" || "Pass Mid-term Evaluation(Stay Tuned)":
                html+=params[i].seriesName+":"+params[i].value+ "  占比:"+ 0+ "%" + "<br>";
                break
            case "结项数（敬请期待）" || "Pass Final-term Evaluation(Stay Tuned)":
                html+=params[i].seriesName+":"+params[i].value+ "  占比:"+ 0+ "%" + "<br>";
                break
        }
      }
    }
    return html;
}
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
        const myChart0 = instance0 && instance0.current.getEchartsInstance();
        const myChart1 = instance1 && instance1.current.getEchartsInstance();
        const myChart2 = instance2 && instance2.current.getEchartsInstance();
        const myChart3 = instance3 && instance3.current.getEchartsInstance();
        const myChart4 = instance4 && instance3.current.getEchartsInstance();
        window.onresize = function(){
            myChart0 && myChart0.setOption({
                "xAxis": {
                    "type": "category",
                    "axisLabel": {
                        "width":calculateWidth(230),
                        "fontSize": fontSize(.16)
                    }
                },
                "yAxis": [
                    {
                        "position": "left",
                        "axisLabel": {
                            "fontSize": fontSize(.16),
                        }
                    },
                    {
                        "position":"right",
                        "axisLabel": {
                            "fontSize": fontSize(.16),
                        },
                    }
                ],
            })

            myChart3 && myChart3.setOption({
            "series": [
                {
                    "type":"bar",
                    "barWidth": fontSize(0.2),
                },
                {
                    "type":"bar",
                    "barWidth": fontSize(0.2),
                }
            ],
            "xAxis": [
                {
                    "type": "category",
                    "axisLabel": {
                        "fontSize": fontSize(.25)
                    }
                }
            ],
            })
            myChart0 && myChart0.resize();
            myChart1 && myChart1.resize();
            myChart2 && myChart2.resize();
            myChart3 && myChart3.resize();
            myChart4 && myChart4.resize();
        }
    },[])

    

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
                            notMerge={false}
                            lazyUpdate={false}
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