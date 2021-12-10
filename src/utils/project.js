import { useRouteType, useUrlQueryParam } from 'utils/url';
import { useHttp } from 'utils/http';
import { useMutation, useQuery } from 'react-query';
import { useMemo, useCallback } from 'react';
import { useDeleteConfig, useEditConfig } from 'utils/use-optimistic-options';

export const useStuPrograms = (searchparam) => {
    const client = useHttp()
    const cachekey = useRouteType()
    const params = { ...searchparam }
    return useQuery([cachekey, searchparam], () => client('/studentProgram/my-application', { data: params, method: 'post' }), { enabled: Boolean(searchparam.activityId) })
}

export const useSetPriority = (searchparam) => {
    const client = useHttp()
    const cachekey = useRouteType()
    const params = { ...searchparam }
    return useQuery([cachekey, searchparam.activityId], () => client('/studentProgram/toSetPriority', { data: params, method: 'post' }), { enabled: Boolean(searchparam.activityId) })
}

export const useStuProSearchParms = () => {
    const [param, setParam] = useUrlQueryParam(['pageSize', 'pageNum', 'activityId'])
    return [
        useMemo(() => ({ ...param }), [param]),
        setParam
    ]
}

export const useStuProQueryKey = () => {
    const [params] = useStuProSearchParms();
    return [useRouteType(), params]
}

export const useOrginfo = (organizeId) => {
    const client = useHttp()
    const cachekey = useRouteType()
    return useQuery(
        [cachekey, organizeId],
        () => client(`/org/detail`, { data: { orgId: organizeId }, method: 'post' }),
        { enabled: Boolean(organizeId) }
    )
}

export const useProinfo = (proId) => {
    const client = useHttp()
    const cachekey = useRouteType()
    const params = { proId: proId }
    return useQuery(
        [cachekey, proId],
        () => client(`/program/detail`, { data: params, method: 'post' }),
        { enabled: Boolean(proId) }
    )
}

export const useApplyinfo = (id) => {
    const client = useHttp()
    const cachekey = useRouteType()
    return useQuery(
        [cachekey, id],
        () => client(`/studentProgram/detail`, { data: { id }, method: 'post' }),
        { enabled: Boolean(id) }
    )
}

export const useActivityinfo = (activityId) => {
    const client = useHttp()
    const cachekey = useRouteType()
    return useQuery(
        [cachekey, { activityId }],
        () => client(`/activity/detail`, { data: { activityId }, method: 'post' }),
        { enabled: Boolean(activityId) }
    )
}

export const useStuProgramModal = () => {
    const [{ inquiryOrgId }, setInquiryOrgId] = useUrlQueryParam(['inquiryOrgId'])
    const [{ inquiryProId }, setInquiryProId] = useUrlQueryParam(['inquiryProId'])
    const [{ inquiryApplyId }, setInquiryApply] = useUrlQueryParam(['inquiryApplyId'])
    const [{ inquiryActivityId }, setInquiryActivityId] = useUrlQueryParam(['inquiryActivityId'])
    const [{ stuPriority }, setStuPriority] = useUrlQueryParam(['stuPriority'])
    const { data: orgInfo, isLoading: orgInfoLoading } = useOrginfo(inquiryOrgId)
    const { data: proInfo, isLoading: proInfoLoading } = useProinfo(inquiryProId)
    const { data: activityInfo, isLoading: activityLoading } = useActivityinfo(inquiryActivityId)
    const { data: applyInfo, isLoading: applyInfoLoading } = useApplyinfo(inquiryApplyId)
    const close = useCallback(() => {
        inquiryOrgId && setInquiryOrgId({ inquiryOrgId: undefined })
        inquiryProId && setInquiryProId({ inquiryProId: undefined })
        inquiryActivityId && setInquiryActivityId({ inquiryActivityId: undefined })
        inquiryApplyId && setInquiryApply({ inquiryApplyId: undefined })
        stuPriority && setStuPriority({ stuPriority: undefined })
    }, [inquiryOrgId, setInquiryOrgId])
    const inquiryOrg = useCallback((id) => setInquiryOrgId({ inquiryOrgId: id }), [setInquiryOrgId])
    const inquiryPro = useCallback((id) => setInquiryProId({ inquiryProId: id }), [setInquiryProId])
    const inquiryApply = useCallback((id) => setInquiryApply({ inquiryApplyId: id }), [setInquiryApply])
    const inquiryActivity = useCallback((id) => setInquiryActivityId({ inquiryActivityId: id }), [setInquiryActivityId])
    const updateSort = useCallback(() => setStuPriority({ stuPriority: true }), [setStuPriority])
    return {
        projectModalOpen: Boolean(inquiryOrgId) || Boolean(inquiryProId) || Boolean(inquiryActivityId) || Boolean(stuPriority),
        inquiryPro,
        close,
        inquiryOrg,
        inquiryOrgId,
        orgInfo,
        orgInfoLoading,
        proInfo,
        proInfoLoading,
        DrawerOpen: Boolean(inquiryApplyId),
        inquiryApply,
        applyInfo,
        applyInfoLoading,
        inquiryActivity,
        activityInfo,
        activityLoading,
        inquiryActivityId,
        updateSort,
        stuPriority,
        inquiryApplyId
    }
}

export const useBankModal = () => {
    const [{ editBankinfo }, setEditBankinfo] = useUrlQueryParam(['editBankinfo'])
    const editBank = useCallback(() => setEditBankinfo({ editBankinfo: true }), [setEditBankinfo])
    const closeBank = useCallback(() => {
        editBankinfo && setEditBankinfo({ editBankinfo: undefined })
    }, [editBankinfo, setEditBankinfo])
    return {
        projectModal: Boolean(editBankinfo),
        editBank,
        closeBank
    }
}


export const useDeleteProgram = (queryKey) => {
    const client = useHttp()
    return useMutation(
        (params) => client(`/program/delete`, {
            data: params,
            method: 'POST'
        }),
        useDeleteConfig(queryKey)
    )
}

export const useUpdateStuPriority = (queryKey) => {
    const client = useHttp()
    return useMutation(
        (params) => client(`/studentProgram/updatePriority`, {
            data: params,
            method: 'POST'
        }),
        useEditConfig(queryKey)
    )
}

export const useActivitys = (searchparam) => {
    const client = useHttp()
    const cachekey = useRouteType()
    const params = { ...searchparam }
    const url = '/activity/lists'
    return useQuery(
        [cachekey, searchparam],
        () => client(url, { data: params, method: 'post' })
    )
}

export const useCheckTime = (activeId) => {
    const client = useHttp()
    const cachekey = useRouteType()
    return useQuery([cachekey, stuactiveId], () => client('/teacherProgram/canSetPriority', { data: { activityId: stuactiveId }, method: 'post' }), { enabled: Boolean(stuactiveId) })
}


