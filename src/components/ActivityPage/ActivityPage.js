import React, { useState, useRef, useContext, useEffect } from 'react';
import { Switch, Route, Link, useHistory } from "react-router-dom";
import ActivityCardPreload from './ActivityCardPreload/ActivityCardPreload'
import ActivityCard from './ActivityCard/ActivityCard'
import { Box } from '@material-ui/core';
import './ActivityPage.css'



export default function () {
    let [loadState, setLoadState] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            console.log('發現卡片')
            setLoadState(true)
        }, 5000);
        // fetch('https://demo.fois.online/Fois_Class/Main.php',{
        //     method:'POST',
        //     body: JSON.stringify({key:'userSearchActivityData'})
        // })
    }, [loadState])
    if (loadState) {
        console.log('該更換卡片了');
        return (<ActivityCard/>)
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