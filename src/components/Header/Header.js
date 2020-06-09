import React ,{useState,useContext}from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} 
from "react-router-dom";
import './Header.css';
import logo from './ChampLogo.svg';
import { LogInState } from '../../index';
export default function Header() {
  let [loginState, setLoginState] = useContext(LogInState)
  return (
    <>
      <div className="header">
        {/*----------RWD-----------------*/}
        <div className="overlaymenu overlaymenuActivity ">
          <a className="fas fa-times closeMenu" />
          <p>
            <a href="<?php home_url(); ?>/%e6%b4%be%e6%a1%88%e7%ab%b6%e6%a8%99">派案</a>
          </p>
          <p>
            <a href="<?php home_url(); ?>/%e5%ad%b8%e8%81%b7%e6%b4%bb%e5%8b%95">學職活動</a>
          </p>
          <p>
            <a href="<?php home_url(); ?>/%e9%97%9c%e6%96%bc%e6%88%91%e5%80%91">關於我們</a>
          </p>
        </div>
        <div className="menuPhone ">
          <i className=" fas fa-bars" />
        </div>
        <div className="logoPhone">
          <a>
            <img src={logo} alt style={{ height: '100%' }} />
          </a>
        </div>
        <a>
          <div className="logoutPhone1">
            <i className="fas fa-sign-in-alt" />
          </div>
        </a><div className="popMenuPhone"><a>
        </a><div className="popMenuContainer"><a>
        </a><a href="#" className="fas fa-times close" id="close_btn" />
            <div className="usImage">
              <div style={{ width: 100, height: 100, borderRadius: '50%', backgroundImage: 'url(/wp-content/plugins/FOIS2.0_plugins/img/noimage.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              </div>
            </div>
            <div className="usInfo">
              <span>王仁佑</span>
              <small>管理者</small>
              <p>st831209@gmail.com</p>
              <input type="hidden" id="Rating_Star_Score" />
              <div style={{ padding: '5px 0px 0px 0px' }} id="all_rating" name="Rating_Star" />
            </div>
            <div className="funcButton">
              <a href="<?php echo home_url(); ?>/%e5%b8%b3%e8%99%9f%e7%ae%a1%e7%90%86">
                帳號管理</a>
              <a href="<?php echo home_url(); ?>/%e5%b8%b3%e8%99%9f%e7%ae%a1%e7%90%86">
                帳號管理</a>
              <a href="<?php echo home_url(); ?>/%e6%8e%88%e6%ac%8a%e7%ae%a1%e7%90%86">
                授權管理</a>
              <a href="<?php echo home_url(); ?>/%e9%a0%90%e7%b4%84%e7%ae%a1%e7%90%86-%e7%ae%a1%e7%90%86%e8%80%85">
                預約管理</a>
              <a className="funcButtonSC" href="<?php echo wp_logout_url(); ?>">
                登出</a>
            </div>
          </div>
        </div>
        {/*-------------------------------------*/}
        <div className="headerContainer">
          
            <Link to="/">
              <div className="logo" style={{ paddingTop: 0 }}>
                <img src={logo} alt style={{ height: 59 }} />
              </div>
            </Link>
            <div className="menu">
              <ul>
                <li className="menuli5">
                  <Link to="/派案競標">派案競標</Link>
                </li>
                <li className="menuli1">
                  <Link to="/學職活動">學職活動</Link>
                </li>
                <li className="menuli4">
                  <Link to="/關於我們">關於我們</Link>
                </li>
              </ul>
            </div>
            <div className="fbtn">
              <Link to="/登入"> 登入</Link>
              ｜
              <Link to="/註冊"> 註冊</Link>
              <div className="popMenu" style={loginState?{display:'block'}:{display:'none'}}>
                <div className="popMenuContainer">
                  <a href="#" className="fas fa-times close" id="close_btn" />
                  <div className="usImage">
                    <div style={{ width: 100, height: 100, borderRadius: '50%', backgroundImage: 'url(/wp-content/plugins/FOIS2.0_plugins/img/noimage.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    </div>
                  </div>
                  <div className="usInfo">
                    <span>王仁佑</span>
                    <small>管理者</small>
                    <p>st831209@gmail.com</p>
                    <input type="hidden" id="Rating_Star_Score" />
                    <div style={{ padding: '5px 0px 0px 0px' }} id="all_rating" name="Rating_Star" />
                  </div>
                  <div className="funcButton">
                    <a href="<?php echo home_url(); ?>/%e5%b8%b3%e8%99%9f%e7%ae%a1%e7%90%86">
                      {/*<i class="fas fa-file-invoice"></i>*/}帳號管理</a>
                    <a href="<?php echo home_url(); ?>/%e5%b8%b3%e8%99%9f%e7%ae%a1%e7%90%86">
                      {/*<i class="fas fa-file-invoice"></i>*/}帳號管理</a>
                    <a href="<?php echo home_url(); ?>/%e6%8e%88%e6%ac%8a%e7%ae%a1%e7%90%86">
                      {/*<i class="fas fa-key"></i>*/}授權管理</a>
                    <a href="<?php echo home_url(); ?>/%e9%a0%90%e7%b4%84%e7%ae%a1%e7%90%86-%e7%ae%a1%e7%90%86%e8%80%85">
                      {/*<i class="fas fa-pen-square"></i>*/}預約管理</a>
                    <a className="funcButtonSC" href="<?php echo wp_logout_url(); ?>">
                      {/*<i class="fas fa-sign-out-alt"></i>*/}登出</a>
                  </div>
                </div>
              </div>
            </div>     
        </div>
      </div>

    </>
  );
}


