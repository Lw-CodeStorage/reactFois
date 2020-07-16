//react
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch, useHistory } from "react-router-dom";
import MemberRegisterPage from './MemberRegisterPage/MemberRegisterPage.js'
//self
import Banner from '../Banner/Banner'
import BannerImage from '../img/FOIS_Web-登入.jpg';
import './RegisterPage.css'


export default function RegisterPage(props) {
    const { path, url } = useRouteMatch();
    let RegisterDOM = (<div className="selfContainer">
    <div className="selfcard animated fadeInLeftBig">
        {/* <div className="circle">
        <i className="fas fa-user" />
    </div> */}
        <h1 style={{ fontWeight: 900 }}>學生會員</h1>
        <div className="subTitle">
            <p style={{ fontWeight: 900 }}>學生身份註冊使用</p>
            {/*<p style="font-weight:900;">入會費 : 500 /  年</p>*/}
        </div>
        <div className="detail1">
            <p style={{ fontSize: 15 }}><i className="fas fa-arrow-right" /> 可使用line@機器人功能</p>
            <p style={{ fontSize: 15 }}><i className="fas fa-arrow-right" /> 可接微型工作任務派案</p>
            <p style={{ fontSize: 15 }}><i className="fas fa-arrow-right" /> 入會費可折抵課程費用</p>
            <p style={{ fontSize: 15 }}><i className="fas fa-arrow-right" /> 免費使用職業適性評量</p>
        </div>
        <Link to={`${url}/學生註冊`}><i className="fas fa-user-plus" />註冊學生會員</Link>

    </div>
    <div className="selfcard animated fadeIn">
        {/* <div className="circle">
        <i className="fas fa-user-graduate" />
    </div> */}
        <h1 style={{ fontWeight: 900 }}>導師會員</h1>
        <div className="subTitle">
            <p style={{ fontWeight: 900 }}>導師、顧問身份註冊使用</p>
            {/*<p style="font-weight:900;">入會費 : 1000 / 年</p>*/}
        </div>
        <div className="detail2">
            <p style={{ fontSize: 15 }}><i className="fas fa-arrow-right" /> 可使用line@機器人功能</p>
            <p style={{ fontSize: 15 }}><i className="fas fa-arrow-right" /> 可承接課程與輔導派案</p>
            <p style={{ fontSize: 15 }}><i className="fas fa-arrow-right" /> 入會費可折抵課程費用</p>
            <p style={{ fontSize: 15 }}><i className="fas fa-arrow-right" /> 可免費校準課程教案表</p>
        </div>
        <a href="register1-2.html"><i className="fas fa-user-plus" />註冊導師會員</a>

    </div>
    <div className="selfcard animated fadeInRightBig">
        {/* <div className="circle">
        <i className="fas fa-user-tie" />
    </div> */}
        <h1 style={{ fontWeight: 900 }}>企業會員</h1>
        <div className="subTitle">
            <p style={{ fontWeight: 900 }}>公司、企業、行號註冊使用</p>

        </div>
        <div className="detail3">
            <p style={{ fontSize: 15 }}><i className="fas fa-arrow-right" /> 免費使用考勤薪資系統</p>
            <p style={{ fontSize: 15 }}><i className="fas fa-arrow-right" /> 免費使用人才招募系統</p>
            <p style={{ fontSize: 15 }}><i className="fas fa-arrow-right" /> 入會費可折抵課程費用</p>
            <p style={{ fontSize: 15 }}><i className="fas fa-arrow-right" /> 可免費校準工作說明書</p>
        </div>
        <a href="register1-3.html"><i className="fas fa-user-plus" />註冊企業會員</a>
        {/* <button> 我 要 註 冊 </button> */}
    </div>
</div>)
    return (
        <>
            <Banner phto={BannerImage}></Banner>
            <Switch>
                <Route exact path={`${path}`} render={()=>RegisterDOM}></Route>
                <Route path={`${path}/學生註冊`} component={MemberRegisterPage}></Route>
            </Switch>
        </>
    )
}
