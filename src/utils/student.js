import { QueryKey } from 'react-query';
import { useEditConfig, useAddConfig } from 'utils/use-optimistic-options';
import { useRouteType, useUrlQueryParam } from 'utils/url';
import { useHttp } from 'utils/http';
import { useMutation, useQuery } from 'react-query';
import { useMemo, useCallback } from 'react';

export const useStudentModal = ()=>{
    const { data: editingStudent, isLoading,refetch } = useStudent()
    const [{ studentEdit }, setStudentEdit] = useUrlQueryParam(['studentEdit'])
    const edit = useCallback(() => setStudentEdit({ studentEdit: true }), [setStudentEdit])
    const close = useCallback(() => {
        studentEdit && setStudentEdit({ studentEdit: undefined })
    }, [studentEdit])
    return {
        close,
        edit,
        editingStudent,
        isLoading,
        refetch,
        studentEdit
     } 
}

export const useStudent = () =>{
    const client = useHttp()
    const cachekey = useRouteType()
    const params = {}
    return useQuery(
        [cachekey,'myinfo'],
        () => client(`/student/myProfile`,{data:params,method:'post'})                                       
    )
}

export const useStudents = () => {
    const client = useHttp()
    const cachekey = useRouteType()
    const params = {}
    return useQuery([cachekey, 'bulletin'], () => client('/notice/detail/student', { data: params, method: 'post' }))
}

export const useAddStudent=()=>{
    const client = useHttp()
    const cachekey = useRouteType()
    return useMutation(
        (params)=>client(`/student/add`,{
            data:params,
            method:'POST'
        }),
        useAddConfig([cachekey, 'myinfo'])
    )
}

export const useEditStudent = () => {
    const client = useHttp()
    const cachekey = useRouteType()
    return useMutation(
        (params) => client(`/student/edit`, {
            data: params,
            method: 'POST'
        }),
        useEditConfig([cachekey, 'myinfo'])
    )
}

export const useStuproupload = (queryKey) => {
    const client = useHttp()
    return useMutation(
        (params) => client(`/studentProgram/uploadAgreement/student`, {
            data: params,
            method: 'POST',
        }),
        useEditConfig(queryKey)
    )
}

export const useStuBankInfo = (id) => {
    const client = useHttp()
    const cachekey = useRouteType()
    return useQuery(
        [cachekey, id],
        () => client(`/admin/bankinfo`, { data: { studentId: id }, method: 'post' }),
        { enabled: Boolean(id) }
    )
}

export const useStuEditbank = (queryKey) => {
    const client = useHttp()
    const cachekey = useRouteType()
    return useMutation(
        (params) => client(`/bank/edit`, {
            data: params,
            method: 'POST'
        }),
        useEditConfig([cachekey, queryKey])
    )
}


