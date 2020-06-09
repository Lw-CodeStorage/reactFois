import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import theme from "./theme"
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import MemberRegisterPage from './components/RegisterPage/MemberRegisterPage/MemberRegisterPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

//import . 代表此層 ..代表上一層
// npm run-script build
// 若在component裡面寫  Route 可以做到同時呈現兩個route的結果

export const LogInState = React.createContext(null);//宣告Context
function Main() {
  let [loginState, setLoginState] = useState(false);
  return (
    <React.StrictMode>
      {/* 套用自訂義主題樣式 */}
      <ThemeProvider theme={theme}>
        <LogInState.Provider value={[loginState, setLoginState]}>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/登入" component={LoginPage}></Route>
              <Route exact path="/註冊" component={RegisterPage}></Route>
              <Route exact path="/註冊/學生註冊" component={MemberRegisterPage}></Route>
              <Route exact path="/" >{loginState ? <Redirect to="/" /> : < RegisterPage />} </Route>
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
