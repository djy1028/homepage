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
import Wrapper from 'wrapper';
import { useEffect } from 'react';


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
            logo.push(
                <div
                    key={index}
                    onClick={() => { goLogoLink(item.url) }}
                    className={[logoclassname, item.url ? '' : 'cursordefault'].join(" ")}
                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/${pathurl}${item.img})` }}
                >

                </div>
            )
        })
        return logo;
    }

    const createIconBanner = (text) => {
        var iconcontainer = []
        text.map((item, index) => {
            iconcontainer.push(
                <div className="homepageIconItem" key={index}>

                    <div className="homepageIconItemImageWrapper">
                        <div
                            className="homepageIconItemImage"
                            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/index/icon${index}.png)` }}
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

    useEffect(() => {
        const speed = 25;
        const tab = document.getElementById('demoin');
        const tab2 = document.getElementById('demo2');

        function Marquee() {
            if (tab2.offsetWidth - tab.scrollLeft <= 0) {
                tab.scrollLeft = 0;
            } else {
                tab.scrollLeft++;
            }
        }
        var timer = setInterval(Marquee, speed);
        tab.onmouseover = function () {
            clearInterval(timer);
        };
        tab.onmouseout = function () {
            timer = setInterval(Marquee, speed);
        }
        return () => clearInterval(timer)
    }, [])

    return (
        <Wrapper>
            <div className="homepage">
                <div className="homepageBanner One" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/index/banner3.png)` }}>
                    <div className="homepageBannerTitle">{showdata.title}</div>
                    <div className="homepageTextOne" dangerouslySetInnerHTML={{ __html: showdata.titlebannertext }}></div>
                </div>
                <div id="demo">
                    <div id="demoin">
                        <div id="demo1">
                            {
                                showdata.bannerone.map((item, index) => {
                                    return (
                                        <span className="homepageBannerFlineText" style={{ width: 800 }} key={index} dangerouslySetInnerHTML={{ __html: item }}></span>
                                    )

                                })
                            }
                        </div>
                        <div id="demo2">
                            {
                                showdata.bannerone.map((item, index) => {
                                    return (
                                        <span className="homepageBannerFlineText" style={{ width: 800 }} key={index} dangerouslySetInnerHTML={{ __html: item }}></span>
                                    )

                                })
                            }
                        </div>
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
                                {/* <span className="title-wrapper"> */}
                                {/* <span className="title-left-icon"></span> */}
                                <span className="title-text" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/index/wraptitle.png)` }}>{showdata.logotitle[0]}</span>
                                {/* <span className="title-right-icon"></span> */}
                                {/* </span> */}
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
                                {/* <br />
                                {createLogo("homepagelogocoop", logocoopdata.university, 'school/')} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}



export default HomePage