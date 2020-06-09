import React from 'react';
import './HomePage.min.css'
import BannerImage1 from'./FOIS_Web_home01-compressed.jpg'
import BannerImage2 from'./FOIS_Web_home02-compressed.jpg'
import BannerImage3 from'./FOIS_Web_home03-compressed.jpg'
const HomePage = (props) => {
    return (
        <div>
            {/* banner*/}
            <div className="banner ">
                <div className="bannerContainer ">
                    <div className="imageCover" />
                    <div className="textCover">
                        <p className="imageCoverTitle imageCoverTitlePhone" id="text_title"> '學 職 專 家 服 務 平 台'</p>
                        <p className="imageCoverSubTitle1 imageCoverSubTitle1Phone" id="text_contnet"> 接 軌 國 際 ． 與 時 俱 進 ． 在 地 適 用</p>
                    </div>
                    <div id="carouselExampleFade" className=" carousel slide carousel-fade " data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleFade" data-slide-to={0} className="active" />
                            <li data-target="#carouselExampleFade" data-slide-to={1} />
                            <li data-target="#carouselExampleFade" data-slide-to={2} />
                        </ol>
                        <div className="carousel-inner ">
                            <div className="carousel-item active ">
                                <img src={BannerImage1} className="d-block w-100 " alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={BannerImage2} className="d-block w-100 " alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={BannerImage3} className="d-block w-100 " alt="..." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/**/}
            {/*--------------------------最新活動-----------------*/}
            <div className="lastNewsContainer">
                <div className="lastNews">
                    <p>最新活動</p>
                </div>
            </div>
            <div className="cardContainer " id="Activity_Card_Container">
                <div>
                    <a style={{ backgroundImage: 'url(img/noimage.svg)' }} />
                    <div className="cardSubInfo">
                        <span className="rank ">
                        </span>
                        <span className="person"><i className="fas fa-user">
                        </i> 名額：尚未開放</span>
                    </div>
                    <div className="cardText">
                        <p className="cardTitle cellTitle">尚未開放</p>
                        <i className="cardLoveButton fas fa-heart" />
                        <p className="cardTime cellTime"><i className="far fa-clock" />活動開始：尚未開放</p>
                    </div>
                </div>
                <div>
                    <a style={{ backgroundImage: 'url(img/noimage.svg)' }} />
                    <div className="cardSubInfo">
                        <span className="rank ">
                        </span>
                        <span className="person"><i className="fas fa-user">
                        </i> 名額：尚未開放</span>
                    </div>
                    <div className="cardText">
                        <p className="cardTitle cellTitle">尚未開放</p>
                        <i className="cardLoveButton fas fa-heart" />
                        <p className="cardTime cellTime"><i className="far fa-clock" />活動開始：尚未開放</p>
                    </div>
                </div>
                <div>
                    <a style={{ backgroundImage: 'url(img/noimage.svg)' }} />
                    <div className="cardSubInfo">
                        <span className="rank ">
                        </span>
                        <span className="person"><i className="fas fa-user">
                        </i> 名額：尚未開放</span>
                    </div>
                    <div className="cardText">
                        <p className="cardTitle cellTitle">尚未開放</p>
                        <i className="cardLoveButton fas fa-heart" />
                        <p className="cardTime cellTime"><i className="far fa-clock" />活動開始：尚未開放</p>
                    </div>
                </div>
                <a href="/%e5%ad%b8%e8%81%b7%e6%b4%bb%e5%8b%95" className="moreActivity">
                    <p>查看更多活動</p>
                </a>
            </div>
            {/*---------------------------------------------------*/}
            {/*-------------------------最新派案--------------------*/}
            <div className="lastNewsContainer">
                <div className="lastNews">
                    <p>最新派案</p>
                </div>
            </div>
            <div className="cardContainer " id="Bid_Card_Container">
                <div>
                    <a style={{ backgroundImage: 'url(/img/noimage.svg)' }} />
                    <div className="cardSubInfo">
                        <span className="rank ">
                        </span>
                        <span className="person">
                            <i className="fas fa-dollar-sign" /> 金額：00,000</span>
                    </div>
                    <div className="cardText">
                        <p className="cardTitle cellTitle">尚未開放</p>
                        <i className="cardLoveButton fas fa-heart" />
                        <p className="cardTime cellTime"><i className="far fa-clock" />競標截止：尚未開放</p>
                    </div>
                </div>
                <div>
                    <a style={{ backgroundImage: 'url(/img/noimage.svg)' }} />
                    <div className="cardSubInfo">
                        <span className="rank ">
                        </span>
                        <span className="person">
                            <i className="fas fa-dollar-sign" /> 金額：00,000</span>
                    </div>
                    <div className="cardText">
                        <p className="cardTitle cellTitle">尚未開放</p>
                        <i className="cardLoveButton fas fa-heart" />
                        <p className="cardTime cellTime"><i className="far fa-clock" />競標截止：尚未開放</p>
                    </div>
                </div>
                <div>
                    <a style={{ backgroundImage: 'url(/img/noimage.svg)' }} />
                    <div className="cardSubInfo">
                        <span className="rank ">
                        </span>
                        <span className="person">
                            <i className="fas fa-dollar-sign" /> 金額：00,000</span>
                    </div>
                    <div className="cardText">
                        <p className="cardTitle cellTitle">尚未開放</p>
                        <i className="cardLoveButton fas fa-heart" />
                        <p className="cardTime cellTime"><i className="far fa-clock" />競標截止：尚未開放</p>
                    </div>
                </div>
                <a href="/%e6%b4%be%e6%a1%88%e7%ab%b6%e6%a8%99" className="moreActivity">
                    <p>更多競標</p>
                </a>
            </div>
            {/*--------------------------------------------------------------------*/}
        </div>

    )
}
export default HomePage