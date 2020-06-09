import React, { useState, useContext } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


export default function Warning(props) {
    let loginState = {props}
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        setOpen(false);
    }

    return (<Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        autoHideDuration={3000}   
        onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="error">
            註冊失敗！
         </Alert>
    </Snackbar>)
}
