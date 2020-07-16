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

export default function JobDescription({ selectOnet, jobDescripOpen, setJobDescripOpen }) {
    //seletOnet為父類傳下來被選到的Onet資料
    //jobDesctipOpen setJobDescripOpen 開啟關閉的state
    let classes = useStyles()
    //返回
    let handleClose = () => {
        setJobDescripOpen(false)
    };
    React.useEffect(() => {
        console.log(selectOnet);
    })

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        //isExpanded為展開的狀態
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={jobDescripOpen}
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
                                    {selectOnet ? selectOnet.職位名稱 : null}
                                </Typography>
                            </Grid>
                        </Grid>

                    </Toolbar>
                </AppBar>
                <Box p={2}>
                    <Grid container style={{ paddingTop: 56 }}>
                        <Grid item xs={12}><Typography variant='body1' color='primary'>工作職責</Typography></Grid>
                        <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                        <Grid item xs={12}>
                            {/* <Paper>
                                <List disablePadding>
                                    <ListItem button dense >
                                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                                    </ListItem>
                                    <ListItem button dense>
                                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                                    </ListItem>
                                </List>
                            </Paper> */}

                            {
                                selectOnet ? Object.keys(selectOnet.工作職責).map((workDutyID) =>

                                    <>
                                        {/* <div className={classes.root}>
                                            <Accordion expanded={expanded === selectOnet['工作職責'][workDutyID]['職務代碼']} onChange={handleChange(selectOnet['工作職責'][workDutyID]['職務代碼'])}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography>Accordion 1</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>Lorem ipsumLorem ipsumLorem ipsumLorem ipsum</Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                           
                                        </div> */}


                                        <Accordion expanded={expanded === selectOnet['工作職責'][workDutyID]['職務代碼']} onChange={handleChange(selectOnet['工作職責'][workDutyID]['職務代碼'])}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                {/* <Typography className={classes.heading}>{selectOnet['工作職責'][workDutyID]['職務代碼']}</Typography>  */}
                                                <Typography className={classes.secondaryHeading}>{selectOnet['工作職責'][workDutyID]['職務內容']}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography style={{ width: '100%' }}>
                                                    {
                                                        selectOnet['工作職責'][workDutyID]['任務說明'].map((taskText, index) =>
                                                            <Grid container >
                                                                <Grid item xs={1} style={{flexBasis:20}}>{index + 1}.</Grid>
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


            </Dialog>
        </div >
    )

}

