import React, { useState, useRef, useContext, useEffect } from 'react';
import { Switch, Route, Link, useHistory } from "react-router-dom";
import ActivityCardPreload from './ActivityCardPreload/ActivityCardPreload'
import ActivityCard from './ActivityCard/ActivityCard'
import { Box } from '@material-ui/core';
import './ActivityPage.css'



export default function () {
    //卡片資料狀態，有資料就setState為true下去判斷
    let [loadState, setLoadState] = useState(false)
    let [response, setResponse] = useState([{ 'a': '1' }])

    useEffect(() => {
        fetch('https://demo.fois.online/Fois_Class/Main.php', {
            method: 'POST',
            body: JSON.stringify({ 'key': 'userSearchActivityData' })
        }).then(res => {
            return res.json()
        }).then(
            result => {
                setTimeout(() => {
                    (result.length > 0) ? setLoadState(true) : setLoadState(false)
                    setResponse(result)
                }, 1000);
            }).catch((error) => console.error('Error:', error))
    }, [loadState])
    //setLoadState會在DOM render完後執行，這裡設定相依會檢察值是不是有變，有變才會去做重新渲染，不然setLoadState 一直set true 還是會重新渲染

    if (loadState) {
        console.log(response);
        return (<Box className='activityPageContainer'>
            {response.map((data) => { return <ActivityCard data={data} /> })}
            {response.map((data) => { return <ActivityCard data={data} /> })}
             {response.map((data) => { return <ActivityCard data={data} /> })}
        </Box>)

    } else {
        return (
            <>
                <Box className='activityPageContainer'>
                    <ActivityCardPreload />
                    <ActivityCardPreload />
                    <ActivityCardPreload />
                </Box>
                <Box className='activityPageContainer'>
                    <ActivityCardPreload />
                    <ActivityCardPreload />
                    <ActivityCardPreload />
                </Box>

            </>
        )
    }
}