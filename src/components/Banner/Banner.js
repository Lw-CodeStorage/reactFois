import React from 'react';
import './Banner.min.css'
const Banner = (props) => {
    return (
        <div className="banner">
            <div className="bannerImage" style={{backgroundImage:`url("../img/FOIS_Web-登入.jpg")`}}></div>
            <div className="bannerImageCover" />
            <div className="bannerTextCover">
                <i className="fas fa-user-plus" />會員註冊
             </div>
        </div>)
}
export default Banner