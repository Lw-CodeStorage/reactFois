import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import { MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles'

import theme from "./components/theme"
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import MemberRegisterPage from './components/RegisterPage/MemberRegisterPage/MemberRegisterPage'
import SystemPage from './components/SystemPage/SystemPage'
import AppBar from './components/AppBar/AppBar'
import ActivityPage from './components/ActivityPage/ActivityPage'
import TestPage from './components/TestPage/TestPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

//import . 代表此層 ..代表上一層
// npm run-script build
// 若在component裡面寫  Route 可以做到同時呈現兩個route的結果

export const LogInState = React.createContext(null);//宣告Context
function Main() {
  let [loginState, setLoginState] = useState(false);

  //當網頁重整時會重新渲染，連原本的useState都會被還原，因此加判斷
  //為了避免跨網站加cookise的攻擊，在登入狀態上除了判斷cookie是否有校外也將token上傳至伺服器判斷
  useEffect(() => {
    if (document.cookie.indexOf('state') === 0) {
      // if (Boolean(document.cookie.split(';').find(row => row.startsWith('state')).split('=')[1])) {
      let postData = new FormData()
      postData.append('userOnReload', '')
      postData.append('JWT', document.cookie.split(';').find(row => row.startsWith('state')).split('=')[1])
      fetch('https://demo.fois.online/Fois_Class/Main.php', {
        method: 'POST',
        body: postData,
      }).then(res => {
        return res.json();
      }).then(result => {
        if (result == '有效') {
          console.log('cookie 有效');
          console.log('token  有效');
          setLoginState(true)
        } else {
          console.log('token  無效');
        }

      })
      // }
    } else {
      console.log('cookie 無效');
      setLoginState(false)
    }

  }, [loginState])
  //偵測cookie效期，失效將更改setLogState狀態，引發渲染並重新判斷狀態
  setInterval(() => {
    if (document.cookie.indexOf('state') !== 0) {
      console.log('cookie 無效');
      setLoginState(false)
    }
  }, 300000);
  return (
    <>
      {/* 套用自訂義主題樣式 */}
      <ThemeProvider theme={theme}>
        <LogInState.Provider value={[loginState, setLoginState]}>
          <Router>
            <AppBar />
            {/* <Header/> */}
            <Switch>
              <Route exact path="/" component={HomePage}></Route>
              {/* 這裡設定的是預防url直接導向 */}
              <Route exact path="/登入" component={loginState ? HomePage : LoginPage}></Route>
              <Route exact path="/註冊" component={RegisterPage}></Route>
              <Route exact path="/註冊/學生註冊" component={MemberRegisterPage}></Route>
              <Route exact path="/學職活動" component={ActivityPage}></Route>
              <Route path="/系統" component={loginState ? SystemPage : LoginPage}></Route>
              <Route component={RegisterPage} />
            </Switch>

          </Router>
        </LogInState.Provider>
      </ThemeProvider>
    </>
  )
}

ReactDOM.render(
  < Main />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
