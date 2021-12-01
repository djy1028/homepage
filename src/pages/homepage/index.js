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
import './index.less';
import datas from "./../../data/homepage.json";
import { gourl } from "./../../util/url.js";
import logocoopdata from "./../../data/coorganizer.json"
import { useSelector } from 'react-redux';
import { useState } from 'react';

const HomePage = () => {
    const homepage = useSelector(state => state.homepage)
    const [data, setData] = useState(datas)
    const goLogoLink = (url) => {
        if (url) {
            gourl(url)
        }
    }


    const createLogo = (logoclassname, data, path) => {
        let pathurl = 'logo/'
        if (path) {
            pathurl = path
        }

        var logo = [];
        data.map((item, index) => {
            const iconUrl = require('./../../img/' + `${pathurl}${item.img}`).default;
            logo.push(
                <div
                    key={index}
                    onClick={() => { goLogoLink(item.url) }}
                    className={[logoclassname, item.url ? '' : 'cursordefault'].join(" ")}
                    style={{ backgroundImage: "url(" + iconUrl + ")" }} >

                </div>
            )
        })
        return logo;
    }

    const createIconBanner = (text) => {
        var iconcontainer = []
        text.map((item, index) => {
            const iconUrl = require('./../../img/index/icon' + index + '.jpg').default
            iconcontainer.push(
                <div className="homepageIconItem" key={index}>

                    <div className="homepageIconItemImageWrapper">
                        <div
                            className="homepageIconItemImage"
                            style={{ backgroundImage: "url(" + iconUrl + ")" }}
                        ></div>
                    </div>
                    {
                        item.map((sitem, sindex) => {
                            return (
                                <div className="homepageIconItemText" key={sindex}>{sitem}</div>
                            )
                        })
                    }
                </div>
            )
            return 0;
        })
        return iconcontainer

    }

    let showdata = data[homepage.chiFlag]
    return (
        <div className="homepage">
            {/* <div className="GoApply"
            dangerouslySetInnerHTML={{ __html: showdata.goapply }}>
            
        </div> */}
            <div className="homepageBanner One">
                <div className="homepageBannerTitle">{showdata.title}</div>
                <div className="homepageTextOne">
                    {
                        showdata.bannerone.map((item, index) => {
                            return (
                                <div className="homepageBannerFline" key={index} >
                                    <span className="homepageBannerFlineText">
                                        <span dangerouslySetInnerHTML={{ __html: index + 1 + '. ' + item }}></span>
                                    </span>
                                </div>
                            )

                        })
                    }
                </div>
            </div>
            <div className="homepageWrapper">
                <div className="content1200">
                    <div
                        className="homepageDesc"
                        dangerouslySetInnerHTML={{ __html: showdata.bannertext }}
                    ></div>


                    <div className="homepageIcon">
                        {
                            createIconBanner(showdata.icontext)
                        }
                    </div>
                    <div className="homepageLogo">
                        <div className="homepageLogoTitle">
                            <span className="title-wrapper">
                                <span className="title-left-icon"></span>
                                <span className="title-text">{showdata.logotitle[0]}</span>
                                <span className="title-right-icon"></span>
                            </span>
                        </div>

                        <div className="homepageLogoItemTitle">
                            {showdata.logotitle[1]}
                        </div>
                        <div className="homepageLogoItemList ">
                            {createLogo("homepageLogoImage", logocoopdata.host)}
                        </div>
                        <div className="homepageLogoItemTitle ">
                            {showdata.logotitle[3]}
                        </div>
                        <div className="homepageLogoItemList ">
                            {createLogo("homepageLogoImage", logocoopdata.organizer)}
                        </div>
                        <div className="homepageLogoItemTitle">
                            {showdata.logotitle[2]}
                        </div>
                        <div className="homepageLogoItemList ">
                            {createLogo("homepageLogoImage", logocoopdata.cohost)}
                        </div>
                        <div className="homepageLogoItemTitle ">
                            {showdata.logotitle[4]}
                        </div>
                        <div className="homepageLogoItemList Media">
                            {createLogo("homepagelogocoop", logocoopdata.media)}
                        </div>
                        <div className="homepageLogoItemTitle CoopTitle">
                            <div>{showdata.logotitle[5]}</div>
                            <div className="CoopTitleRank">{showdata.rank}</div>
                        </div>
                        <div className="homepageLogoItemList Coop">
                            {createLogo("homepagelogocoop", logocoopdata.cooper)}
                            <br />
                            {createLogo("homepagelogocoop", logocoopdata.university, 'school/')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default HomePage