import React ,{ useMemo }from 'react'
import {
    BranchesOutlined,
    UserSwitchOutlined,
    ApartmentOutlined,
    EditOutlined
  } from '@ant-design/icons';
export const usePane = (props)=>{
    const {t,user} = props
    const studentTitle = t(`student.menu`,{returnObjects: true})
    const studentIcon = [BranchesOutlined, ApartmentOutlined, UserSwitchOutlined, EditOutlined]
    const studentName = ["bulletin","myinfomation","project","modifypwd"]
    const student = (studentTitle && typeof (studentTitle) !== 'string') && studentTitle.map((titleitem,index)=>{
        return { title: titleitem, key: String(index + 1), icon: studentIcon[index], route: studentName[index]}
    }) 
    const allTab = student
    const allName = studentName
    return [useMemo(()=>allTab,[allTab]),allName]                      
};