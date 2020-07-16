import React, { useState, useContext, useEffect, useRef } from 'react'


import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { LogInState } from '../../'; //context
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import loginBackGround from './loginPageBackground-press.jpg'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${loginBackGround})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  let [account, setAccount] = useState('member02')
  let [password, setPassWord] = useState('123456789')
  let [open, setOpen] = useState(false);
  let [loginState, setLoginState] = useContext(LogInState)
  let history = useHistory()
  let response = useRef('登入錯誤')
  const handleClose = (event, reason) => {
    setOpen(false);
  }
  function fetchData() {
    fetch('https://demo.fois.online/Fois_Class/Main.php', {
      method: 'POST',
      body: JSON.stringify({ key: 'userLogin', 'account': account, 'password': password }),
    })
      .then(res => {
        return res.json();
      }).then(result => {
        // console.log(result);
        if (result['狀態'] === '登入成功') {
          document.cookie = `state=${result['JWT']};max-age =3000; path=/`;
          history.push('/系統/編輯履歷/個資')
          setLoginState(true) //LoginState為全域變數，因此從全域變數的根開始重新渲染s
        } else {
          response.current = result.errorCode //ref
          setLoginState(false)
          setOpen(true);
        }
      });
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid className={classes.paperContainer} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            FOIS <small>v1.2</small>
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="使用者帳號"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => { setAccount(e.target.value) }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="使用者密碼"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => { setPassWord(e.target.value) }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={fetchData}
            >
              登 入
            </Button>
            <Grid container>
              <Grid item xs>
                忘記密碼
              </Grid>
              <Grid item>
                <Link to='/註冊'>
                  還沒有帳號嗎？ 快註冊一個吧！
                </Link>
              </Grid>
            </Grid>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}>
              <Alert onClose={handleClose} variant="filled" severity="error">
                {response.current}
              </Alert>
            </Snackbar>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
// import React, { useState, useContext,useEffect ,useRef} from 'react'
// import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
// import Snackbar from '@material-ui/core/Snackbar';
// import Alert from '@material-ui/lab/Alert';
// import { Typography } from '@material-ui/core';

// import './LoginPage.css'

// import $ from "jquery"


// import { LogInState } from '../../';

// let showPassWordHandler = () => {

//     $(document).ready(function () {

//         $('[for="login_user_name"]').css("display", "none");
//         $('[for="login_pass_word"]').css("display", "none");
//         $("#login_user_name").attr('placeholder', '帳號');
//         $("#login_pass_word").attr('placeholder', '密碼');
//     });
//     $(".bt-showpwd").on("click", function (e) {

//         e.preventDefault();
//         var $this = $(this);
//         var $password = $this.closest(".password-wrap");
//         var $input = $password.find('input');
//         var $inputWrap = $password.find('.password-input');
//         var newinput = '', inputHTML = $inputWrap.html(), inputValue = $input.val();
//         if ($input.attr('type') === 'password') {
//             newinput = inputHTML.replace(/type\s*=\s*('|")?password('|")?/ig, 'type="text"');
//             $inputWrap.html(newinput).find('input')[0].value = inputValue.toString();
//             $this.removeClass("on").addClass("off");

//         }
//         else {
//             newinput = inputHTML.replace(/type\s*=\s*('|")?text('|")?/ig, 'type="password"');
//             $inputWrap.html(newinput).find('input')[0].value = inputValue.toString();
//             $this.removeClass("off").addClass("on");

//         }
//     });
// }
// const ShowPwd = (props) => {
//     let { password, setPassword } = props

//     return (
//         <div className="password-wrap">
//             <div className="password-input">
//                 <p className="login-password">
//                     <input type="password" value={password} onChange={setPassword} className="form-control passwordInput" id="login_pass_word" name="pwd" placeholder="請輸入您的學生會員密碼" />
//                 </p>
//             </div>
//             <i onClick={showPassWordHandler} className="bt-showpwd on" />
//         </div>
//     )
// }

// const LoginPage = (props) => {
//     let [account, setAccount] = useState('member01')
//     let [password, setPassWord] = useState('123456789')
//     let [open, setOpen] = useState(false);
//     let [loginState, setLoginState] = useContext(LogInState)
//     let history = useHistory()
//     let response =useRef('登入錯誤')
//     const handleClose = (event, reason) => {
//         setOpen(false);
//     }

//     function fetchData() {

//         fetch('https://demo.fois.online/Fois_Class/Main.php', {
//             method: 'POST',
//             body: JSON.stringify({key:'userLogin','account':account,'password':password}),
//         })
//             .then(res => {
//                 return res.json();
//             }).then(result => {
//                 console.log(result);
//                 if (result['狀態'] === '登入成功') {
//                     document.cookie=`state=${result['JWT']};max-age =300; path=/`;
//                     setLoginState(true)
//                     history.push('/系統')//Router跳轉並更改網址路徑
//                 } else {         
//                     response.current =  result.errorCode //ref
//                     setLoginState(false)
//                     setOpen(true);
//                 }
//             });
//     }

//     return (
//         <div className="warp" >

//             <div className="loginCard">
//                 <Typography variant="h5">輸入帳號密碼登入系統</Typography>
//                 <p className="login-username">
//                     <input type="text" 
//                     value={account}
//                      onChange={(e) => { setAccount(e.target.value) }} 
//                      className="form-control accountInput" 
//                      id="login_user_name" 
//                      name="log" 
//                      placeholder="請輸入您的學生會員帳號" />
//                 </p>
//                 <ShowPwd 
//                 password={password} 
//                 setPassword={(e) => { setPassWord(e.target.value) }}
//                  />

//                 <p className="login-submit">
//                     <button  onClick={fetchData}
//                         className="btn btn-success loginButton " style={{ background: '#f58400', borderColor: '#f58400' }}>
//                         <i className="fas fa-sign-in-alt" />登入</button>
//                     <Snackbar
//                         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//                         open={open}
//                         autoHideDuration={3000}
//                         onClose={handleClose}>
//                         <Alert onClose={handleClose} variant="filled" severity="error">
//                           {response.current} 
//                          </Alert>
//                     </Snackbar>
//                 </p>

//                 <div className="adiv">
//                     <a >
//                         <i className="fas fa-user-plus" />註冊帳號</a>
//                     <a>
//                         <i className="fas fa-question" />忘記密碼</a>
//                 </div>

//             </div>
//         </div>)
// }





// export default LoginPage