import React, {useEffect, useState } from 'react'
import { Layout, Menu, Button, Form, Input } from 'antd';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import {usePane} from './config'
import { Link } from 'react-router-dom';
import { useRouteType } from 'utils/url';
import { ComModal } from 'components/com-modal';
import { FormItem } from 'components/form_item';
import { pwdPattern } from 'utils/pattern'
import { useForm } from 'antd/lib/form/Form';
import { resetpwd } from 'auth-provider';
import { openNotificationWithIcon } from 'components/com-notify';
import { useDispatch } from 'react-redux';
import { changeMenu } from 'store/redux/userRedux';

const { Sider, Content } = Layout;
export const LayOut = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [allTab, allName] = usePane({ t })                                /*  menu 以及tab的title和key的配置信息 */
  const pane = Boolean(allTab) ?allTab.slice(0,1):[]                      /*  第一个值初始化 */
  const [menuActiveKey,setMenuActiveKey] = useState(['1'])                /*  定义menuitem高亮 */
  const [panes,setPanes] = useState(pane)                                 /*  定义显示在nav的tab页 */
  const [modifypwds,setModifypwds] = useState(false)

  /* 改变导航栏 */
  const changMenu=({key})=> {
    !panes.map(item => item.key).includes(key) && setPanes([...panes, allTab[allTab.map(item => item.key).indexOf(key)]])
    setMenuActiveKey([key])
    dispatch(changeMenu({ menu:["bulletin", "myinfomation", "project", "modifypwd"][Number(key)-1]}))
  }

  /* 修改密码 */
  const modifypwd = ()=> {
    setModifypwds(true)
  }

  /* 根据url处理页面刷新后的状态 */
  const runrouter = useRouteType()

  /* 不添加依赖，只在初始化或刷新时加载一次 */
  useEffect(() => {
    let key
    ["bulletin", "myinfomation", "project", "modifypwd"].forEach((item, index) => {if (item === runrouter) { key =  Number(index+1) }})
    setMenuActiveKey([String(key)])
  },[])
    
  return (
    <Layout style={{ minHeight: 'calc(100vh - 164px)'}} >
      <Sider style={{ margin: '2rem' }} breakpoint="md" collapsedWidth="0">
        <Head>{t('student.side_head')}</Head>
            <Menu mode="inline" defaultSelectedKeys={['1']} selectedKeys={menuActiveKey}  onClick={changMenu}>
              {
                  Boolean(allTab) && allTab.map((tab,index)=>{
                      return  <Menu.Item key={index+1} icon={React.createElement(tab.icon)}>
                                <Link to={'/student/'+ tab.route} style={{color:'rgba(0,0,0)'}}>
                                  {tab.title}
                                </Link>
                              </Menu.Item>
                  })
              }         
            </Menu>
      </Sider>
      <Layout style={{background: '#fff',margin: '2rem 2rem 2rem 0rem'}}>
        <Content
          style={{
            margin: '20px 16px',
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
      <ComModal visible={modifypwds} title={t('resetpwd')} close={()=>setModifypwds(false)} footer={null} children={<Resetpwd close={()=>setModifypwds(false)} />} />
    </Layout>
  );
  }
  const Resetpwd = (props)=>{
    const { close } = props
    const [form] = useForm()
    const {t,user} = useAuth()
    const [resetloading,setloading] = useState(false)
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    const onFinish = (fields)=>{
      const {oldPassword,newPassword} = fields
      setloading(true)
      resetpwd(String(user?.token),{oldPassword,newPassword}).then(res=>{
          res.code === 200 ?openNotificationWithIcon(0,res.message): openNotificationWithIcon(1,res.message)
          form.resetFields()
          setloading(false)
          close()
        })
    }
    return (
             <Form form={form} {...layout} onFinish={onFinish} initialValues={{loginName:user?.name}}>
                <Form.Item label={t('admin.account.columns_title.0')} name={'loginName'}>
                    <Input disabled type={'text'} />
                </Form.Item>
                <FormItem label={t('oldpwd')} name={'oldPassword'}  ruleMessage={t('login.oldpassword_message')} passwordRule={{ pattern: pwdPattern , message: t('register.validate_pwd') }}  >
                    <Input.Password allowClear placeholder={t('login.password_placeholder')} />
                </FormItem>
                <FormItem label={t('newpwd')} name={'newPassword'}  ruleMessage={t('login.newpassword_message')} passwordRule={{ pattern: pwdPattern , message: t('register.validate_pwd') }}  >
                    <Input.Password allowClear placeholder={t('login.password_placeholder')} />
                </FormItem>
                <Form.Item label={t('confirmnewpwd')} dependencies={['newPassword']} name={'cpassword'} rules={[
                            {
                                required: true,
                                message: t('register.confirm_newpwd'),
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(t('register.check_confirm')));
                                },
                            }),
                            ]}>
                    <Input.Password allowClear placeholder={t('register.cpassword_placeholder')} />
                </Form.Item>
                <Form.Item  wrapperCol={{ offset: 9}}>
                    <Button loading={resetloading} type="primary" htmlType="submit">
                        {t('admin.activity.savebtn')}
                    </Button>
                    <Button  htmlType="button" onClick={()=>{form.resetFields();close()}} style={{margin:'0 2rem'}} >
                        {t('admin.activity.cancelbtn')}
                    </Button>
                </Form.Item>
            </Form>
    )
  }

  const Head = styled.div`
    height: 4rem;
    width: 20rem;
    background: #fff;
    text-align: center;
    font-weight: 600;
    line-height: 4rem;
    font-size: 1.8rem;
  `
 


