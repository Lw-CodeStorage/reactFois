import React from 'react';
import './ActivityCard.css';


export default function ActivityCard() {

    return (
        <div className="activityCardContainer">
            <div className="ribbonRelative">
                <p className="ribbon"> 招生中</p>
            </div>
            <div className="imageScale">
                <div className="activityPageImage">
                    <p className="imageTitle">數位自由工作者養成班</p>
                </div>
                <div className="imageImage">
                    <i className="fas fa-info-circle" />
                </div>
            </div>
            <div className="activityTitle">
                <div className="title">
                    <p>新手入門養成類新手入新手入門入新手入門門</p>
                </div>
                <div className="activityQuota">
                    名額：<span>25</span>
                </div>
            </div>
            <div className="activityIntroduction">
                <p>青年相比畢業第二是指字元爭取，新竹校園法律責任黑色分析也在創意，求助總部早就福州流行美容咖啡隊伍您現在處理來了，工人章節，土地夢幻確實主流說了種種凱文利益一體難得單位眾多第二傳輸，群眾真正風格，集團。
                </p>
            </div>
            <div className="activityInfo">
                <p>報名開始: <span>2019/01/30</span> </p>
                <p>報名截止: <span>2019/7/30</span> </p>
                <a className="rigisterNow" href>立即報名</a>
            </div>
        </div>

    );
}

