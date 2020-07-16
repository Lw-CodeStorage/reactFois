import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import { MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from "./components/theme"
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import SystemPage from './components/SystemPage/SystemPage'

import AppBar from './components/AppBar/AppBar'
import ActivityPage from './components/ActivityPage/ActivityPage'
import TestPage from './components/TestPage/TestPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

// npm run-script build
// 若在component裡面寫  Route 可以做到同時呈現兩個route的結果
export const LogInState = React.createContext(null);//宣告Context

function Main() {
  let [loginState, setLoginState] = useState(false);
  let history = useHistory()

  //當網頁重整時會重新渲染，連原本的useState都會被還原，因此加判斷
  //為了避免跨網站加cookise的攻擊，在登入狀態上除了判斷cookie是否有校外也將token上傳至伺服器判斷
  useEffect(() => {
    let cookies = document.cookie.split(';')
    let state = ''
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].indexOf('state') >= 0) {
        state = cookies[i].split('=')[1]
      } 
    }
    console.log('app主頁');
    if (state != '') {
      fetch('https://demo.fois.online/Fois_Class/Main.php', {
        method: 'POST',
        body: JSON.stringify({ key: 'userOnReload', 'JWT': state }),
      }).then(res => {
        return res.json();
      }).then(result => {
        if (result.狀態 == '判別成功') {
          console.log('登入中..');   
          setLoginState(true)
        } else {
          console.log(result.errorCode);
          //後端JWT過期
          setLoginState(false)
        }
      })
    } else {
      //本地cookie過期
      setLoginState(false)
    }

  }, [loginState])

  //偵測cookie效期，失效將更改setLogState狀態，引發渲染並重新判斷狀態
  setInterval(() => {
    let cookies = document.cookie.split(';')
    let state = ''
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].indexOf('state') >= 0) {
        state = cookies[i].split('=')[1]
      } 
    }
    if (state == '') {
      setLoginState(false)
      console.log('登出');
    }else{
      console.log('登入中..');
    }
  }, 3000);
  return (
    <>
      {/* 套用自訂義主題樣式 */}
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <LogInState.Provider value={[loginState, setLoginState]}>
            <Router>
              {/* <AppBar /> */}
              {/* <Header/> */}
              <Switch>

                <Route path="/系統" component={loginState ? SystemPage : LoginPage}></Route>
                <Route path="/註冊" component={loginState ? SystemPage : RegisterPage}></Route>
                <Route path="/" component={loginState?SystemPage : LoginPage}></Route>
                <Route >
                  <h3>11111111</h3>
                </Route>
              </Switch>
            </Router>
          </LogInState.Provider>
        </ThemeProvider>
      </CssBaseline>
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
