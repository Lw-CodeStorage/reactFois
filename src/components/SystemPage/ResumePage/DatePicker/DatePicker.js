
import React, { useState, useContext, useEffect } from 'react';
import { UserData } from '../../SystemPage.js' // useContext -> UserDate 
import DateFnsUtils from '@date-io/date-fns'; //時間
import twLocale from "date-fns/locale/zh-TW"; //日期語言包
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles'

let useStyles = makeStyles(theme => ({
    selfTextField: {
        '& input': {
            textAlign: 'center',
        },
    }
}))

export default function DatePicKer({ edu, birthday }) {
    const classes = useStyles();
    let [userData, setUserData] = useContext(UserData);

    function handleDateChange(e) {
        let selfFormatDate = `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`
        if (birthday == 'birthday') {
            setUserData({ ...userData, 生日: selfFormatDate })
        }
        if (edu == '0') {
            setUserData({ ...userData, 學歷0: { ...userData.學歷0, f3: selfFormatDate } })
        }
        if (edu == '1') {
            setUserData({ ...userData, 學歷1: { ...userData.學歷1, f3: selfFormatDate } })
        }
        if (edu == '2') {
            setUserData({ ...userData, 學歷2: { ...userData.學歷2, f3: selfFormatDate } })
        }
        if (edu == '3') {
            setUserData({ ...userData, 學歷3: { ...userData.學歷3, f3: selfFormatDate } })
        }
    }
    if (birthday == 'birthday') {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={twLocale}>
                <DatePicker
                    style={{ textAlign: "center" }}
                    disableFuture
                    label="Date of birth"
                    openTo="year"
                    format="yyyy-MM-dd"
                    label=""
                    views={["year", "month", "date"]}
                    value={userData.生日?userData.生日:'2000-01-01'}
                    onChange={handleDateChange}
                    autoOk={true}
                    className={classes.selfTextField}
                    fullWidth
                    inputVariant='outlined'
                    size='small'
                />
            </MuiPickersUtilsProvider>
        );
    }
    if (edu == '0') {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={twLocale}>
                <DatePicker
                    style={{ textAlign: "center" }}
                    disableFuture
                    label="Date of birth"
                    openTo="year"
                    format="yyyy-MM-dd"
                    label=""
                    views={["year", "month", "date"]}
                    value={userData.學歷0.f3 ? userData.學歷0.f3 : '2000-01-01'}
                    onChange={handleDateChange}
                    autoOk={true}
                    className={classes.selfTextField}
                    fullWidth
                    inputVariant='outlined'
                    size='small'
                />
            </MuiPickersUtilsProvider>
        );
    }
    if (edu == '1') {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={twLocale}>
                <DatePicker
                    style={{ textAlign: "center" }}
                    disableFuture
                    label="Date of birth"
                    openTo="year"
                    format="yyyy-MM-dd"
                    label=""
                    views={["year", "month", "date"]}
                    value={userData.學歷1.f3? userData.學歷1.f3 : '2000-1-1'}
                    onChange={handleDateChange}
                    autoOk={true}
                    className={classes.selfTextField}
                    fullWidth
                    inputVariant='outlined'
                    size='small'
                />
            </MuiPickersUtilsProvider>
        );
    }
    if (edu == '2') {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={twLocale}>
                <DatePicker
                    style={{ textAlign: "center" }}
                    disableFuture
                    label="Date of birth"
                    openTo="year"
                    format="yyyy-MM-dd"
                    label=""
                    views={["year", "month", "date"]}
                    value={userData.學歷2.f3? userData.學歷2.f3 : '2000-1-1'}
                    onChange={handleDateChange}
                    autoOk={true}
                    className={classes.selfTextField}
                    fullWidth
                    inputVariant='outlined'
                    size='small'
                />
            </MuiPickersUtilsProvider>
        );
    }

    if (edu == '3') {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={twLocale}>
                <DatePicker
                    style={{ textAlign: "center" }}
                    disableFuture
                    label="Date of birth"
                    openTo="year"
                    format="yyyy-MM-dd"
                    label=""
                    views={["year", "month", "date"]}
                    value={userData.學歷3.f3? userData.學歷3.f3 : '2000-1-1'}
                    onChange={handleDateChange}
                    autoOk={true}
                    className={classes.selfTextField}
                    fullWidth
                    inputVariant='outlined'
                    size='small'
                />
            </MuiPickersUtilsProvider>
        );
    }



}