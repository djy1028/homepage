import React,{ReactNode,useContext, useEffect} from 'react'
// import { useQueryClient } from 'react-query'  //标准的请处理模式
import * as auth from 'auth-provider'
import { FullPageLoading ,FullPageError} from 'components/lib'
import { http } from 'utils/http'
import { useAsync } from 'utils/use-async'
import { useTranslation} from 'react-i18next'

// interface AuthForm {
//     username:string
//     password:string
//     code?:string,
//     type?:string
// }
//初始化user
//当页面刷新时，从localstorage中拿出token,并向服务验证并获取user信息
//需要配合服务使用
const bootstrapUser = async ()=>{
    let user = null
    const token = auth.getToken()
    if(token){
        const data = await http('/getUserInfo',{token})
        user = {...data,token:token}
    }
    return user
}

//创建context,创建时的类型根据provider中value返回的类型定义
const AuthContext = React.createContext(undefined)
AuthContext.displayName = 'AuthContext'

//创建context的provider
export const AuthProvider = ({children})=>{

    //useState用的是泛型，会看传入的initialState的类型,再赋值给这个泛型
    const {data:user,error,isLoading,isIdle,isError,run,setData:setUser} = useAsync()
    // const queryClient = useQueryClient()
    const login = (form)=>auth.login(form).then(user=>setUser(user))
    const register = (form)=>auth.register(form)
    const logout = ()=>auth.logout().then(()=>{
        setUser(null)
        window.history.replaceState('login','','/')
        // queryClient.clear()
    })

    /* 全局国际化翻译 */
    const {t,i18n} = useTranslation()

    //AuthProvider加载时，即整个app加载时
    useEffect(()=>{
        /* 页面刷新后状态保持 */
        localStorage.getItem('lang') && i18n.changeLanguage(String(localStorage.getItem('lang')))

        //加上run函数，可以复用loading部分逻辑，实现页面在异步处理时的loading 状态
        run(bootstrapUser())
    },[])

    if(isIdle || isLoading){
        return <FullPageLoading />
    }

    if(isError){
        return <FullPageError error={error}/>
    }

    return <AuthContext.Provider children={children} value={{user,login,register,logout,t,i18n}}/>
}

//创建每个hooks接受到的全局context,全局所有组件中调用login register logout 和读取user信息
export const useAuth = ()=>{
    //返回最近的context的值
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth必须在AuthProvider中使用")
    }
    return context
}