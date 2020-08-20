import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import TextfieldHidePass from './TextfieldHidePass/TextfieldHidePass';
import DatePicker from './DatePicker/DatePicker'
import ServiceDialog from './ServieDialog/ServiceDialog'
import PrivacyDialog from './PrivacyDialog/PrivacyDialog'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Grid, Card, TextField, Typography } from '@material-ui/core';
import './MemberRegister.css'
// import jQuery from 'jquery'

export const MemberRegisterData = React.createContext(null);//宣告Context

export default function MemberRegisterPage({ setRegisterState }) {

    let [memberRegisterData, setMemberRegisterData] = useState({
        Name: '',
        Password: '',
        Email: '',
        serviceCheck: false,
        privacyCheck: false
    })

    let [error, setErrorState] = useState({
        Name: { errorState: false, helperText: '' },
        Password: { errorState: false, helperText: '' },
        Email: { errorState: false, helperText: '' },
        // licenseKey: { errorState: false, helperText: '' }
    })
    let [open, setOpen] = useState(false)

    let [respon, setRespon] = useState('註冊失敗')

    let [alertState, setAlertState] = useState('error');

    let history = useHistory()


    let handleClose = (event, reason) => {

        setOpen(false);
    };

    let dateBind = props => event => {
        // 在物件裡的索引裡面用[]代表使用的是變數
        setMemberRegisterData({ ...memberRegisterData, [props]: event.target.value })

        //當輸入時變回原本的樣子，直到下一次註冊時才會偵測
        setErrorState({ ...error, [props]: { errorState: false, helperText: '' } })

    }

    let registerHandle = (prevCount) => {

        //註冊時發現有未填的欄位給上error和helperText
        let obj = {}

        if (memberRegisterData.Name === '') {
            setOpen(true)
            obj.Name = { errorState: true, helperText: '請輸入姓氏' }
        }
        if (memberRegisterData.Password === '') {
            setOpen(true)
            obj.Password = { errorState: true, helperText: '請輸入密碼' }
        }
        if (memberRegisterData.Email === '') {
            setOpen(true)
            obj.Email = { errorState: true, helperText: '請輸入電子郵件' }
        }
        // if (memberRegisterData.licenseKey === '') {
        //     setOpen(true)
        //     obj.licenseKey = { errorState: true, helperText: '輸入金鑰開通' }
        // }
        setErrorState({ ...error, ...obj }) //如果有錯誤 將錯誤狀態加入錯誤的state中
        console.log(memberRegisterData)
        if (Object.keys(obj).length == 0) {
            fetch('https://demo.fois.online/Fois_Class/Main.php', {
                method: 'POST',
                body: JSON.stringify({ 'key': 'memberRegistered', 'formData': memberRegisterData }),
            }).then(res => {
                return res.json();
            }).then(result => {
                if (result['狀態'] === '註冊成功') {
                    setAlertState('success')
                    setRespon('註冊成功')
                    setOpen(true)
                    history.push('/登入')
                } else {
                    setAlertState('error')
                    setRespon(result.errorCode)
                    setOpen(true)
                    console.log(result.errorCode)
                }
            }).catch((error) => console.error('Error:', error))
        }


    }

    return (
        <MemberRegisterData.Provider value={[memberRegisterData, setMemberRegisterData]}>

            <Card className='CardContainer'>
                {/* <Typography color='primary' className='memnerRegisterTitle'>學生會員註冊</Typography> */}

                <Grid container spacing={2}>

                    <Grid item xs={6} >
                        <TextField
                            fullWidth
                            size='small'
                            label="稱呼"
                            variant="outlined"
                            value={memberRegisterData.Name}
                            onChange={dateBind('Name')}
                            error={error.Name.errorState}
                            helperText={error.Name.helperText}>
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextfieldHidePass
                            error={error.Password.errorState}
                            helperText={error.Password.helperText}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            size='small'
                            label="電子郵件"
                            variant="outlined"
                            value={memberRegisterData.Email}
                            onChange={dateBind('Email')}
                            error={error.Email.errorState}
                            helperText={error.Email.helperText}>
                        </TextField>
                    </Grid>
                    {/* <Grid item xs={12} >
                        <TextField
                            fullWidth
                            size='small'
                            label="授權碼"
                            variant="outlined"
                            value={memberRegisterData.licenseKey}
                            onChange={dateBind('licenseKey')}
                            error={error.licenseKey.errorState}
                            helperText={error.licenseKey.helperText} >
                        </TextField>
                    </Grid> */}

                </Grid>
                <Grid container  >
                    <Grid item >
                        <ServiceDialog />
                    </Grid>
                    <Grid item >
                        <PrivacyDialog />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12} >
                        <Button fullWidth size='small'
                            disabled={(memberRegisterData.serviceCheck && memberRegisterData.privacyCheck) ? false : true}
                            variant="contained"
                            color="primary"
                            onClick={registerHandle}>註冊</Button>
                    </Grid>
                    <Grid item xs={12} >
                        <Button fullWidth
                            size='small' color='primary' onClick={() => { setRegisterState(false) }}>返回登入</Button>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} variant="filled" severity={alertState}>
                        {respon}
                    </Alert>
                </Snackbar>
            </Card>
        </MemberRegisterData.Provider>

    )
}