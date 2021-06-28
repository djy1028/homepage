//自适应字体
export const fontSize = function (res){
    let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
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
export const calculateWidth = function (wid){
    let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
    if (!clientWidth) return;
    let result = clientWidth * (wid / 1920);
    return result
}
//自定义tooltip
export const setPercentage = function (params) {
    let html;
    if(params[0].name == "上线数" ||params[0].name == "Total Projects"){
        let content =  params[0].name == "上线数"?"  总占比":" Total Percentage"
        html= params[0].name+":"+877+ content +":100%"+"<br>";
    }
    else if(params[0].name == "被申请数" ||params[0].name == "Applied Projects"){
        let content =  params[0].name == "被申请数"?"  总占比":" Total Percentage"
        html=params[0].name+":"+798+ content +":91%"+"<br>";
    }
    else if(params[0].name == "中选数" ||params[0].name == "Selected Projects"){
        let content =  params[0].name == "中选数"?"  总占比":" Total Percentage"
        html=params[0].name+":"+470+content +":55%"+"<br>";
    }
    else if(params[0].name == "中期通过数（敬请期待）" ||params[0].name == "Pass Mid-term Evaluation(Stay Tuned)"){
        let content =  params[0].name == "中期通过数（敬请期待）"?"  总占比":" Total Percentage"
        let name = params[0].name == "中期通过数（敬请期待）"?"  中期通过数":" Pass Mid-term Evaluation"
        html=name +":"+ 0 + content + ":0%"+"<br>";
    }
    else if(params[0].name == "结项数（敬请期待）" ||params[0].name == "Pass Final-term Evaluation(Stay Tuned)"){
        let content =  params[0].name == "结项数（敬请期待）"?"  总占比":" Total Percentage"
        let name =  params[0].name == "结项数（敬请期待）"?"  结项数":" Pass Final-term Evaluation"
        html= name +":"+ 0 + content +":0%"+"<br>";
    }

    for(let i=0;i<params.length-3;i++){
      html+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;font-size:13px;background-color:'+params[i].color+';"></span>'
      if(params[i].seriesName.length !=0){
        if(params[0].name == "上线数" ||params[0].name == "Total Projects"){
            let content =  params[0].name == "上线数"?"  占比:":" Percentage:"
            html+=params[i].seriesName+":"+params[i].value+ content + (params[i].value/877*100).toFixed(2)+ "%" + "<br>";
        }
        else if(params[0].name == "被申请数" ||params[0].name == "Applied Projects"){
            let content =  params[0].name == "被申请数"?"  占比:":" Percentage:"
            html+=params[i].seriesName+":"+params[i].value+ content+ (params[i].value/798*100).toFixed(2)+ "%"+ "<br>";
        }
        else if(params[0].name == "中选数" ||params[0].name == "Selected Projects"){
            let content =  params[0].name == "中选数"?"  占比:":" Percentage:"
            html+=params[i].seriesName+":"+params[i].value+ content + (params[i].value/470*100).toFixed(2)+ "%" + "<br>";
        }
        else if(params[0].name == "中期通过数（敬请期待）" ||params[0].name == "Pass Mid-term Evaluation(Stay Tuned)"){
            let content =  params[0].name == "中期通过数（敬请期待）"?"  占比:":" Percentage:"
            html+=params[i].seriesName+":"+params[i].value+ content+ 0+ "%" + "<br>";
        }
        else if(params[0].name == "结项数（敬请期待）" ||params[0].name == "Pass Final-term Evaluation(Stay Tuned)"){
            let content =  params[0].name == "结项数（敬请期待）"?"  占比:":" Percentage:"
            html+=params[i].seriesName+":"+params[i].value+ content+ 0+ "%" + "<br>";
        }
      }
    }
    return html;
}