import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
//定位
import 'leaflet.locatecontrol'
//泡泡收集地標
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
//
import * as esri_geo from 'esri-leaflet-geocoder';
import './mpa.css'

import { Button, Grid, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import pin from '../../img/pin3.png'

export default function MapFindWork() {
    //ref可當變數用不會在rerender時重置變數，可看做部會rerender的state
    //但更ui上還是要靠state

    let mapRef = useRef(null)
    let currentPosition = useRef(null)
    let data = useRef(null) //地圖資料
    //let [selectData,setSelectDate] = useState()
    let selectDataRef = useRef(null)
    let selecGrouptDataRef = useRef(null)
    let selfIcon = L.icon({
        iconUrl: pin,
        iconSize: [32, 32], // size of the icon
        iconAnchor: [16, 32],
    })
    let dataIcon = (v) => L.divIcon({
        html: `${v}`,
        className: `test`
    })
    let [alertState, setAlertState] = useState({
        text: '',
        severity: 'error',
        open: false
    });
    useEffect(() => {
        // 做在effect裡面 是因為有些東西是init才有的不能做在外面
        //  useRef更改後畫面是不會變的 ,要真的變還是要用state
        //  地圖裡面的功能應該都有後續用 document.querySelector 等原聲js直接改變顯示
        //地圖
        mapRef.current = L.map('map', {
            // center: [22.647854, 120.323706],
            center: [22.648194, 120.309030],
            zoom: 16,
            layers: [
                L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                }),
            ],
        });

        //定位
        currentPosition.current = L.control.locate().addTo(mapRef.current);

        //經緯度轉地址
        let geocodeService = esri_geo.geocodeService();
        let cluster = L.markerClusterGroup({ spiderfyOnMaxZoom: false })
        let Mark = null
        let Circle = null
        let getLatlng = (e) => {
            data.current = null
          //  mapRef.current.clearLayers()
            geocodeService.reverse().latlng(e.latlng).run((error, result) => {
                if (error) {
                    //點選到沒有經緯度的地方 跳出
                    return
                }
                cluster.clearLayers() //清除泡泡
                if (Mark !== null) {
                    //清除地標和圓圈 再增加新的圓圈與地標
                    mapRef.current.removeLayer(Mark)
                    mapRef.current.removeLayer(Circle)

                    Mark = L.marker(result.latlng, { icon: selfIcon }).addTo(mapRef.current).bindPopup(result.address.Match_addr).openPopup();
                    Circle = L.circle(result.latlng, { color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 500 }).addTo(mapRef.current)
                } else {
                    //第一次增加圓圈與地標
                    Mark = L.marker(result.latlng, { icon: selfIcon }).addTo(mapRef.current).bindPopup(result.address.Match_addr).openPopup();
                    Circle = L.circle(result.latlng, { color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 500 }).addTo(mapRef.current)
                }
                let cookies = document.cookie.split(';')
                let state = ''
                for (let i = 0; i < cookies.length; i++) {
                    if (cookies[i].indexOf('state') >= 0) {
                        state = cookies[i].split('=')[1]
                    }
                }
                fetch('https://demo.fois.online/Fois_Class/Main.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        'key': 'memberSearchCompanyData',
                        'JWT': state,
                        '地址': result.address.Match_addr,
                        '經緯度': result.latlng,
                        '半徑': '500'
                    }),
                }).then(res => {
                    return res.json();
                }).then(result => {
                    if (result.狀態 == '查詢成功') {

                        data.current = result.結果
                        data.current.forEach((value, index) =>
                            //生成座標 並加入動作
                            L.marker([value.緯度, value.經度], { icon: dataIcon(value.單位名稱) }).addTo(cluster).on('click', () => handleClickOpen(value))
                        )
                     
                        mapRef.current.addLayer(cluster)
                       
                        //點擊泡泡群組
                        cluster.on('clusterclick', (child) => { handleGroupClickOpen(child) })
                        setAlertState({ severity: 'success', text: result.狀態, open: true })
                    } else {
                        setAlertState({ severity: 'error', text: result.errorCode, open: true })
                    }
                }).catch((error) => console.error('Error:', error))

            })
        }
        mapRef.current.on('click', getLatlng)

        //泡泡收集地標
        // let cluster = L.markerClusterGroup({ spiderfyOnMaxZoom: false })
        // let cookies = document.cookie.split(';')
        // let state = ''
        // for (let i = 0; i < cookies.length; i++) {
        //     if (cookies[i].indexOf('state') >= 0) {
        //         state = cookies[i].split('=')[1]
        //     }
        // }
        // fetch('https://demo.fois.online/Fois_Class/Main.php', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         'key': 'memberSearchCompanyData',
        //         'JWT': state,
        //     }),
        // }).then(res => {
        //     return res.json();
        // }).then(result => {
        //     console.log(1231312321);
        //     if (result.狀態 == '查詢成功') {
        //         data.current = result.結果
        //         data.current.forEach((value, index) =>
        //             //生成座標 並加入動作
        //             L.marker([value.緯度, value.經度], { icon: dataIcon(value.單位名稱) }).addTo(cluster).on('click', () => handleClickOpen(value))
        //         )
        //         mapRef.current.addLayer(cluster)
        //         //點擊泡泡群組
        //         cluster.on('clusterclick', (child) => { handleGroupClickOpen(child) })
        //     }
        // }).catch((error) => console.error('Error:', error))


    }, []);
    let [open, setOpen] = React.useState(false);
    let [openGroup, setOpenGroup] = React.useState(false);
    let handleClickOpen = (select) => {
        console.log(select);
        selectDataRef.current = (
            <>
                <DialogTitle id="alert-dialog-title">{select.單位名稱}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={2}>
                            <Grid item container >
                                <Grid item xs={12} md={2}>
                                    <Typography color='primary'>營業地址 :</Typography>
                                </Grid>
                                <Grid item xs={12} md={10}>
                                    {select.營業地址}
                                </Grid>
                            </Grid>


                            <Grid item container >
                                <Grid item xs={3} md={2}>
                                    <Typography color='primary'>統一編號 :</Typography>

                                </Grid>
                                <Grid item xs={9} md={10}>
                                    {select.統一編號}
                                </Grid>
                            </Grid>

                            <Grid item container >
                                <Grid item xs={3} md={2}>
                                    <Typography color='primary'>設立日期 :</Typography>
                                </Grid>
                                <Grid item xs={9} md={10}>
                                    {select.設立日期}
                                </Grid>
                            </Grid>

                            <Grid item container >
                                <Grid item xs={3} md={2}>
                                    <Typography color='primary'>資本額 :</Typography>
                                </Grid>
                                <Grid item xs={9} md={10}>
                                    {select.資本額}
                                </Grid>
                            </Grid>

                            <Grid item container >
                                <Grid item xs={3} md={2}>
                                    <Typography color='primary'>行業代號 :</Typography>
                                </Grid>
                                <Grid item xs={9} md={10}>
                                    {select.行業代號}
                                </Grid>
                                {select.行業代號1 ?
                                    <>
                                        <Grid item xs={3} md={2}>
                                            <Typography color='primary'>行業代號 :</Typography>
                                        </Grid>
                                        <Grid item xs={9} md={10}>
                                            {select.行業代號1}
                                        </Grid>
                                    </> : null
                                }
                                {select.行業代號2 ?
                                    <>
                                        <Grid item xs={3} md={2}>
                                            <Typography color='primary'>行業代號 :</Typography>
                                        </Grid>
                                        <Grid item xs={9} md={10}>
                                            {select.行業代號2}
                                        </Grid>
                                    </> : null
                                }
                                {select.行業代號3 ?
                                    <>
                                        <Grid item xs={3} md={2}>
                                            <Typography color='primary'>行業代號 :</Typography>
                                        </Grid>
                                        <Grid item xs={9} md={10}>
                                            {select.行業代號3}
                                        </Grid>
                                    </> : null
                                }

                            </Grid>
                            <Grid item container >
                                <Grid item xs={3} md={2}>
                                    <Typography color='primary'>行業名稱 :</Typography>
                                </Grid>
                                <Grid item xs={9} md={10}>
                                    {select.行業名稱}
                                </Grid>
                                {select.行業名稱1 ?
                                    <>
                                        <Grid item xs={3} md={2}>
                                            <Typography color='primary'>行業名稱 :</Typography>
                                        </Grid>
                                        <Grid item xs={9} md={10}>
                                            {select.行業名稱1}
                                        </Grid>
                                    </> : null
                                }
                                {select.行業名稱2 ?
                                    <>
                                        <Grid item xs={3} md={2}>
                                            <Typography color='primary'>行業名稱 :</Typography>
                                        </Grid>
                                        <Grid item xs={9} md={10}>
                                            {select.行業名稱2}
                                        </Grid>
                                    </> : null
                                }
                                {select.行業名稱3 ?
                                    <>
                                        <Grid item xs={3} md={2}>
                                            <Typography color='primary'>行業名稱 :</Typography>
                                        </Grid>
                                        <Grid item xs={9} md={10}>
                                            {select.行業名稱3}
                                        </Grid>
                                    </> : null
                                }
                            </Grid>

                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </>
        )
        setOpen(true);//透過其他的state更新 去selectDataRef更新畫面
    };
    let handleGroupClickOpen = (selectGroup) => {
        // console.log(mapRef.current.getZoom());
        //console.log(selectGroup.layer.getAllChildMarkers());
        console.log(data.current);
        if (mapRef.current.getZoom() == 18) {
            let groupr = selectGroup.layer.getAllChildMarkers()
            selecGrouptDataRef.current = (
                <>
                    <DialogTitle id="alert-dialog-title"></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                            {groupr.map((v) =>
                                <><Grid container spacing={1} style={{ marginBottom: 20 }}>
                                    <Grid item container >
                                        <Grid item xs={12} >
                                            <Typography color='primary'>{v.options.icon.options.html}</Typography>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Divider style={{ marginTop: 10 }}></Divider>
                                        </Grid>
                                    </Grid>
                                    <Grid item container >
                                        <Grid item xs={4} >
                                            <Typography color='primary'>統一編號 :</Typography>
                                        </Grid>
                                        <Grid item xs={8} >
                                            {data.current.find(data => data.單位名稱 == v.options.icon.options.html).統一編號}
                                        </Grid>
                                        <Grid item xs={4} >
                                            <Typography color='primary'>設立日期 :</Typography>
                                        </Grid>
                                        <Grid item xs={8} >
                                            {data.current.find(data => data.單位名稱 == v.options.icon.options.html).設立日期}
                                        </Grid>
                                        <Grid item xs={4} >
                                            <Typography color='primary'>資本額 :</Typography>
                                        </Grid>
                                        <Grid item xs={8} >
                                            {data.current.find(data => data.單位名稱 == v.options.icon.options.html).資本額} $
                                        </Grid>
                                        <Grid item xs={4} >
                                            <Typography color='primary'>行業代號 :</Typography>
                                        </Grid>
                                        <Grid item xs={8} >
                                            {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業代號}
                                        </Grid>
                                        {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業代號1 ?
                                            <>
                                                <Grid item xs={4} >
                                                    <Typography color='primary'>行業代號 :</Typography>
                                                </Grid>
                                                <Grid item xs={8} >
                                                    {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業代號1}
                                                </Grid>
                                            </>
                                            : null}
                                        {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業代號2 ?
                                            <>
                                                <Grid item xs={4} >
                                                    <Typography color='primary'>行業代號 :</Typography>
                                                </Grid>
                                                <Grid item xs={8} >
                                                    {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業代號2}
                                                </Grid>
                                            </>
                                            : null}
                                        {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業代號3 ?
                                            <>
                                                <Grid item xs={4} >
                                                    <Typography color='primary'>行業代號 :</Typography>
                                                </Grid>
                                                <Grid item xs={8} >
                                                    {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業代號3}
                                                </Grid>
                                            </>
                                            : null}


                                        <Grid item xs={4} >
                                            <Typography color='primary'>行業名稱 :</Typography>
                                        </Grid>
                                        <Grid item xs={8} >
                                            {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業名稱}
                                        </Grid>
                                        {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業名稱1 ?
                                            <>
                                                <Grid item xs={4} >
                                                    <Typography color='primary'>行業代號 :</Typography>
                                                </Grid>
                                                <Grid item xs={8} >
                                                    {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業名稱1}
                                                </Grid>
                                            </>
                                            : null
                                        }
                                        {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業名稱2 ?
                                            <>
                                                <Grid item xs={4} >
                                                    <Typography color='primary'>行業代號 :</Typography>
                                                </Grid>
                                                <Grid item xs={8} >
                                                    {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業名稱2}
                                                </Grid>
                                            </>
                                            : null
                                        }
                                        {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業名稱3 ?
                                            <>
                                                <Grid item xs={4} >
                                                    <Typography color='primary'>行業代號 :</Typography>
                                                </Grid>
                                                <Grid item xs={8} >
                                                    {data.current.find(data => data.單位名稱 == v.options.icon.options.html).行業名稱3}
                                                </Grid>
                                            </>
                                            : null
                                        }

                                    </Grid>
                                </Grid>
                                </>
                            )}

                        </DialogContentText>
                    </DialogContent>
                </>
            )
            setOpenGroup(true);//透過其他的state更新 去selectDataRef更新畫面
        }
    }
    let handleClose = () => {
        setOpen(false);
        setOpenGroup(false);
    };

    return (
        <>
            <div id="map" style={{ width: '100%', height: '90vh' }}></div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='sm'
            >
                {selectDataRef.current}
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        關閉
                         </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openGroup}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='sm'
            >
                {selecGrouptDataRef.current}
                <DialogActions>

                    <Button onClick={handleClose} color="primary" autoFocus>
                        關閉
                         </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={alertState.open}
                autoHideDuration={3000}
                onClose={() => { setAlertState({ ...alertState, open: false }) }}
            >
                <Alert variant="filled" severity={alertState.severity}>
                    {alertState.text}
                </Alert>
            </Snackbar>
        </>
    )
}