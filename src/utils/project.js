import { useRouteType, useUrlQueryParam } from 'utils/url';
import { useHttp } from 'utils/http';
import { useMutation, useQuery } from 'react-query';
import { useMemo, useCallback } from 'react';
import { useDeleteConfig, useEditConfig } from 'utils/use-optimistic-options';

export const useStuPrograms = (searchparam) => {
    const client = useHttp()
    const cachekey = useRouteType()
    const params = { ...searchparam }
    return useQuery([cachekey, searchparam], () => client('/studentProgram/my-application', { data: params, method: 'post' }))
}

export const useStuProSearchParms = () => {
    const [param, setParam] = useUrlQueryParam(['pageSize', 'pageNum', 'activityName'])
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
    const { data: orgInfo, isLoading: orgInfoLoading } = useOrginfo(inquiryOrgId)
    const { data: proInfo, isLoading: proInfoLoading } = useProinfo(inquiryProId)
    const { data: activityInfo, isLoading: activityLoading } = useActivityinfo(inquiryActivityId)
    const { data: applyInfo, isLoading: applyInfoLoading } = useApplyinfo(inquiryApplyId)
    const close = useCallback(() => {
        inquiryOrgId && setInquiryOrgId({ inquiryOrgId: undefined })
        inquiryProId && setInquiryProId({ inquiryProId: undefined })
        inquiryActivityId && setInquiryActivityId({ inquiryActivityId: undefined })
        inquiryApplyId && setInquiryApply({ inquiryApplyId: undefined })
    }, [inquiryOrgId, setInquiryOrgId])
    const inquiryOrg = useCallback((id) => setInquiryOrgId({ inquiryOrgId: id }), [setInquiryOrgId])
    const inquiryPro = useCallback((id) => setInquiryProId({ inquiryProId: id }), [setInquiryProId])
    const inquiryApply = useCallback((id) => setInquiryApply({ inquiryApplyId: id }), [setInquiryApply])
    const inquiryActivity = useCallback((id) => setInquiryActivityId({ inquiryActivityId: id }), [setInquiryActivityId])
    return {
        projectModalOpen: Boolean(inquiryOrgId) || Boolean(inquiryProId) || Boolean(inquiryActivityId),
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
        inquiryActivityId
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


