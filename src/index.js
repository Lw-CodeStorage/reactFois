import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import theme from "./components/theme"
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import MemberRegisterPage from './components/RegisterPage/MemberRegisterPage/MemberRegisterPage'
import TestPage from './components/TestPage/TestPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

//import . 代表此層 ..代表上一層
// npm run-script build
// 若在component裡面寫  Route 可以做到同時呈現兩個route的結果

export const LogInState = React.createContext(null);//宣告Context
function Main() {
  let [loginState, setLoginState] = useState(false);
  useEffect(() => {
    if (document.cookie.indexOf('state') === 0) {
      if(Boolean(document.cookie.split(';').find(row => row.startsWith('state')).split('=')[1])){
        console.log('cookie 有效');
        setLoginState(true)
      } 
    } else {
      console.log('cookie 無效');
      setLoginState(false)
    }

  }, [loginState])
  setInterval(() => {
    if (document.cookie.indexOf('state') !== 0) {
      console.log('cookie 無效');
      setLoginState(false)
    }
  }, 3000);
  return (
    <React.StrictMode>
      {/* 套用自訂義主題樣式 */}
      <ThemeProvider theme={theme}>
        <LogInState.Provider value={[loginState, setLoginState]}>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/登入" component={loginState ? LoginPage : }></Route>
              <Route exact path="/註冊" component={RegisterPage}></Route>
              <Route exact path="/註冊/學生註冊" component={MemberRegisterPage}></Route>
              <Route exact path="/系統" component={loginState ? TestPage : LoginPage}></Route>
              {/* <Route exact path="/" >{loginState ? <Redirect to="/" /> : < RegisterPage />} </Route> */}
              <Route component={RegisterPage} />
            </Switch>
          </Router>
        </LogInState.Provider>
      </ThemeProvider>
    </React.StrictMode>)
}

ReactDOM.render(
  < Main />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
