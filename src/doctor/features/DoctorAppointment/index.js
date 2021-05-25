import React, { useState, useEffect } from 'react';
import DoctorSidebar from '../../components/DoctorSideBar';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import {useDispatch, useSelector} from 'react-redux';
import { Card, Form, Row, Col, Input, Button, Table, Badge } from 'antd';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import IMG01 from '../../assets/images/doctor-thumb-02.jpg';
import LoadingTop from '../../components/loadingTop';
import moment from 'moment';
import doctorAPI from '../../../api/doctorAPI';

const DoctorAppointment = () =>{

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
            console.log('response :>> ', response);
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
                        room: appointmentInfo.location.room
                    }
                    return obj
                })
                setAppointment(_data);

        } catch (error) {
            console.log('error.message :>> ', error.message);
        }
        setLoadingPage(false)
    }


    const columns = [
        {
			title: 'Bệnh nhân',
            dataIndex: 'patient',
			render: (text, record) => (            
			  <div className="table-avatar">
				<span>{text}</span>
			  </div>
			), 
			sorter: (a, b) => a.specialities.length - b.specialities.length,
		},
        {
			title:'Ngày khám',
			dataIndex:'date',
		},
        {
			title:'Giờ khám',
			dataIndex:'time',
		},
        {
            title:'Phòng khám',
            dataIndex: 'room'
        },
        {
			title:'Trạng thái',
			dataIndex:'status',
            render: (text, record) => (
                <Badge style={{ backgroundColor: '#52c41a' }}>{record.status?'Chưa khám':'Đã khám'}</Badge>
            )
		},
		{
            title: 'Sự kiện',
            render: (text, record) => (
                <div className="actions">
                    <Button onClick={()=>console.log(record.id)} type="primary" style={{marginRight:"5px"}}>
                        Xem lịch
                    </Button>
                </div>
            ),
		},		
	]
    return(
        <div>
            {loadingPage && <LoadingTop/>}
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/home">Trang chủ</Link></li>
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
                            <Card>
                                <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Danh sách lịch khám:</h4>
                                <Table className="table-striped"
                                    columns={columns}                 
                                    dataSource={appointment}
                                    ascend={true}
                                    style = {{overflowX : 'auto'}}
                                    rowKey={record => record.id}
                                    showSizeChanger={true} 
                                    loading={loadingPage}
                                />
                            </Card>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        )
    }


export default DoctorAppointment;
     