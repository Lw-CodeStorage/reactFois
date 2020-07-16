import React from 'react';
import './ActivityCardPreload.css';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box'




export default function ActivityCardPreload() {

    return (

            <Box bgcolor='bodyBackground.main' className='activityCardPreloadContainer'  >

                <div className="imageScale">
                    <div className="activityPagePreloadImage">
                        <Skeleton variant="rect" width={400} height={300} animation="wave" />
                    </div>
                </div>

                <div className="activityPreloadTitle">
                    <div className="title">
                        <Skeleton width={200} height={10} animation="wave" />
                        <Skeleton width={160} height={10} animation="wave" />
                    </div>

                    <div className="activityPreloadQuota">
                        <Skeleton width={120} height={10} animation="wave" />
                        <Skeleton width={140} height={10} animation="wave" />
                    </div>
                </div>

                <div className="activityPreloadIntroduction">
                    <Skeleton max-width='100%' height={20} animation="wave" />
                    <Skeleton max-width='100%' height={20} animation="wave" />
                    <Skeleton max-width='100%' height={20} animation="wave" />
                    <Skeleton max-width='100%' height={20} animation="wave" />
                    <Skeleton max-width='100%' height={20} animation="wave" />
                </div>
                <div className="activityPreloadInfo">
                    <div>
                        <Skeleton width={170} height={10} animation="wave" />
                        <Skeleton width={170} height={10} animation="wave" />
                        <Skeleton width={170} height={10} animation="wave" />

                    </div>
                    <div>
                        <Skeleton width={110} height={10} animation="wave" />
                        <Skeleton width={110} height={10} animation="wave" />
                        <Skeleton width={110} height={10} animation="wave" />
                    </div>

                </div>
            </Box>
       



    );
}

