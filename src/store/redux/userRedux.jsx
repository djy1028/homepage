import axios from "axios";
//import {getRedirectPath} from '../utils';        //保证为纯函数
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG';
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOG_OUT = 'LOG_OUT'
const initState = {
    // isAuth:'',   //是否已经登陆
    msg:'',
    name:'',
    pwd:'',
    type: '',
    token:''
}

export function user(state=initState,action){
    switch(action.type){
        // case REGISTER_SUCCESS:
        //     return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case LOGIN_SUCCESS:
            return {...state,msg:'',isAuth:true,...action.payload}
        case AUTH_SUCCESS:
            return {...state,msg:'',...action.payload}
        case LOAD_DATA:
            return {...state,...action.payload}
            //退出登录后，清空所有用户状态，redirectTo指向/login
        case LOG_OUT:
            return {...initState,redirectTo:'/login'}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        default:
            return state
    }
}
//注册成功dispatch
function registerSuccess(data){
    return {type:AUTH_SUCCESS,payload:data}
}
//登陆成功dispatch

export const loginSuccess = (data)=>{
    return {type:AUTH_SUCCESS,payload:data}
}

export const authSuccess = (data)=>{
    return {type:AUTH_SUCCESS,payload:data}
}

function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}
//用户注册检验
export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('用户名密码必须输入')
    }
    if(pwd !== repeatpwd){
        return errorMsg('密码和确认密码不同')
    }
    return async dispatch=>{
        let res = await axios.post('/user/register',{user,pwd,type})
        console.log(res);
        if(res.status == 200&&res.data.code == 0){
            //传递后端返回信息
            dispatch(authSuccess({user,pwd,type}))
        }
        else{
            dispatch(errorMsg(res.data.msg))
        }
    }
   
}

//用户登陆
export function login(values){
    return async dispatch=>{
        let res = await run(login(values))
        if(res.status == 200&&res.data.code ==0){
            dispatch(authSuccess(res.data.data))
        }
        else{
            dispatch(errorMsg(res.data.msg))
        }
    }
}

//用户登陆、注册后信息更新
export function update(data){
    //利用async+await改写promise+then
    return async dispatch=>{
        let res = await axios.post('/user/update',data);
        if(res.status == 200&&res.data.code ==0){
            dispatch(authSuccess(res.data.data))
        }
        else{
            dispatch(errorMsg(res.data.msg))
        }
    }
   
}
//登陆注册后保存用户信息
export function loadData(data){
    return {type:LOAD_DATA,payload:data}
}
//用户退出登录
export function submitLogout(){
    return {type:LOG_OUT}
}