import { Tabs } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import doctorAPI from '../../../../api/doctorAPI';
import DoctorSidebar from '../../../components/DoctorSideBar';
import LoadingTop from '../../../components/loadingTop';
import ScheduleComing from '../../DoctorAppointment/components/ScheduleComing';
import ScheduleCurrent from '../../DoctorAppointment/components/ScheduleCurrent';
import ScheduleOutDate from '../../DoctorAppointment/components/ScheduleOutDate';
import SchedulePending from '../../DoctorAppointment/components/SchedulePending';

const { TabPane } = Tabs;
const ListScheduleDashboard = () =>{

    const doctor = useSelector(state=> state.doctor);
    const { isDoctorLoggedIn, currentDoctor} = doctor;
    const [loadingPage, setLoadingPage] = useState(true);
    const [appointment, setAppointment] = useState([]);

    useEffect(() => {
        setLoadingPage(true);
        if(isDoctorLoggedIn) {
            const id = currentDoctor.doctor._id;
            getAppointment(id);    
        }
    },[isDoctorLoggedIn]);

    const getAppointment = async (id) => {
        try {
            const response = await doctorAPI.get_doctor_appoitmant(id);
            if(response.error) throw new Error(response.errors[0].message);
            // console.log('response :>> ', response);
            // setAppointment()
                const _data = response.data.map(x=>{
                    const { appointmentInfo, patientInfo} = x;
                    const obj = {
                        id: x.id,
                        patient: patientInfo.name,
                        doctor: appointmentInfo.doctorName,
                        speciality: 'Tiêu hóa',
                        address: `${appointmentInfo.location.room} ${appointmentInfo.location.hospitalName}`,
                        date: moment(appointmentInfo.date).format('DD/MM/YYYY'),
                        time: appointmentInfo.time,
                        status: x.status,
                        room: appointmentInfo.location.room,
                        fullData: x,
                    }
                    return obj
                })
            setAppointment(_data);

        } catch (error) {
            console.log('error.message :>> ', error.message);
        }
        setLoadingPage(false)
    }
    return(
        <div>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Lịch khám hôm nay" key="1">
                    <ScheduleCurrent data={appointment}/>
                </TabPane>
                <TabPane tab="Lịch khám sắp diễn ra" key="2">
                    <ScheduleComing data={appointment}/>
                </TabPane>
            </Tabs>
        </div>
    )}
export default ListScheduleDashboard;
     