import React, { useState, useContext } from 'react'
import Warning from '../Warning/Warning'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Typography } from '@material-ui/core';

import './LoginPage.min.css'

import $ from "jquery"
import './ShowPwd.min.css'

import { LogInState } from '../../';

let showPassWordHandler = () => {

    $(document).ready(function () {

        $('[for="login_user_name"]').css("display", "none");
        $('[for="login_pass_word"]').css("display", "none");
        $("#login_user_name").attr('placeholder', '帳號');
        $("#login_pass_word").attr('placeholder', '密碼');
    });
    $(".bt-showpwd").on("click", function (e) {

        e.preventDefault();
        var $this = $(this);
        var $password = $this.closest(".password-wrap");
        var $input = $password.find('input');
        var $inputWrap = $password.find('.password-input');
        var newinput = '', inputHTML = $inputWrap.html(), inputValue = $input.val();
        if ($input.attr('type') === 'password') {
            newinput = inputHTML.replace(/type\s*=\s*('|")?password('|")?/ig, 'type="text"');
            $inputWrap.html(newinput).find('input')[0].value = inputValue.toString();
            $this.removeClass("on").addClass("off");

        }
        else {
            newinput = inputHTML.replace(/type\s*=\s*('|")?text('|")?/ig, 'type="password"');
            $inputWrap.html(newinput).find('input')[0].value = inputValue.toString();
            $this.removeClass("off").addClass("on");

        }
    });
}
const ShowPwd = (props) => {
    let { password, setPassword } = props

    return (
        <div className="password-wrap">
            <div className="password-input">
                <p className="login-password">
                    <input type="password" value={password} onChange={setPassword} className="form-control passwordInput" id="login_pass_word" name="pwd" placeholder="請輸入您的學生會員密碼" />
                </p>
            </div>
            <i onClick={showPassWordHandler} className="bt-showpwd on" />
        </div>
    )
}

const LoginPage = (props) => {
    let [account, setAccount] = useState('')
    let [password, setPassWord] = useState('')
    let [open, setOpen] = useState(false);
    let [loginState, setLoginState] = useContext(LogInState)
    let history = useHistory()
 
    const handleClose = (event, reason) => {
        setOpen(false);
    }

    function fetchData() {
        document.cookie="state=true;max-age =30; path=/";
       setLoginState(true)
       history.push('/系統')
        // loginState  = setLoginState(Boolean(document.cookie.split(';').find(row => row.startsWith('state')).split('=')[1]))
        // console.log(loginState);
        // console.log(loginState);
        
        
        // let postData = new FormData()
        // postData.append('userLogin', '')
        // postData.append('account', account)
        // postData.append('password', password)
        // fetch('https://demo.fois.online/Fois_Class/Main.php', {
        //     method: 'POST',
        //     body: postData,
        // })
        //     .then(res => {
        //         return res.json();
        //     }).then(result => {
        //         console.log(result);
        //         if (result === '帳戶正確') {
        //             history.push("/");
        //             setLoginState(true)
        //         } else {
        //             sessionStorage.setItem('ㄔㄧㄟ', 'value');
        //             setLoginState(false)
        //             setOpen(true);
        //         }
        //     });
    }

    return (
        <div className="warp" >

            <div className="loginCard">
                <Typography variant="h5">輸入帳號密碼登入系統</Typography>
                <p className="login-username">
                    <input type="text" value={account} onChange={(e) => { setAccount(e.target.value) }} className="form-control accountInput" id="login_user_name" name="log" placeholder="請輸入您的學生會員帳號" />
                </p>
                <ShowPwd password={password} setPassword={(e) => { setPassWord(e.target.value) }} />
                <p className="login-submit">

                    <button  onClick={fetchData}
                        className="btn btn-success loginButton " style={{ background: '#f58400', borderColor: '#f58400' }}>
                        <i className="fas fa-sign-in-alt" />登入</button>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}>
                        <Alert onClose={handleClose} variant="filled" severity="error">
                            登入失敗！
                         </Alert>
                    </Snackbar>
                </p>

                <div className="adiv">
                    <a >
                        <i className="fas fa-user-plus" />註冊帳號</a>
                    <a>
                        <i className="fas fa-question" />忘記密碼</a>
                </div>

            </div>
        </div>)
}





export default LoginPage