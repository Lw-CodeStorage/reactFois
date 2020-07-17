import React from "react";
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Box, Paper } from "@material-ui/core";
import Collapse from '@material-ui/core/Collapse';

let useStyles = makeStyles(theme => ({
    appBar: {
        position: "fixed"
    },
    flex: {
        flex: 1
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}))

function Transition(props) {
    return <Slide direction="left" {...props} />;
}

export default function JobDescription({ select, Open, setOpen }) {
    //seletOnet為父類傳下來被選到的Onet資料
    //jobDesctipOpen setOpen 開啟關閉的state
    let classes = useStyles()
    //返回
    let handleClose = () => {
        setOpen(false)
    };
    //工作職責展開
    let [expanded, setExpanded] = React.useState(false);

    let handleChange = (panel) => (event, isExpanded) => {
        //isExpanded為展開的狀態
        setExpanded(isExpanded ? panel : false);
    };


    React.useEffect(() => {
        console.log(select);
    })
    return (
        <div>
            <Dialog
                fullScreen
                open={Open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar >
                        <Grid container justify='space-between' alignItems='baseline'>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="Close"
                                    style={{ paddingLeft: 0 }}
                                >
                                    <ChevronLeft />
                                    <Typography variant='body1'>
                                        返回
                                    </Typography>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1'>
                                    {select ? select.職位名稱 : null}
                                </Typography>
                            </Grid>
                        </Grid>

                    </Toolbar>
                </AppBar>
                <Box p={4}>
                    <Grid container style={{ paddingTop: 56 }}>
                        <Grid item xs={12}><Typography component='p' variant='h6' color='primary'>職位描述</Typography></Grid>
                        <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                        <Grid item xs={12}>

                            <Box >
                                {select ? select.職位描述 : null}
                            </Box>

                        </Grid>
                    </Grid>
                </Box>
                <Box pl={4} pr={4} pb={4}>
                    <Grid container >
                        <Grid item xs={12}><Typography component='p' variant='h6' color='primary'>工作職責</Typography></Grid>
                        <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                        <Grid item xs={12}>
                            {
                                select ? Object.keys(select.工作職責).map((workDutyID) =>
                                    <>
                                        <Accordion expanded={expanded === select['工作職責'][workDutyID]['職務代碼']} onChange={handleChange(select['工作職責'][workDutyID]['職務代碼'])}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                {/* <Typography className={classes.heading}>{select['工作職責'][workDutyID]['職務代碼']}</Typography>  */}
                                                <Typography className={classes.secondaryHeading}>{select['工作職責'][workDutyID]['職務內容']}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography style={{ width: '100%' }}>
                                                    {
                                                        select['工作職責'][workDutyID]['任務說明'].map((taskText, index) =>
                                                            <Grid container >
                                                                <Grid item xs={1} style={{ flexBasis: 20 }}>{index + 1}.</Grid>
                                                                <Grid item xs={11}> {taskText} </Grid>
                                                            </Grid>

                                                        )}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </>
                                ) : null
                            }
                        </Grid>
                    </Grid>
                </Box>
                <Box pl={4} pr={4} pb={4}>
                    <Grid container >
                        <Grid item xs={12}><Typography component='p' variant='h6' color='primary'>工作知識</Typography></Grid>
                        <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                        <Grid item xs={12}>
                            {
                                select ? select.工作知識.map((workKnow, index) =>
                                    <>
                                        <Accordion expanded={expanded === select['工作知識'][index]} onChange={handleChange(select['工作知識'][index])}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <Typography className={classes.secondaryHeading}>{`${select['工作知識'][index]['英文名稱']} / ${select['工作知識'][index]['中文名稱']}`}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography style={{ width: '100%' }}>

                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12}> {select['工作知識'][index]['中文描述']} </Grid>
                                                        <Grid item xs={12}> {select['工作知識'][index]['英文描述']} </Grid>
                                                    </Grid>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>

                                    </>


                                ) : null
                            }

                        </Grid>
                    </Grid>
                </Box>
                <Box pl={4} pr={4} pb={4}>
                    <Grid container >
                        <Grid item xs={12}><Typography component='p' variant='h6' color='primary'>工作技能</Typography></Grid>
                        <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                        <Grid item xs={12}>
                            {
                                select ? select.工作知識.map((workKnow, index) =>
                                    <>
                                        <Accordion expanded={expanded === select['工作技能'][index]} onChange={handleChange(select['工作技能'][index])}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <Typography className={classes.secondaryHeading}>{`${select['工作技能'][index]['英文名稱']} / ${select['工作技能'][index]['中文名稱']}`}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography style={{ width: '100%' }}>

                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12}> {select['工作技能'][index]['中文描述']} </Grid>
                                                        <Grid item xs={12}> {select['工作技能'][index]['英文描述']} </Grid>
                                                    </Grid>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </>
                                ) : null
                            }
                        </Grid>
                    </Grid>
                </Box>
                <Box pl={4} pr={4} pb={4}>
                    <Grid container >
                        <Grid item xs={12}><Typography component='p' variant='h6' color='primary'>人員規範</Typography></Grid>
                        <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                        <Grid item xs={12}>
                            {
                                select ? Object.keys(select.人員規範).map((personalRule, index) =>
                                    <>
                                        <Accordion expanded={expanded === select['人員規範'][personalRule]} onChange={handleChange(select['人員規範'][personalRule])}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <Typography className={classes.secondaryHeading}>{personalRule}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography style={{ width: '100%' }}>

                                                    <Grid container spacing={1}>
                                                        {Object.keys(select['人員規範'][personalRule]).map(item => {
                                                           return <Grid item xs={12}> {`${item} : ${select['人員規範'][personalRule][item]}`} </Grid>
                                                        })}

                                                    </Grid>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </>
                                ) : null
                            }
                        </Grid>
                    </Grid>
                </Box>

            </Dialog>
        </div >
    )

}

