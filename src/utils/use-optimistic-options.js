import {QueryKey,useQueryClient} from "react-query"
export const useConfig = (queryKey,callback) =>{
    const queryClient = useQueryClient()
    return {

        /* 请求成功之后让之前的缓存失效 */
        onSuccess:()=>queryClient.invalidateQueries(queryKey),
        /*   
            乐观更新时会利用到,onMutate是在useMutation一发生，就立刻被调用
            这里的target参数就是mutationFn的同一个参数 
        */
        async onMutate(target){
            const previousItems = queryClient.getQueryData(queryKey)
            console.log(previousItems,queryKey)
            queryClient.setQueryData(queryKey,(old)=>{
                console.log(callback(target,old))
              return callback(target,old)
            }) 
            return {previousItems}
        },
        /* 回滚机制，用来处理异步处理的异常情况，纠正可能存在不正确的乐观更新 */
        onError(error,newItem,context){
            queryClient.setQueryData(queryKey,context.previousItems)
        },
        retry:false   
    }
}
/* 针对增删改不同情况，定义不同的hook */
export const useDeleteConfig = (queryKey)=>useConfig(queryKey,(target,old)=>old.rows.filter((item)=>item.key !== Number(target))||[])
export const useEditConfig = (queryKey)=>useConfig(queryKey,(target,old)=>{
    return old?.rows?.map((item)=>item.key === target.key?{...item,...target}:item)||[]
})
export const useAddConfig = (queryKey)=>useConfig(queryKey,(target,old)=>old.rows?[...old.rows,target]:[])
export const useReorderConfig = (queryKey)=>useConfig(queryKey,(target,old)=>old || [])


