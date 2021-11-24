const axios = require('axios')
const {logger} = require('../logger/index.cjs')
const request = (paramInfo) => {
    function getDataFn(obj) {
        //忽略https的签名证书
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const getData = {
            url: obj.url,
            method: obj.method ||'get',
            //baseURL: 'http://192.168.1.162/summer',
            // 使用前需要在系统上设置环境变量 SUMMER_OSPP_JAVA_IP 的值和 SUMMER_OSPP_JAVA_PORT 的值，用来设置summer_ospp_java后台的请求ip和端口
            baseURL:process.env.OS === 'Windows_NT'?'http://localhost:9899/summer':'http://'+process.env.SUMMER_OSPP_JAVA_IP+':'+process.env.SUMMER_OSPP_JAVA_PORT+'/summer',
            headers: obj.headers
        }
        /* 默认为DomString,文件流下载是会出现乱码，node中需要以arrayBuffer形式存储服务返回的流 */
        if(obj.responseType){
            getData.responseType = obj.responseType
        }
        (getData.method === 'get' ||getData.method === 'delete')? getData.params = obj.data: getData.data = obj.data
        return getData
    }
    
    if(!Array.isArray(paramInfo)){
        return axios(getDataFn(paramInfo))
    } else {
        let fetchArray = paramInfo.map(v => {
            return axios(getDataFn(v))
        })
        return new Promise((resolve, reject) => {
            axios.all(fetchArray)
            .then(axios.spread(function (...arg) {
                // 多个请求现在都执行完成
                resolve(arg)
            })).catch(err => {
                logger.error(err)
            })
        })

    }
}
module.exports = request
