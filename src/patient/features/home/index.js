import { Button } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingTop from '../../components/loadingTop'
import HomeSearch from '../../components/search'
import Advertisement from './advertisement'
import HomeBlog from './blog'
import HomeDepart from './carousel-depart'
import HomeBookDoctor from './carousel-doctor/index'
import HomeHospital from './carousel-hospital'
const Home = () => {
    const {enqueueSnackbar} = useSnackbar();
    const appState = useSelector(state=>state.app);
    const {loadingData, listAllSpecials, listAllHospitals, listAllDoctors}  = appState;

    const [ loadingPage, setLoadingPage ] = useState(true);
    const [ listData, setListData ] = useState({
        doctors:[],
        hospitals:[],
        specialities:[],
    })
    useEffect(()=> {
        if(loadingData===0){
            setListData({
                ...listData,
                doctors: listAllDoctors,
                hospitals: listAllHospitals.data,
                specialities: listAllSpecials
            })
            setTimeout(() => {
                setLoadingPage(false)
            }, 500);
        }
    },[loadingData])
    const showNoti = () => {
        enqueueSnackbar('AAAAAAAAAAA', {variant: 'success'})
    }
    return(
        <div>
            {loadingPage?
            <div className="main-wrapper">
                <LoadingTop/>
                <HomeSearch/>
                <div style={{height:"100 vh"}}></div>
                <Advertisement/>
                <HomeBlog/>
            </div>
            :<div className="main-wrapper">
                <HomeSearch/>
                <Button onClick={showNoti}>Show notion</Button>
                <HomeDepart data={listData.specialities}/>
                <HomeBookDoctor data={listData.doctors}/>
                <HomeHospital data={listData.hospitals}/>
                <Advertisement/>
                <HomeBlog/>
            </div>
        }

        </div>
    );
}
export default Home;