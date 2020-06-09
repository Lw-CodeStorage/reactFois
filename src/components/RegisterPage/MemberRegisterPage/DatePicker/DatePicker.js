
import React, { useState, useContext, useEffect } from 'react';
import { MemberRegisterData } from '../MemberRegisterPage'
import DateFnsUtils from '@date-io/date-fns'; //時間
import twLocale from "date-fns/locale/zh-TW"; //日期語言包
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
export default function DatePicKer() {
    let [memberRegisterData, setMemberRegisterData] = useContext(MemberRegisterData);
    const [selectedDate, handleDateChange] = useState(new Date(2009,1,1));
   
    useEffect(() => {
        let selfFormatDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}` 
        setMemberRegisterData({ ...memberRegisterData, birthDay: selfFormatDate })
         }
    ,[selectedDate]);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={twLocale}>
            <DatePicker
                disableFuture
                label="Date of birth"
                openTo="year"
                format="yyyy-MM-dd"
                label=""
                views={["year", "month", "date"]}
                value={selectedDate}
                onChange={handleDateChange}
                className=" birdaySelect"
                autoOk={true}
                inputVariant='outlined'
                size='small'
                fullWidth
            />
        </MuiPickersUtilsProvider>
    );

}