import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingTop from '../../components/loadingTop'
import HomeSearch from '../../components/search'
import Advertisement from './advertisement'
import HomeDepart from './carousel-depart'
import HomeBookDoctor from './carousel-doctor/index'
import HomeHospital from './carousel-hospital'
import adminAPI from '../../../api/adminAPI';


const Home = () => {
    // const appState = useSelector(state=>state.app);
    // const {loadingData, listAllSpecials, listAllHospitals, listAllDoctors}  = appState;
    // const [ listData, setListData ] = useState({
    //     doctors:[],
    //     hospitals:[],
    //     specialities:[],
    // })
    // useEffect(()=> {
    //     if(loadingData===0){
    //         setListData({
    //             ...listData,
    //             doctors: listAllDoctors,
    //             hospitals: listAllHospitals.data,
    //             specialities: listAllSpecials
    //         })
    //         setTimeout(() => {
    //             setLoadingPage(false)
    //         }, 500);
    //     }
    // },[loadingData])

    const [ loadingPage, setLoadingPage ] = useState(true);
    const [listDoctor, setListDoctor] = useState([]);
    const [listHospitals, setListHospitals] = useState([]);
    const [listSpec, setListSpec]  = useState([]);
    
    const [loadDoctor, setLoadDoctor] = useState(true);
    const [loadHospital, setLoadHospital] = useState(true);
    const [loadSpec, setLoadSpec] = useState(true);

    const getListHospital = async () => {
        try {
            const response = await adminAPI.get_list_hospitals();
            if(response.error) throw new Error("Can't get list hospitals");
            const data = response.data;
            console.log('data getListHospital:>> ', response);
            setListHospitals([...data.data]);
            setLoadHospital(false)
        } catch (error) {
            console.log('error getListHospital:>> ', error);
        }

    }
    const getListDoctors = async () => {
        try {
            const response = await adminAPI.get_doctors();
            if(response.error) throw new Error("Can't get list doctor");
            const data = response.data;
            setListDoctor([...data.data]);
            setLoadDoctor(false)
        } catch (error) {
            console.log('error getListDoctors:>> ', error);
        }
    }
    const getListSpec = async () => {
        try {
            const response = await adminAPI.get_speacialities();
            if(response.error) throw new Error("Can't get list spec");
            setListSpec([...response.data]);
            setLoadSpec(false);
        } catch (error) {
            console.log('error getListSpec:>> ', error);
        }
    }
    useEffect(() => {
        window.scrollTo(0,0);
        getListHospital()
        getListDoctors()
        getListSpec()
    },[])
    useEffect(() => {
        if(!loadHospital && !loadDoctor && !loadSpec) {
            setLoadingPage(false);
        }
    },[loadHospital, loadDoctor, loadSpec])





    return(
        <div>
            {loadingPage?
            <div className="main-wrapper">
                <LoadingTop/>
                <HomeSearch/>
                <div style={{height:"100 vh"}}></div>
                <Advertisement/>
                {/* <HomeBlog/> */}
            </div>
            :<div className="main-wrapper">
                <HomeSearch/>
                <HomeDepart data={listSpec}/>
                <HomeBookDoctor data={listDoctor}/>
                <HomeHospital data={listHospitals}/>
                <Advertisement/>
                {/* <HomeBlog/> */}
            </div>
        }

        </div>
    );
}
export default Home;