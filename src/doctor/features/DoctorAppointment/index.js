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
import ModalSchedule from './components/ModalSchedule';
import ReExamination from './components/ReExamination';
import { compareDates } from '../../../utils';
import Swal from "sweetalert2";
import { useSnackbar } from 'notistack';
import './style.css';

const { TabPane } = Tabs;

const DoctorAppointment = (props) =>{
    const { isDoctorLoggedIn, currentDoctor} = props.doctorData;
    const doctorId = currentDoctor.doctor._id;
    const { enqueueSnackbar } = useSnackbar();


    const [loadingPage, setLoadingPage] = useState(true);
    const [appointment, setAppointment] = useState([]);
    const [reExam, setReExam] = useState({
        defaultTabs: 3,
        currentStatus: 1,
    });

    //state modal xem lich
    const [modalView, setModalView] = useState({
        visible: false,
        data: {},
    })
    // state modal huy lich
    const [modalCancel, setModalCancel] = useState({
        visible: false,
        data: {},
    })
    // state modal xem ket qua
    const [modalResult, setModalResult] = useState({
        visible: false,
        data: {},
    })
    // state modal tai kham
    const [modalReExam, setModalReExam] = useState({
        visible: false,
        data: {},
    })
    // check lai cho nay..goi nhieu lan sau 5p
    // setTimeout(() => {
    //     getAppointment(doctorId);    
    // },300000);
     
    useEffect(()=> {
        getAppointment();
    },[])

    const getAppointment = async () => {
        try {
            const response = await doctorAPI.get_doctor_appoitmant(doctorId);
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
            _data.sort((a,b)=>{
                return a.numberSort-b.numberSort
            })
            setAppointment(_data);
        } catch (error) {
            console.log('error.message :>> ', error.message);
        }
        setLoadingPage(false)
    }
  
    const changeStatusCurrentSchedule = (data) => {
        setReExam({
            ...reExam,
            currentStatus:data
        })
    }
    const handleReExamSuccess = () => {
        setLoadingPage(true);
        getAppointment(); 
        setReExam({
            defaultTabs: 3,
            currentStatus: 2,
        });
    }

    const viewSchedule = (id) => {
        // setLoadingPage(true);	
		// getScheduleById(id);
    }

    // xem lich
    const onViewSchedule = (id) => {
        setLoadingPage(true);	
		getScheduleById(id);
    }
    const getScheduleById =  async (id) => {
		try {
			const response = await doctorAPI.get_appointment_by_id(id);
			if(response.error) throw new Error("error");
			setModalView({
				...modalView,
				visible: true,
				data: {...response.data}
			})
			setLoadingPage(false)
		} catch (error) {
			console.log('error :>> ', error);
			setLoadingPage(false)
			enqueueSnackbar('Lịch khám đã bị hủy', {variant: 'error'});
            getAppointment(); 
		}
	}

    // tai kham
   
    return(
        <div>
            {loadingPage && <LoadingTop/>}
            <div className="breadcrumb-bar" style={{marginTop:"80px"}}>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/bac-si">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Quản lí lịch khám</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Quản lí lịch khám</h2>
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
                            <Tabs defaultActiveKey='3' className="tabScheduleDoctor" >
                                <TabPane tab="Lịch khám quá hạn" key="1">
                                    <ScheduleOutDate data={appointment}/>
                                </TabPane>
                                <TabPane tab="Lịch khám đang xử lí" key="2">
                                    <SchedulePending 
                                        data={appointment}
                                        viewSchedule={viewSchedule}
                                        onViewSchedule={onViewSchedule}
                                    />
                                </TabPane>
                                <TabPane tab="Lịch khám hôm nay" key="3">
                                    <ScheduleCurrent {...props}
                                        data={appointment}
                                        status={reExam.currentStatus}
                                        changeStatus={changeStatusCurrentSchedule}
                                        reExamSuccess={handleReExamSuccess}
                                        viewSchedule={viewSchedule}
                                        onViewSchedule={onViewSchedule}
                                    />
                                </TabPane>
                                <TabPane tab="Lịch khám sắp diễn ra" key="4">
                                    <ScheduleComing 
                                        data={appointment}
                                    />
                                </TabPane>
                            </Tabs>
                        </div> 
                        
                        
                        {/* Modal xem lich */}
                        <ModalSchedule
                            modalData={modalView}
                            handleOk={()=>{
                                setModalView({
                                    ...modalView,
                                    visible: !modalView.visible,
                                })
                            }}
                            handleClose={()=>{
                                setModalView({
                                    ...modalView,
                                    visible: !modalView.visible,
                                })
                            }}
                        />
                        {/* Modal tai kham */}
                        <ReExamination
                            modalData={modalReExam}
                            handleOk={()=>{
                                setModalReExam({
                                    ...modalReExam,
                                    visible: !modalReExam.visible,
                                })
                            }}
                            handleClose={()=>{
                                setModalReExam({
                                    ...modalReExam,
                                    visible: !modalReExam.visible,
                                })
                            }}
                            reExamSuccess = {props.reExamSuccess}
                        />
                        {/* Modal xem ket qua */}

                        {/* Modal huy lich */}


                    </div>
                </div>
            </div>
        </div>
        )
    }


export default DoctorAppointment;
     