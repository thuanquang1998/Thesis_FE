import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import HomeSearch from '../../components/search'
import Advertisement from './advertisement'
import HomeBlog from './blog'
import HomeDepart from './carousel-depart'
import HomeBookDoctor from './carousel-doctor/index'
import HomeHospital from './carousel-hospital'
import LoadingTop from '../../components/loadingTop';
const Home = () => {
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