/**
 * Copyright (c) 2020 Intelligent Software Research Center of ISCAS
 * Summer 2020 Homepage is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

import React from 'react'
import './index.less'
import { connect } from 'react-redux'
import data from './../../data/nav.json'
import { titleChange, gohash } from './../../util/url.js'
import { getToken, logout } from 'auth-provider'
import { submitLogout } from 'store/redux/userRedux'
import i18n from 'i18next'
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chiFlag: i18n.language ? i18n.language === 'zh' ? 'chi' : 'en' : 'chi',
            data,
            moblieListFlag: false,
        }
    }

    switchFlag(msg) {
        if (msg === 'chi') {
            this.props.chiFlag_chi()
            i18n.changeLanguage('zh')
        } else {
            this.props.chiFlag_en()
            i18n.changeLanguage('en')
        }
        // msg === 'chi'?this.props.chiFlag_chi():this.props.chiFlag_en();
        this.setState({
            chiFlag: msg,
        })
    }

    headerlist(flag) {
        this.setState({
            moblieListFlag: flag,
        })
    }

    getLink(title) {
        gohash('/' + title)
        this.headerlist(false)
    }

    goPage(linkurl) {
        if (linkurl !== 'dataall' && linkurl !== 'loginall' && linkurl !== 'review') {
            this.props.setPageFlag(
                linkurl == 'data' || linkurl === 'midtermdata'
                    ? 'dataall'
                    : linkurl.includes('Login')
                        ? 'loginall'
                        : linkurl,
            )
            gohash('/' + linkurl)
            if (linkurl === 'org') {
                this.props.setOrgTabFlag('orglist')
            }
        } else {
            // this.props.setPageFlag(linkurl === 'dataall' ? 'dataall' : 'loginall')
            // gohash(linkurl === 'dataall' ? '/data' : '/studentLogin')
        }
    }

    parseQueryString(url) {
        var obj = {}
        var keyvalue = []
        var key = '',
            value = ''
        var paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
        for (var i in paraString) {
            keyvalue = paraString[i].split('=')
            key = keyvalue[0]
            value = keyvalue[1]
            obj[key] = value
        }
        return obj
    }

    componentDidMount() {
        //1.0 浏览器语言不是中文的切换到英文版本展示
        if (window.navigator && window.navigator.language) {
            if (
                window.navigator.language.toLocaleLowerCase() !== 'zh-cn' &&
                window.navigator.language.toLocaleLowerCase() !== 'zh'
            ) {
                this.switchFlag('en')
            }
        }

        titleChange()

        //2.0 查看有无语言标志位
        const langc = this.parseQueryString(window.location.hash)
        if (langc.hasOwnProperty('lang')) {
            this.switchFlag(langc['lang'])
        }

        //3.0 查看当前hash
        let hashu = ''
        if (
            window.location.hash &&
            window.location.hash.split('?')[0] &&
            window.location.hash.split('?')[0].split('#/')[1]
        ) {
            hashu = window.location.hash.split('?')[0].split('#/')[1].split('/')[0]
        }
        this.props.setPageFlag(hashu || 'homepage')

        setTimeout(() => {
            let hashopl = window.location.hash.split('#/')
            if (hashopl[1] === '') {
                window.history.replaceState('', '', window.location.pathname)
            }
        }, 5)
    }
    gosummerbackend() {
        window.open('https://test-portal.summer-ospp.ac.cn/')
    }

    logoutstu() {
        const that = this
        logout().then(() => {
            that.goPage('studentLogin')
            // window.location.hash = '/studentLogin'
            that.props.setLogout()
            // QueryClient.clear()
        })
    }

    render() {
        let showdata = this.state.data[this.state.chiFlag]
        let link = this.state.data.link
        let pageflagredux = this.props.pageflag
        const { menu, name } = this.props
        const token = getToken()
        return (
            <div className={['header', this.state.chiFlag].join(' ')}>
                <div className="content1200 headerContent" style={{ width: '145rem' }}>
                    <div
                        className="osscHeaderLogo"
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/logo_n.svg)` }}
                        onClick={() => {
                            this.goPage('homepage')
                        }}
                    ></div>
                    <div className="headerList">
                        <div className="headerTabWrapper">
                            {showdata.linkdata.map((ele, index) => {
                                const linkurl = link[index]
                                return (
                                    <div
                                        key={index}
                                        className={[
                                            pageflagredux === linkurl ? 'active' : '',
                                            'headerWrapItem',
                                            linkurl,
                                        ].join(' ')}
                                    >
                                        <div
                                            onClick={() => {
                                                this.goPage(linkurl)
                                            }}
                                            className={[
                                                this.state.chiFlag == 'chi'
                                                    ? 'headerTabItem'
                                                    : 'headerTabItemEn',
                                                'headerNav',
                                            ].join(' ')}
                                        >
                                            <span>{ele.name}</span>
                                        </div>
                                        {ele.content ? (
                                            <div
                                                className="osscListLine"
                                                style={{
                                                    width:
                                                        this.props.chiFlag === 'chi'
                                                            ? 'calc(100% + 2rem)'
                                                            : 'calc(100% + 2rem)',
                                                }}
                                            >
                                                {ele.content.map((sitem, sindex) => {
                                                    return (
                                                        <div
                                                            className="osscListLineItem"
                                                            style={{
                                                                fontSize:
                                                                    this.props.chiFlag === 'chi'
                                                                        ? '16px'
                                                                        : '14px',
                                                            }}
                                                            key={sindex}
                                                            onClick={() => {
                                                                // this.goPage(sitem.title)
                                                                sindex === 0 ? window.open('https://summer.iscas.ac.cn/') : window.open('https://isrc.iscas.ac.cn/summer2020/')
                                                            }}
                                                        >
                                                            {sitem.name}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                )
                            })}

                        </div>
                        <div className="headerChiEn headerTabItem">
                            <div
                                className="headerChi"
                                onClick={() => {
                                    this.switchFlag('chi')
                                }}
                            >
                                中文
                            </div>
                            <div
                                className="headerEn"
                                onClick={() => {
                                    this.switchFlag('en')
                                }}
                            >
                                ENG
                            </div>
                        </div>
                        <div
                            className="headerMobileIcon"
                            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/icon_nav.png)` }}
                            onClick={() => this.headerlist(true)}
                        ></div>
                    </div>

                    {token ? (
                        <div
                            className={[pageflagredux.includes('student/') || pageflagredux === 'loginall' ? 'active' : '', 'headerWrapItem', 'logout'].join(' ')}
                        >
                            <div
                                onClick={() => {
                                    this.goPage(menu ? `student/${menu}` : 'student/bulletin')
                                }}
                                style={{ paddingTop: '1.7rem' }}
                                className={[
                                    this.state.chiFlag == 'chi'
                                        ? 'headerTabItem'
                                        : 'headerTabItemEn',
                                    'headerNav',
                                ].join(' ')}
                            >
                                <div>{showdata.logout.name}</div>
                                <div>{'  (' + name + ')'}</div>
                            </div>
                            {showdata.logout.content ? (
                                <div
                                    className="osscListLine"
                                    style={{
                                        marginLeft: '12px',
                                        width:
                                            this.props.chiFlag === 'chi'
                                                ? 'calc(100% + 4rem)'
                                                : 'calc(100%)',
                                    }}
                                >
                                    {showdata.logout.content.map((sitem, sindex) => {
                                        return (
                                            <div
                                                className="osscListLineItem"
                                                style={{
                                                    fontSize:
                                                        this.props.chiFlag === 'chi' ? '16px' : '14px',
                                                }}
                                                key={sindex}
                                                onClick={() => this.logoutstu()}
                                            >
                                                {sitem.name}
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    ) : (
                        <div
                            className={[
                                pageflagredux === 'loginall' ? 'active' : '',
                                'headerWrapItem',
                                'loginall',
                            ].join(' ')}
                        >
                            <div

                                className={[
                                    this.state.chiFlag == 'chi'
                                        ? 'headerTabItem'
                                        : 'headerTabItemEn',
                                    'headerNav',
                                ].join(' ')}
                            >
                                <span>{showdata.login.name}</span>
                            </div>
                            {showdata.login.content ? (
                                <div
                                    className="osscListLine"
                                    style={{
                                        width:
                                            this.props.chiFlag === 'chi'
                                                ? 'calc(100% + 4rem)'
                                                : 'calc(100% + 8rem)',
                                    }}
                                >
                                    {showdata.login.content.map((sitem, sindex) => {
                                        return (
                                            <div
                                                className="osscListLineItem"
                                                style={{
                                                    fontSize:
                                                        this.props.chiFlag === 'chi' ? '16px' : '14px',
                                                }}
                                                key={sindex}
                                                onClick={() => {
                                                    sindex === 0
                                                        ? this.goPage(sitem.title)
                                                        : this.gosummerbackend()
                                                }}
                                            >
                                                {sitem.name}
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    )}

                    <div
                        className={[
                            'headerMobileList',
                            this.state.moblieListFlag ? 'displayblock' : '',
                        ].join(' ')}
                    >
                        <div
                            className="headerClose"
                            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/close.svg)` }}
                            onClick={() => this.headerlist(false)}
                        ></div>
                        {showdata.linkdata.map((item, index) => {
                            const linkurl = link[index]
                            return (
                                <div
                                    key={index}
                                    onClick={() => this.getLink(linkurl)}
                                    className={['osscListItem', !item.content && linkurl].join(' ')}
                                >
                                    <span> {item.content ? null : item.name}</span>
                                    {item.content &&
                                        item.content.map((sitem, sindex) => {
                                            return (
                                                <div
                                                    className={['osscListItem', linkurl].join(' ')}
                                                    key={sindex}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        sindex === 0 ? window.open('https://summer.iscas.ac.cn/') : window.open('https://isrc.iscas.ac.cn/summer2020/')
                                                        // this.getLink(sitem.title)
                                                    }}
                                                >
                                                    {sitem.name}
                                                </div>
                                            )
                                        })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chiFlag_chi: () => {
            dispatch({
                type: 'chiFlag_chi',
            })
        },
        chiFlag_en: () => {
            dispatch({
                type: 'chiFlag_en',
            })
        },
        setOrgTabFlag: (data) => {
            dispatch({
                type: 'setOrgTabFlag',
                payload: data,
            })
        },
        setPageFlag: (data) => {
            dispatch({
                type: 'setPageFlag',
                payload: data,
            })
        },
        setLogout: () => dispatch(submitLogout()),
    }
}

const mapStateToProps = (state) => {
    return {
        pageflag: state.homepage.pageflag,
        token: state.user.token,
        menu: state.user.menu,
        name: state.user.name
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
