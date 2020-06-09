import React, { useState, useEffect } from 'react'
import TextfieldHidePass from './TextfieldHidePass/TextfieldHidePass';
import DatePicker from './DatePicker/DatePicker'
import ServiceDialog from './ServieDialog/ServiceDialog'
import PrivacyDialog from './PrivacyDialog/PrivacyDialog'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Grid, Card, TextField, Typography } from '@material-ui/core';
import './MemberRegister.min.css'
import jQuery from 'jquery'

export const MemberRegisterData = React.createContext(null);//宣告Context

export default function MemberRegisterPage(props) {


    let [memberRegisterData, setMemberRegisterData] = useState({
        lastName: '',
        firstName: '',
        sex: '女',
        birthDay: '',
        idNumber: '',
        phone: '',
        account: '',
        password: '',
        email: '',
        licenseKey: '',
        serviceCheck: false,
        privacyCheck: false
    })

    let [error, setErrorState] = useState({
        lastName: { errorState: false, helperText: '' },
        firstName: { error: false, helperText: '' },
        birthDay: { error: false, helperText: '' },
        idNumber: { error: false, helperText: '' },
        phone: { error: false, helperText: '' },
        account: { error: false, helperText: '' },
        password: { error: false, helperText: '' },
        email: { error: false, helperText: '' },
        licenseKey: { error: false, helperText: '' }
    })
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {

        setOpen(false);
    };

    const dateBind = props => event => {

        // 在物件裡的索引裡面用[]代表使用的是變數
        setMemberRegisterData({ ...memberRegisterData, [props]: event.target.value })

        //當輸入時變回原本的樣子，直到下一次註冊時才會偵測
        setErrorState({ ...error, [props]: { errorState: false, helperText: '' } })

    }

    const registerHandle = (prevCount) => {

        //註冊時發現有未填的欄位給上error和helperText
        let obj = {}

        if (memberRegisterData.lastName === '') {
            setOpen(true)
            obj.lastName = { errorState: true, helperText: '請輸入姓氏' }
        }
        if (memberRegisterData.firstName === '') {
            setOpen(true)
            obj.firstName = { errorState: true, helperText: '請輸入名字' }
        }
        if (memberRegisterData.idNumber === '') {
            setOpen(true)
            obj.idNumber = { errorState: true, helperText: '請輸入身分證號碼' }
        }
        if (memberRegisterData.phone === '') {
            setOpen(true)
            obj.phone = { errorState: true, helperText: '請輸入名字' }
        }
        if (memberRegisterData.account === '') {
            setOpen(true)
            obj.account = { errorState: true, helperText: '請輸入帳號' }
        }
        if (memberRegisterData.password === '') {
            setOpen(true)
            obj.password = { errorState: true, helperText: '請輸入密碼' }
        }
        if (memberRegisterData.email === '') {
            setOpen(true)
            obj.email = { errorState: true, helperText: '請輸入電子郵件' }
        }
        if (memberRegisterData.licenseKey === '') {
            setOpen(true)
            obj.licenseKey = { errorState: true, helperText: '輸入金要開通' }
        }
        setErrorState({ ...error, ...obj }
        )


        const uri = 'https://demo.fois.online/appcal/FetchTest.php';
        fetch(uri, {
            method: 'POST',
            body: encodeURI(JSON.stringify({
                name: 'oxxo',
                age: 18
            })),
            headers: {
                'Accept': 'application/json',
                'Content-Type': ' application/json ; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();   // 使用 json() 可以得到 json 物件
            }).then(result => {
                console.log(result); // 得到 {name: "oxxo", age: 18, text: "你的名字是 oxxo，年紀 18 歲～"}
            }).catch((error) => console.log(error)); ;
    }

    return (
        <MemberRegisterData.Provider value={[memberRegisterData, setMemberRegisterData]}>

            <Card className='CardContainer'>
                <Typography color='primary' className='memnerRegisterTitle'>學生會員註冊</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6} >
                        <TextField
                            fullWidth
                            size='small'
                            label="姓氏"
                            variant="outlined"
                            value={memberRegisterData.lastName}
                            onChange={dateBind('lastName')}
                            error={error.lastName.errorState}
                            helperText={error.lastName.helperText}>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            size='small'
                            label="名字"
                            variant="outlined"
                            value={memberRegisterData.firstName}
                            onChange={dateBind('firstName')}
                            error={error.firstName.errorState}
                            helperText={error.firstName.helperText}>
                        </TextField>
                    </Grid>
                    <Grid item xs={4} >
                        <TextField
                            fullWidth
                            select
                            SelectProps={{ native: true }}
                            size='small'
                            label="性別"
                            variant="outlined"
                            value={memberRegisterData.sex}
                            onChange={dateBind('sex')}>
                            <option>男</option>
                            <option>女</option>
                        </TextField>
                    </Grid>
                    <Grid item xs={8}>
                        <DatePicker />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField
                            fullWidth
                            size='small'
                            label="身分證字號"
                            variant="outlined"
                            value={memberRegisterData.idNumber}
                            onChange={dateBind('idNumber')}
                            error={error.idNumber.errorState}
                            helperText={error.idNumber.helperText}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            size='small'
                            label="聯絡電話"
                            variant="outlined"
                            value={memberRegisterData.phone}
                            onChange={dateBind('phone')}
                            error={error.phone.errorState}
                            helperText={error.phone.helperText}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={6} >
                        <TextField
                            fullWidth
                            size='small'
                            label="登入帳號"
                            variant="outlined"
                            value={memberRegisterData.account}
                            onChange={dateBind('account')}
                            error={error.account.errorState}
                            helperText={error.account.helperText}
                        ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextfieldHidePass
                            error={error.password.errorState}
                            helperText={error.password.helperText}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            size='small'
                            label="電子郵件"
                            variant="outlined"
                            value={memberRegisterData.email}
                            onChange={dateBind('email')}
                            error={error.email.errorState}
                            helperText={error.email.helperText}>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} >
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
                    </Grid>
                    <p className='memnerRegisterNote'>※提醒：帳號與密碼，勿含有空白以及特殊符號。</p>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item >
                        <ServiceDialog />
                    </Grid>
                    <Grid item >
                        <PrivacyDialog />
                    </Grid>
                </Grid>

                <Button fullWidth
                    disabled={(memberRegisterData.serviceCheck && memberRegisterData.privacyCheck) ? true : false}
                    variant="contained"
                    color="primary"
                    onClick={registerHandle}>註冊</Button>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} variant="filled" severity="error">
                        註冊失敗！
                     </Alert>
                </Snackbar>

            </Card>
        </MemberRegisterData.Provider>

    )
}