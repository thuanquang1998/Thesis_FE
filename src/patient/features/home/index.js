import React from 'react'
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
    const loadingData = appState.loadingData;
   
    return(
        <div>
            {loadingData?
            <div className="main-wrapper">
                <LoadingTop/>
                <HomeSearch/>
                <Advertisement/>
                <HomeBlog/>
            </div>
            :<div className="main-wrapper">
                <HomeSearch/>
                <HomeDepart data={appState.listAllSpecials}/>
                <HomeBookDoctor data={appState.listAllDoctors}/>
                <HomeHospital data={appState.listAllHospitals}/>
                <Advertisement/>
                <HomeBlog/>
            </div>
        }

        </div>
    );
}
export default Home;