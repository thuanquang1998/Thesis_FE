import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeSearch from '../../components/search'
import HomeDepart from './carousel-depart'
import HomeBookDoctor from './carousel-doctor/index'
import HomeHospital from './carousel-hospital'
import Advertisement from './advertisement'
import HomeBlog from './blog'
import { getAllDoctors } from '../../../redux/actions/patientActions';
import { get_list_hospitals, get_specialities_system } from '../../../redux/actions/adminActions'
import { get_doctors_data } from '../../../redux/actions/doctorActions'

const Home = () => {
    const dispatch = useDispatch()
    // const allDoctor = useSelector(state=> state.patient.listDoctor);
    const specialities = useSelector(state=>state.admin.specialities_system)
    const list_hospitals = useSelector(state=>state.admin.list_hospital)
    const list_doctors = useSelector(state=>state.doctor.doctor_data);
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        // dispatch(getAllDoctors());
        dispatch(get_specialities_system());
        dispatch(get_list_hospitals());
        dispatch(get_doctors_data());
        setLoading(false);
	},[])
    return(
        <div>
            <div className="main-wrapper">
                <HomeSearch/>
                <HomeDepart data={specialities}/>
                <HomeBookDoctor data={list_doctors}/>
                <HomeHospital data={list_hospitals}/>
                <Advertisement/>
                <HomeBlog/>
            </div>
        </div>
    );
}
export default Home;