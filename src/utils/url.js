import { ObjectCleanEmpty } from './index';
import { useMemo } from "react"
import { URLSearchParamsInit, useLocation, useSearchParams} from "react-router-dom"

/* 
    返回页面url中，指定键的参数值
    reduce中的返回值依据传入的初始initialValue,因此这边需要固定传入的initialValue的类型
*/
export const useUrlQueryParam = (keys)=>{
    const [searchParams,setSearchParam] = useSearchParams()
    /* useEffect 和useMemo的依赖项为obj类型时，会造成往复循环，但是当为obj类的state,即由hooks返回的状态时，不会形成循环渲染 */
    /* 基本类型，组件状态可以放到依赖里面，非组件状态的对象不可以放到依赖里面 */
    return [
        useMemo(()=>keys.reduce((prev, key)=>{
            return {...prev,[key]:searchParams.get(key)||''}
        },{}),[searchParams]),
        
        (params )=>{
            const o = ObjectCleanEmpty({...Object.fromEntries(searchParams),...params})
            return setSearchParam(o)
        }
    ]
}

/* 
    as const 用来固定死tuple中的类型定义
    const a = ['jack',12,{gender:'male'}] as const
*/

// export const useSetUrlSearchParam = () => {
//     const [searchParams, setSearchParam] = useSearchParams();
//     return (params) => {
//       const o = ObjectCleanEmpty({
//         ...Object.fromEntries(searchParams),
//         ...params,
//       })
//       return setSearchParam(o);
//     };
//   };

/* 获取url中最后字段 */
export const useRouteType = ()=>{
    const units = useLocation().pathname.split('/')
    return units[units.length-1]
}

export const  useQueryString = (name)=> {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    };
}
  