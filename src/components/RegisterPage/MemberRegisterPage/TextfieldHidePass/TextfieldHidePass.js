import React, { Component, useState ,useEffect,useContext} from 'react';
import { MemberRegisterData } from '../MemberRegisterPage'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from 'clsx';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import {InputAdornment, IconButton, Input, InputLabel, OutlinedInput, FormControl } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: '0px',
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '100%'
    },
}));

export default function TextfieldHidePass(props) {
    let [memberRegisterData, setMemberRegisterData] = useContext(MemberRegisterData);
    const [values,setValues] = useState({
        Password:'',
        showPassword:true
    })
    useEffect(() => {
        setMemberRegisterData({...memberRegisterData,Password : values.Password})
       
    }, [values.Password]);
   

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const classes = useStyles();
    return (<FormControl size='small' className={clsx(classes.margin, classes.textField)} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">登入密碼</InputLabel>
        <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.Password}
            onChange={handleChange('Password')}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            }
            labelWidth={70}
            error={props.error}
            
        />
        <FormHelperText  error={props.error}>{props.helperText}</FormHelperText>
    </FormControl>)
}
