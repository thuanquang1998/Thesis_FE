import { Tabs } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import doctorAPI from '../../../api/doctorAPI';
import DoctorSidebar from '../../components/DoctorSideBar';
import LoadingTop from '../../components/loadingTop';
import ScheduleComing from './components/ScheduleComing';
import ScheduleCurrent from './components/ScheduleCurrent';
import ScheduleOutDate from './components/ScheduleOutDate';
import SchedulePending from './components/SchedulePending';

const { TabPane } = Tabs;
const DoctorAppointment = (props) =>{
    
    const { isDoctorLoggedIn, currentDoctor} = props.doctorData;
    const [loadingPage, setLoadingPage] = useState(true);
    const [appointment, setAppointment] = useState([]);
    const [reExam, setReExam] = useState({
        defaultTabs: 3,
        currentStatus: 1,
    });
    setTimeout(() => {
        const id = currentDoctor.doctor._id;
        getAppointment(id);    
    },300000)
    useEffect(() => {
        setLoadingPage(true);
        if(isDoctorLoggedIn) {
            const id = currentDoctor.doctor._id;
            getAppointment(id);    
        }
    },[isDoctorLoggedIn]);

    const getAppointment = async (id) => {
        console.log("getAppointment");
        try {
            const response = await doctorAPI.get_doctor_appoitmant(id);
            if(response.error) throw new Error(response.errors[0].message);
            // setAppointment()
            const _data = response.data.map(x=>{
                const { appointmentInfo, patientInfo} = x;
                const dateNumber = new Date(x.appointmentInfo.date).getTime();
                let timeStartString="";
                if(!x.appointmentInfo.time) {
                    timeStartString="0";
                } else {
                    const timeStart = x.appointmentInfo.time.split('-')[0];
                    timeStartString = timeStart.split(":")[0]+timeStart.split(":")[1]
                }
                const numberSort = dateNumber+timeStartString;
                const obj = {
                    numberSort:numberSort,
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
            console.log('__data :>> ', _data);
            // sort time
            _data.sort((a,b)=>{
                return a.numberSort-b.numberSort
            })
            setAppointment(_data);

        } catch (error) {
            console.log('error.message :>> ', error.message);
        }
        setLoadingPage(false)
    }
    const sortSchedule = (data) => {
        
    }
    const changeStatusCurrentSchedule = (data) => {
        setReExam({
            ...reExam,
            currentStatus:data
        })
    }
    const handleReExamSuccess = () => {
        setLoadingPage(true);
        const id = currentDoctor.doctor._id;
        getAppointment(id); 
        setReExam({
            defaultTabs: 3,
            currentStatus: 2,
        });
    }

    const viewSchedule = (id) => {
        // setLoadingPage(true);	
		// getScheduleById(id);
    }
   
    return(
        <div>
            {loadingPage && <LoadingTop/>}
            <div className="breadcrumb-bar" style={{marginTop:"80px"}}>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/home">Trang chủ</Link></li>
                                            set
                                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Dashboard</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                            <StickyBox offsetTop={20} offsetBottom={20}>
                                <DoctorSidebar />
                            </StickyBox>
                        </div>
                        <div className="col-md-7 col-lg-8 col-xl-9">
                            <h2>Quản lí lịch khám</h2>
                            <Tabs defaultActiveKey={`${reExam.defaultTabs}`} >
                                <TabPane tab="Lịch khám quá hạn" key="1">
                                    <ScheduleOutDate data={appointment}/>
                                </TabPane>
                                <TabPane tab="Lịch khám đang xử lí" key="2">
                                    <SchedulePending data={appointment}/>
                                </TabPane>
                                <TabPane tab="Lịch khám hôm nay" key="3">
                                    <ScheduleCurrent {...props}
                                        data={appointment}
                                        status={reExam.currentStatus}
                                        changeStatus={changeStatusCurrentSchedule}
                                        reExamSuccess={handleReExamSuccess}
                                        viewSchedule={viewSchedule}
                                    />
                                </TabPane>
                                <TabPane tab="Lịch khám sắp diễn ra" key="4">
                                    <ScheduleComing data={appointment}/>
                                </TabPane>
                            </Tabs>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        )
    }


export default DoctorAppointment;
     