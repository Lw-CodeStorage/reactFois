import React, { useState } from 'react';
import Hidden from '@material-ui/core/Hidden';
import './ActivityCard.css';


export default function ActivityCard({ data }) {

    return (
        <div className="activityCardContainer">
            <div className="ribbonRelative">
                <p className="ribbon"> 招生中</p>
            </div>
            <div>
                <div className="activityPageImage" style={{ backgroundImage: `url(https://demo.fois.online${data.活動照片})` }} />
            </div>
            <div className="activityTitle">
                <div className="title">
                    <p>{data.活動名稱}</p>
                </div>
                <div className="activityQuota">
                    名額：<span>{data.活動名額}</span>
                </div>
            </div>
            <div className="activityIntroduction">
                <p>{data.活動內容}
                </p>
            </div>
            <div className="activityInfo">
                <Hidden smDown={true}>
                <p>報名開始: <span>{data.活動開始時間}</span> </p>
                <p>報名截止: <span>{data.活動結束時間}</span> </p>
                </Hidden>
                <Hidden mdUp={true}>
                <p>報名開始: <span>{String(data.活動開始時間).split(' ')[0]}</span> </p>
                <p>報名截止: <span>{String(data.活動結束時間).split(' ')[0]}</span> </p>
                </Hidden>
                <a className="rigisterNow" href>立即報名</a>
            </div>
        </div>

    );
}

