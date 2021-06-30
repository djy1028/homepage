export default function MapOption(lang){
    let chiSet = {
        geoCoordMap :{
            中国: [116.512885, 39.847469],
            荷兰: [4.89354, 52.370649],
            英国: [-1.657222, 51.886863],
            德国: [10.01959, 54.38474],
            巴西: [-48.678945, -10.493623],
            埃及: [31.815593, 31.418032],
            西班牙: [2.175129, 41.385064],
            新加坡: [103.413384, 1.910925],
            印度: [77.206503, 28.62928],
            美国: [-73.97622, 40.757498],
            加拿大: [-109.404347, 60.638178],
            澳大利亚: [137.708144, -25.328065],
            马来西亚: [101.681865, 3.136134],
            斯里兰卡: [79.865104, 6.909415],
            新西兰: [174.761827, -41.291661],
            丹麦: [12.431735, 55.665973],
            日本: [139.713657, 35.707004],
            瑞士: [7.44716, 46.950139],
            韩国: [126.986407, 37.536804],
            尼泊尔: [85.320511, 27.711]
        
        },
        BJData :[
       
            [{
                name: "中国",
                value: 342
            }],
            [{
                name: "荷兰",
                value: 2
            }],
            [{
                name: "印度",
                value: 31
            }],
            [{
                name: "英国",
                value: 11
            }],
            [{
                name: "德国",
                value: 5
            }],
            [{
                name: "巴西",
                value: 1
            }],
            [{
                name: "埃及",
                value: 2
            }],
            [{
                name: "西班牙",
                value: 1
            }],
            [{
                name: "马来西亚",
                value: 2
            }],
        
            [{
                name: "澳大利亚",
                value: 3
            }],
            [{
                name: "新加坡",
                value: 2
            }],
            [{
                name: "美国",
                value: 27
            }],
            [{
                name: "加拿大",
                value: 11
            }],
            [{
                name: "斯里兰卡",
                value: 1
            }],
            [{
                name: "新西兰",
                value: 1
            }],
            [{
                name: "丹麦",
                value: 1
            }],
            [{
                name: "日本",
                value: 1
            }],
            [{
                name: "瑞士",
                value: 1
            }],
            [{
                name: "韩国",
                value: 1
            }],
            [{
                name: "尼泊尔",
                value: 1
            }],
        ]
    }

    let enSet = {
        geoCoordMap :{
            China: [116.512885, 39.847469],
            Netherlands: [4.89354, 52.370649],
            UK: [-1.657222, 51.886863],
            Germany: [10.01959, 54.38474],
            Brazil: [-48.678945, -10.493623],
            Egypt: [31.815593, 31.418032],
            Spain: [2.175129, 41.385064],
            Singapore: [103.413384, 1.910925],
            India: [77.206503, 28.62928],
            USA: [-73.97622, 40.757498],
            Canada: [-109.404347, 60.638178],
            Australia: [137.708144, -25.328065],
            Malaysia: [101.681865, 3.136134],
            SriLanka: [79.865104, 6.909415],
            NewZealand: [174.761827, -41.291661],
            Denmark: [12.431735, 55.665973],
            Japan: [139.713657, 35.707004],
            Switzerland: [7.44716, 46.950139],
            Korea: [126.986407, 37.536804],
            Nepal: [85.320511, 27.711]
            
        },
        BJData :[
        
        [{
        name: "China",
        value: 342
        }],
        [{
        name: "Netherlands",
        value: 2
        }],
        [{
        name: "India",
        value: 31
        }],
        [{
        name: "UK",
        value: 11
        }],
        [{
        name: "Germany",
        value: 5
        }],
        [{
        name: "Brazil",
        value: 1
        }],
        [{
        name: "Egypt",
        value: 2
        }],
        [{
        name: "Spain",
        value: 1
        }],
        [{
        name: "Malaysia",
        value: 2
        }],
        [{
        name: "Australia",
        value: 3
        }],
        [{
        name: "Singapore",
        value: 2
        }],
        [{
        name: "USA",
        value: 27
        }],
        [{
        name: "Canada",
        value: 11
        }],
        [{
        name: "SriLanka",
        value: 1
        }],
        [{
        name: "NewZealand",
        value: 1
        }],
        [{
        name: "Denmark",
        value: 1
        }],
        [{
        name: "Japan",
        value: 1
        }],
        [{
        name: "Switzerland",
        value: 1
        }],
        [{
        name: "Korea",
        value: 1
        }],
        [{
        name: "Nepal",
        value: 1
        }],
        ]
    }
    
    let languageSet = lang == 'en'?enSet:chiSet
    let series = [];
    [
        [languageSet.BJData]
    ].forEach(function(item, i) {
        series.push({
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
                //涟漪特效
                period: 4, //动画时间，值越小速度越快
                brushType: "stroke", //波纹绘制方式 stroke, fill
                scale: 4 ,//波纹圆环最大限制，值越大波纹越大
            },
            label: {
                show: true,
                position: "right", //显示位置
                // offset: [3, 0], //偏移设置
                formatter: "{b}",//圆环显示文字
                backgroundColor:"transparent" //设置label文字背景为空
            },
            symbol: "circle",
            symbolSize: function(val) {
                return 7 + val[2] / 100; //圆环大小
            },
            itemStyle: {
                show: true,
                textShadowColor:"transparent"
            },
            emphasis: {
                itemStyle:{
                    show: true,
                    color: "#FF6A6A"
                },
                label:{
                    show: true,
                    color: "#FF6A6A"
                }
            },
            data: item[0].map(function(dataItem) {
                return {
                    name: dataItem[0].name,
                    value: languageSet.geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                };
            })
        }
       
        );
    });
    let option = {
        backgroundColor: '#75adfa',
        tooltip: {
            trigger: "item",
            backgroundColor: "#fff",
            borderColor: "#FFFFCC",
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: "z-index:100",
            formatter: function(params, ticket, callback) {
                //根据业务自己拓展要显示的内容
                let html ='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+params.color+';"></span>' + params.name+" &nbsp" + params.value[params.seriesIndex + 2];
                return html;
            }
        },
        visualMap: {
            //图例值控制
            show: false,
            type: 'piecewise',
            pieces: [{
                    max: 10,
                    color: 'green'
                },
                {
                    min: 10,
                    max: 100,
                    color: 'yellow'
                },
                {
                    min: 100,
                    color: 'red'
                }
            ],
            calculable: true,
        },
        geo: {
            map: "world",
            show: true,
            roam: true, //是否允许缩放
            layoutCenter: ["43%", "50%"], //地图位置
            layoutSize: "185%",
            itemStyle: {
                show: 'true',
                color: "#fff", //地图背景色
                borderColor: "#5bc1c9"//省市边界线
            },
            emphasis: {
                itemStyle:{
                    show: 'true',
                    color: "rgba(37, 43, 61, .5)" //悬浮背景
                },
                label:{
                    show: false
                }
               
            }
        },
        legend: {
            orient: 'vertical',
            top: '30',
            left: 'center',
            align:'right',
            itemWidth:50,
            itemHeight:30,
            selectedMode: 'multiple'
        },
        series: series
    };
    return option
}