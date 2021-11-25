import styled from '@emotion/styled';
import {Table} from 'antd';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
export const ComTable  =(props)=>{
    const {t} = useTranslation()
    const {rowSelection,searchparam,list,setParam,...restProps} = props
    const [selectionType, setSelectionType] = useState('checkbox');
    const  handleTableChange = (pagination, filters, sorter) => {
        setParam({...searchparam, pageNum:pagination.current,pageSize:pagination.pageSize,orderByColumn:sorter.field,isAsc:sorter.order==='ascend'?'asc':sorter.order==='descend'?'desc':undefined})
       };
    const pagination = {
        showSizeChanger:true,
        total:list?.total,
        showTotal:(total, range) => t('admin.pagination.0') + ` ${range[0]} ` + t('admin.pagination.1')+ ` ${range[1]} `+ t('admin.pagination.2')+` ${total} `+t('admin.pagination.3'),
        pageSize:searchparam.pageSize?Number(searchparam.pageSize):10,
        current:searchparam.pageNum?Number(searchparam.pageNum):1,
    }
    return  <TableContainer>
                <Table scroll={{y:'calc(100vh - 32rem)'}} onChange={handleTableChange} pagination={pagination} rowSelection={rowSelection?{type: selectionType,...rowSelection,}:rowSelection}
                    {...restProps}/>
            </TableContainer>
}

const TableContainer = styled.div`
    font-size:1.6rem !important
`